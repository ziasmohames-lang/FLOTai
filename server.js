import express from "express";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { GoogleGenAI } from "@google/genai";
import PDFDocument from "pdfkit";
import ExcelJS from "exceljs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const GEMINI_MODEL = "gemini-3.8-flash";
const GEMINI_IMAGE_MODEL =
  process.env.GEMINI_IMAGE_MODEL || "imagen-3.0-generate-002";
const GROQ_MODEL = process.env.GROQ_MODEL || "";
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || "openrouter/free";
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "";

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const ADMIN_SECRET = process.env.ADMIN_SECRET || "FLOT-ADMIN-2026";
const ADMIN_EMAIL = String(process.env.ADMIN_EMAIL || "").trim().toLowerCase();
const ADMIN_PASSWORD = String(process.env.ADMIN_PASSWORD || "");

const HOURLY_WINDOW_MS = 60 * 60 * 1000;
const SERVER_PLAN_LIMITS = {
  free: { maxMessages: 25, maxFiles: 3 },
  pro: { maxMessages: 300, maxFiles: 50 },
  ultra: { maxMessages: Infinity, maxFiles: Infinity },
};

const FLOT_IDENTITY_INSTRUCTION =
  "You are FLOT, an AI assistant developed under FLOT AI, owned and founded by Ziad Mohamed. Whenever asked who created, founded, owns, or made you, clearly state that you belong to FLOT AI, owned by Ziad Mohamed. Never claim affiliation with Alibaba Group, Google, OpenAI, or any other company. When the user asks to generate or export a PDF file, you may include a fenced block ```flot-pdf ... ``` or ```pdf ... ``` with JSON/text. When the user asks to generate or export an Excel/spreadsheet file, you may include a fenced block ```flot-excel ... ``` or ```xlsx ... ``` with JSON {\"title\":\"...\",\"headers\":[...],\"rows\":[...]} or CSV rows. Reply concisely and in the same language as the user.";

const hourlyQuotaStore = new Map();
const messageTelemetryLog = [];
let cachedGroqModel = null;

if (
  !process.env.GEMINI_API_KEY &&
  !process.env.GROQ_API_KEY &&
  !OPENROUTER_API_KEY
) {
  console.warn(
    "Warning: None of GEMINI_API_KEY, GROQ_API_KEY, or OPENROUTER_API_KEY is configured in .env"
  );
}

if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY) {
  console.warn(
    "Warning: SUPABASE_URL, SUPABASE_ANON_KEY, or SUPABASE_SERVICE_ROLE_KEY is missing in .env"
  );
}

const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;

const supabaseAuthClient =
  SUPABASE_URL && SUPABASE_ANON_KEY
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: { persistSession: false, autoRefreshToken: false },
      })
    : null;

const supabaseAdmin =
  SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
        auth: { persistSession: false, autoRefreshToken: false },
      })
    : null;

app.use(express.json({ limit: "12mb" }));
app.use(express.static("public"));

function normalizePlanTier(rawPlan) {
  const clean = String(rawPlan || "").trim().toLowerCase();
  if (clean.includes("ultra")) return "ultra";
  if (clean.includes("pro")) return "pro";
  return "free";
}

function getClientIp(req) {
  const forwarded = String(req.headers["x-forwarded-for"] || "")
    .split(",")[0]
    .trim();
  return forwarded || req.ip || "local";
}

function recordMessageTelemetry(planTier, provider, hasAttachment) {
  const now = Date.now();
  messageTelemetryLog.push({
    timestamp: now,
    plan: planTier,
    provider: provider || "unknown",
    hasAttachment: Boolean(hasAttachment),
  });

  const cutoff = now - 48 * 60 * 60 * 1000;
  while (
    messageTelemetryLog.length > 0 &&
    messageTelemetryLog[0].timestamp < cutoff
  ) {
    messageTelemetryLog.shift();
  }
}

function getTelemetrySummary() {
  const now = Date.now();
  const oneHourAgo = now - 60 * 60 * 1000;
  const oneDayAgo = now - 24 * 60 * 60 * 1000;

  let lastHourMessages = 0;
  let lastDayMessages = 0;
  const byPlanLastHour = { free: 0, pro: 0, ultra: 0 };

  for (const item of messageTelemetryLog) {
    if (item.timestamp >= oneDayAgo) {
      lastDayMessages += 1;
    }
    if (item.timestamp >= oneHourAgo) {
      lastHourMessages += 1;
      byPlanLastHour[item.plan] = (byPlanLastHour[item.plan] || 0) + 1;
    }
  }

  return {
    lastHourMessages,
    lastDayMessages,
    byPlanLastHour,
    serverTime: new Date(now).toISOString(),
  };
}

function createAdminSessionToken(email) {
  const payload = Buffer.from(
    JSON.stringify({
      email,
      role: "admin",
      exp: Date.now() + 12 * 60 * 60 * 1000,
    })
  ).toString("base64url");
  return `flot_adm_${payload}`;
}

function verifyAdminSessionToken(token) {
  const clean = String(token || "").trim();
  if (!clean.startsWith("flot_adm_")) return false;
  try {
    const raw = Buffer.from(clean.slice("flot_adm_".length), "base64url").toString(
      "utf8"
    );
    const parsed = JSON.parse(raw);
    return (
      parsed?.role === "admin" &&
      Boolean(parsed?.email) &&
      Number(parsed?.exp) > Date.now()
    );
  } catch {
    return false;
  }
}

function isAdminAuthorized(req) {
  const authHeader = String(req.headers?.authorization || "");
  const bearerToken = authHeader.toLowerCase().startsWith("bearer ")
    ? authHeader.slice(7).trim()
    : "";

  if (verifyAdminSessionToken(bearerToken)) {
    return true;
  }

  const providedKey = String(
    req.headers["x-admin-key"] || req.body?.adminKey || req.query?.adminKey || ""
  ).trim();
  return Boolean(ADMIN_SECRET && providedKey === ADMIN_SECRET);
}

function generate12CharCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 12; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

function checkAndConsumeHourlyQuota(req, planTier, hasAttachment) {
  const now = Date.now();
  const cfg = SERVER_PLAN_LIMITS[planTier] || SERVER_PLAN_LIMITS.free;
  const actorKey = String(req.body?.userId || getClientIp(req));
  const bucketKey = `${actorKey}:${planTier}`;

  let bucket = hourlyQuotaStore.get(bucketKey);
  if (!bucket || now >= bucket.resetAt) {
    bucket = {
      messages: 0,
      files: 0,
      resetAt: now + HOURLY_WINDOW_MS,
    };
  }

  const minsLeft = Math.max(1, Math.ceil((bucket.resetAt - now) / 60000));

  if (bucket.messages + 1 > cfg.maxMessages) {
    return {
      ok: false,
      error: `Hourly message limit reached for ${planTier.toUpperCase()} plan. Resets in ${minsLeft} min.`,
    };
  }

  if (hasAttachment && bucket.files + 1 > cfg.maxFiles) {
    return {
      ok: false,
      error: `Hourly file limit reached for ${planTier.toUpperCase()} plan. Resets in ${minsLeft} min.`,
    };
  }

  bucket.messages += 1;
  if (hasAttachment) bucket.files += 1;
  hourlyQuotaStore.set(bucketKey, bucket);

  return { ok: true, bucket };
}

function ensureSupabaseReady(res) {
  if (!supabaseAuthClient || !supabaseAdmin) {
    res.status(500).json({
      error:
        "Supabase is not configured in .env (SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY).",
    });
    return false;
  }
  return true;
}

function extractBearerToken(req) {
  const header = String(req.headers?.authorization || "");
  if (header.toLowerCase().startsWith("bearer ")) {
    return header.slice(7).trim();
  }
  return String(req.body?.accessToken || req.query?.accessToken || "").trim();
}

async function getAuthenticatedUser(req) {
  const token = extractBearerToken(req);
  if (!token || !supabaseAuthClient) return null;

  const { data, error } = await supabaseAuthClient.auth.getUser(token);
  if (error || !data?.user) return null;
  return data.user;
}

async function buildUserPayload(authUser, session = null) {
  let profile = null;
  if (supabaseAdmin && authUser?.id) {
    const { data } = await supabaseAdmin
      .from("profiles")
      .select("id, full_name, email, plan")
      .eq("id", authUser.id)
      .maybeSingle();
    profile = data || null;
  }

  const displayName =
    profile?.full_name ||
    authUser?.user_metadata?.full_name ||
    String(authUser?.email || "").split("@")[0] ||
    "User";

  return {
    user: {
      id: authUser.id,
      name: displayName,
      email: authUser.email,
      plan: profile?.plan || "Free plan",
    },
    accessToken: session?.access_token || null,
    refreshToken: session?.refresh_token || null,
  };
}

function sanitizeFileBaseName(rawName, fallback = "flot-export") {
  const cleaned = String(rawName || fallback)
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return cleaned || fallback;
}

function escapeCsvCell(val) {
  const str = val === null || val === undefined ? "" : String(val);
  const safe = /^[=+-@\t\r]/.test(str) ? `'${str}` : str;
  if (/[",\n\r]/.test(safe)) {
    return `"${safe.replace(/"/g, '""')}"`;
  }
  return safe;
}

function containsArabicText(input = "") {
  return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(String(input || ""));
}

function normalizeReadableText(raw = "") {
  return String(raw || "")
    .replace(/\r\n/g, "\n")
    .replace(/```[a-zA-Z0-9_-]*\n?/g, "")
    .replace(/```/g, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*\n]+)\*/g, "$1")
    .replace(/`([^`\n]+)`/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function wrapTextByChars(text = "", maxChars = 76) {
  const lines = [];
  const paragraphs = String(text || "").split("\n");
  for (const para of paragraphs) {
    const trimmed = para.trim();
    if (!trimmed) {
      lines.push("");
      continue;
    }
    const words = trimmed.split(/\s+/);
    let current = "";
    for (const w of words) {
      if (!current) {
        current = w;
      } else if ((current + " " + w).length <= maxChars) {
        current += " " + w;
      } else {
        lines.push(current);
        current = w;
      }
    }
    if (current) lines.push(current);
  }
  return lines;
}

function buildPdfBuffer({ title, content, rows }) {
  return new Promise((resolve, reject) => {
    const hasArabic = containsArabicText(
      `${title || ""} ${content || ""} ${JSON.stringify(rows || [])}`
    );

    if (!hasArabic) {
      const doc = new PDFDocument({ margin: 48, size: "A4" });
      const chunks = [];
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      doc
        .fontSize(18)
        .fillColor("#0f172a")
        .text(normalizeReadableText(title || "FLOT Document"), { align: "left" });
      doc.moveDown(0.4);
      doc
        .fontSize(9)
        .fillColor("#64748b")
        .text(`FLOT AI • ${new Date().toISOString()}`);
      doc.moveDown(1);

      const cleanBody = normalizeReadableText(content || "");
      if (cleanBody) {
        doc.fontSize(11).fillColor("#1e293b").text(cleanBody, {
          lineGap: 5,
          align: "left",
        });
        doc.moveDown(1);
      }

      if (Array.isArray(rows) && rows.length > 0) {
        doc.fontSize(12).fillColor("#0f172a").text("Data Table");
        doc.moveDown(0.5);
        rows.forEach((row, idx) => {
          const line = Array.isArray(row)
            ? row.map((c) => normalizeReadableText(c)).join("  |  ")
            : typeof row === "object" && row !== null
              ? Object.entries(row)
                  .map(([k, v]) => `${normalizeReadableText(k)}: ${normalizeReadableText(v)}`)
                  .join("  |  ")
              : normalizeReadableText(row);
          doc.fontSize(10).fillColor("#334155").text(`${idx + 1}. ${line}`, {
            lineGap: 3,
          });
        });
      }

      doc.end();
      return;
    }

    const allLines = [];
    allLines.push(normalizeReadableText(title || "FLOT Document"));
    allLines.push(`FLOT AI - ${new Date().toLocaleDateString("en-CA")}`);
    allLines.push("");

    const cleanBody = normalizeReadableText(content || "");
    if (cleanBody) {
      allLines.push(...wrapTextByChars(cleanBody, 76));
      allLines.push("");
    }

    if (Array.isArray(rows) && rows.length > 0) {
      allLines.push("Data Rows:");
      rows.forEach((row, idx) => {
        const line = Array.isArray(row)
          ? row.map((c) => normalizeReadableText(c)).join(" | ")
          : typeof row === "object" && row !== null
            ? Object.entries(row)
                .map(([k, v]) => `${normalizeReadableText(k)}: ${normalizeReadableText(v)}`)
                .join(" | ")
            : normalizeReadableText(row);
        allLines.push(...wrapTextByChars(`${idx + 1}. ${line}`, 76));
      });
    }

    const linesPerPage = 42;
    const pages = [];
    for (let i = 0; i < allLines.length; i += linesPerPage) {
      pages.push(allLines.slice(i, i + linesPerPage));
    }
    if (pages.length === 0) pages.push(["FLOT Document"]);

    const toUtf16BeHex = (str) => {
      const buf = Buffer.alloc(2 + str.length * 2);
      buf[0] = 0xfe;
      buf[1] = 0xff;
      for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);
        buf.writeUInt16BE(code, 2 + i * 2);
      }
      return `<${buf.toString("hex").toUpperCase()}>`;
    };

    const objects = [];
    const catalogId = 1;
    const pagesId = 2;
    const fontId = 3;

    const pageEntries = pages.map((pageLines, pIdx) => {
      const pageObjId = 4 + pIdx * 2;
      const contentObjId = pageObjId + 1;
      const streamParts = ["BT", "/F1 11 Tf", "50 780 Td", "16 TL"];
      pageLines.forEach((line, lIdx) => {
        const prefix = lIdx === 0 ? "" : "0 -16 Td ";
        streamParts.push(`${prefix}${toUtf16BeHex(line)} Tj`);
      });
      streamParts.push("ET");
      const streamData = streamParts.join("\n");
      return { pageObjId, contentObjId, streamData, pageNum: pIdx + 1 };
    });

    objects.push(`${catalogId} 0 obj\n<< /Type /Catalog /Pages ${pagesId} 0 R >>\nendobj`);
    objects.push(
      `${pagesId} 0 obj\n<< /Type /Pages /Kids [${pageEntries
        .map((p) => `${p.pageObjId} 0 R`)
        .join(" ")}] /Count ${pageEntries.length} >>\nendobj`
    );
    objects.push(
      `${fontId} 0 obj\n<< /Type /Font /Subtype /Type0 /BaseFont /ArialUnicodeMS /Encoding /Identity-H /DescendantFonts [${
        4 + pageEntries.length * 2
      } 0 R] >>\nendobj`
    );

    for (const p of pageEntries) {
      objects.push(
        `${p.pageObjId} 0 obj\n<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${p.contentObjId} 0 R >>\nendobj`
      );
      objects.push(
        `${p.contentObjId} 0 obj\n<< /Length ${Buffer.byteLength(
          p.streamData,
          "utf8"
        )} >>\nstream\n${p.streamData}\nendstream\nendobj`
      );
    }

    const cidFontId = 4 + pageEntries.length * 2;
    objects.push(
      `${cidFontId} 0 obj\n<< /Type /Font /Subtype /CIDFontType2 /BaseFont /ArialUnicodeMS /CIDSystemInfo << /Registry (Adobe) /Ordering (Identity) /Supplement 0 >> /DW 1000 >>\nendobj`
    );

    let pdfStr = "%PDF-1.4\n";
    const offsets = [0];
    for (const obj of objects) {
      offsets.push(Buffer.byteLength(pdfStr, "utf8"));
      pdfStr += obj + "\n";
    }
    const xrefPos = Buffer.byteLength(pdfStr, "utf8");
    pdfStr += `xref\n0 ${objects.length + 1}\n`;
    pdfStr += "0000000000 65535 f \n";
    for (let i = 1; i <= objects.length; i++) {
      pdfStr += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
    }
    pdfStr += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefPos}\n%%EOF`;

    resolve(Buffer.from(pdfStr, "utf8"));
  });
}

async function buildExcelBuffer({ title, content, rows, headers }) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "FLOT AI";
  workbook.created = new Date();

  const sheetTitle = normalizeReadableText(title || "FLOT Sheet");
  const safeSheetName =
    sheetTitle.replace(/[\\/?*\[\]:]+/g, " ").trim().slice(0, 31) ||
    "FLOT_Sheet";
  const sheet = workbook.addWorksheet(safeSheetName);

  const sampleText = `${sheetTitle} ${content || ""} ${JSON.stringify(rows || [])}`;
  const isRtl = containsArabicText(sampleText);
  sheet.views = [{ rightToLeft: isRtl, showGridLines: true }];

  const headerStyle = {
    font: { bold: true, color: { argb: "FFFFFFFF" }, size: 11 },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "FF1E293B" } },
    alignment: {
      vertical: "middle",
      horizontal: isRtl ? "right" : "left",
      wrapText: true,
    },
    border: {
      top: { style: "thin", color: { argb: "FF94A3B8" } },
      bottom: { style: "thin", color: { argb: "FF94A3B8" } },
      left: { style: "thin", color: { argb: "FF94A3B8" } },
      right: { style: "thin", color: { argb: "FF94A3B8" } },
    },
  };

  const makeRowStyle = (isAlt) => ({
    font: { size: 10.5, color: { argb: "FF0F172A" } },
    fill: isAlt
      ? { type: "pattern", pattern: "solid", fgColor: { argb: "FFF8FAFC" } }
      : { type: "pattern", pattern: "none" },
    alignment: {
      vertical: "top",
      horizontal: isRtl ? "right" : "left",
      wrapText: true,
    },
    border: {
      top: { style: "thin", color: { argb: "FFE2E8F0" } },
      bottom: { style: "thin", color: { argb: "FFE2E8F0" } },
      left: { style: "thin", color: { argb: "FFE2E8F0" } },
      right: { style: "thin", color: { argb: "FFE2E8F0" } },
    },
  });

  if (Array.isArray(rows) && rows.length > 0) {
    if (Array.isArray(rows[0])) {
      const colCount = Math.max(
        ...rows.map((r) => (Array.isArray(r) ? r.length : 1)),
        1
      );
      const colHeaders =
        Array.isArray(headers) && headers.length > 0
          ? headers.map((h) => normalizeReadableText(h))
          : Array.from({ length: colCount }, (_, i) =>
              isRtl ? `العمود ${i + 1}` : `Column ${i + 1}`
            );

      const headRow = sheet.addRow(colHeaders);
      headRow.height = 26;
      headRow.eachCell((cell) => {
        Object.assign(cell, headerStyle);
      });

      rows.forEach((r, idx) => {
        const values = (Array.isArray(r) ? r : [r]).map((v) =>
          normalizeReadableText(v ?? "")
        );
        const row = sheet.addRow(values);
        const maxCellLen = Math.max(...values.map((v) => v.length), 1);
        row.height = Math.min(140, Math.max(24, Math.ceil(maxCellLen / 36) * 18));
        const style = makeRowStyle(idx % 2 === 1);
        row.eachCell((cell) => {
          Object.assign(cell, style);
        });
      });
    } else if (typeof rows[0] === "object" && rows[0] !== null) {
      const cols =
        Array.isArray(headers) && headers.length > 0
          ? headers.map((h) => normalizeReadableText(h))
          : Array.from(
              rows.reduce((set, obj) => {
                Object.keys(obj || {}).forEach((k) => set.add(k));
                return set;
              }, new Set())
            );

      const headRow = sheet.addRow(cols);
      headRow.height = 26;
      headRow.eachCell((cell) => {
        Object.assign(cell, headerStyle);
      });

      rows.forEach((obj, idx) => {
        const values = cols.map((key) => normalizeReadableText(obj?.[key] ?? ""));
        const row = sheet.addRow(values);
        const maxCellLen = Math.max(...values.map((v) => v.length), 1);
        row.height = Math.min(140, Math.max(24, Math.ceil(maxCellLen / 36) * 18));
        const style = makeRowStyle(idx % 2 === 1);
        row.eachCell((cell) => {
          Object.assign(cell, style);
        });
      });
    } else {
      const headRow = sheet.addRow([
        isRtl ? "البند" : "Item",
        normalizeReadableText(headers?.[0] || (isRtl ? "القيمة" : "Value")),
      ]);
      headRow.height = 26;
      headRow.eachCell((cell) => Object.assign(cell, headerStyle));

      rows.forEach((v, idx) => {
        const cleanVal = normalizeReadableText(v ?? "");
        const row = sheet.addRow([idx + 1, cleanVal]);
        row.height = Math.min(140, Math.max(24, Math.ceil(cleanVal.length / 40) * 18));
        const style = makeRowStyle(idx % 2 === 1);
        row.eachCell((cell) => Object.assign(cell, style));
      });
    }
  } else {
    const cleanLines = normalizeReadableText(content || "")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    const headRow = sheet.addRow([
      isRtl ? "الرقم" : "#",
      isRtl ? "المحتوى" : "Content",
    ]);
    headRow.height = 26;
    headRow.eachCell((cell) => Object.assign(cell, headerStyle));

    const items = cleanLines.length > 0 ? cleanLines : [sheetTitle];
    items.forEach((line, idx) => {
      const row = sheet.addRow([idx + 1, line]);
      row.height = Math.min(140, Math.max(24, Math.ceil(line.length / 44) * 18));
      const style = makeRowStyle(idx % 2 === 1);
      row.eachCell((cell) => Object.assign(cell, style));
    });
  }

  sheet.columns.forEach((col, index) => {
    let maxLen = index === 0 ? 12 : 24;
    col.eachCell({ includeEmpty: false }, (cell) => {
      const valStr = String(cell.value ?? "");
      if (valStr.length + 4 > maxLen) {
        maxLen = Math.min(60, valStr.length + 4);
      }
    });
    col.width = maxLen;
  });

  const arrBuf = await workbook.xlsx.writeBuffer();
  return Buffer.from(arrBuf);
}

function parseCsvRows(rawCsv = "") {
  return String(rawCsv || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) =>
      line
        .split(",")
        .map((cell) => cell.replace(/^"(.*)"$/, "$1").replace(/""/g, '"').trim())
    );
}

async function createGeneratedFileArtifact({
  format,
  title,
  content = "",
  rows = [],
  headers = [],
  fileName = "",
}) {
  const normalizedFormat = String(format || "pdf").trim().toLowerCase();
  const baseName = sanitizeFileBaseName(
    fileName || title,
    normalizedFormat === "xlsx" ? "flot-sheet" : "flot-document"
  );

  let fileBuffer;
  let mimeType;

  if (normalizedFormat === "xlsx") {
    fileBuffer = await buildExcelBuffer({ title, content, rows, headers });
    mimeType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  } else if (normalizedFormat === "csv") {
    const csvRows =
      Array.isArray(rows) && rows.length > 0
        ? rows
        : [[title || "FLOT Export"], [content || ""]];
    const csvText = csvRows
      .map((r) =>
        Array.isArray(r)
          ? r.map((c) => escapeCsvCell(c)).join(",")
          : escapeCsvCell(r)
      )
      .join("\n");
    fileBuffer = Buffer.from(csvText, "utf8");
    mimeType = "text/csv; charset=utf-8";
  } else {
    fileBuffer = await buildPdfBuffer({ title, content, rows });
    mimeType = "application/pdf";
  }

  const fullFileName = `${baseName}.${normalizedFormat}`;
  const base64 = fileBuffer.toString("base64");

  return {
    fileName: fullFileName,
    format: normalizedFormat,
    mimeType,
    base64,
    dataUrl: `data:${mimeType};base64,${base64}`,
  };
}

async function extractGeneratedFilesFromReply(replyText = "") {
  const generatedFiles = [];
  const blockRegex =
    /```(flot-pdf|pdf|flot-excel|xlsx|flot-csv|csv)\n([\s\S]*?)```/gi;
  let match;

  while ((match = blockRegex.exec(replyText)) !== null) {
    const tag = String(match[1] || "").toLowerCase();
    const rawBody = String(match[2] || "").trim();
    const format = tag.includes("excel") || tag === "xlsx"
      ? "xlsx"
      : tag.includes("csv")
        ? "csv"
        : "pdf";

    let parsedSpec = null;
    try {
      parsedSpec = JSON.parse(rawBody);
    } catch {
      parsedSpec = null;
    }

    if (parsedSpec && typeof parsedSpec === "object" && !Array.isArray(parsedSpec)) {
      const artifact = await createGeneratedFileArtifact({
        format,
        title: parsedSpec.title || "FLOT Export",
        content: parsedSpec.content || "",
        rows: Array.isArray(parsedSpec.rows) ? parsedSpec.rows : [],
        headers: Array.isArray(parsedSpec.headers) ? parsedSpec.headers : [],
        fileName: parsedSpec.fileName || parsedSpec.title || "",
      });
      generatedFiles.push(artifact);
    } else if (format === "xlsx" || format === "csv") {
      const csvRows = parseCsvRows(rawBody);
      const artifact = await createGeneratedFileArtifact({
        format,
        title: "FLOT Spreadsheet",
        rows: csvRows,
      });
      generatedFiles.push(artifact);
    } else {
      const artifact = await createGeneratedFileArtifact({
        format: "pdf",
        title: "FLOT Document",
        content: rawBody,
      });
      generatedFiles.push(artifact);
    }
  }

  const cleanedReply = replyText
    .replace(
      /```(flot-pdf|pdf|flot-excel|xlsx|flot-csv|csv)\n[\s\S]*?```/gi,
      ""
    )
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return {
    reply: cleanedReply || replyText.trim(),
    generatedFiles,
  };
}

// --- Admin & Subscription Code Routes ---

app.post("/api/admin/login", async (req, res) => {
  try {
    const email = String(req.body?.email || "").trim().toLowerCase();
    const password = String(req.body?.password || "");

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    if (ADMIN_EMAIL && ADMIN_PASSWORD) {
      if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
        return res.status(401).json({ error: "Invalid admin credentials." });
      }
      return res.json({
        ok: true,
        admin: { email, role: "admin" },
        token: createAdminSessionToken(email),
      });
    }

    if (!supabaseAuthClient || !supabaseAdmin) {
      return res.status(500).json({
        error:
          "Configure ADMIN_EMAIL & ADMIN_PASSWORD in .env or configure Supabase Auth.",
      });
    }

    const { data, error } = await supabaseAuthClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data?.user) {
      return res
        .status(401)
        .json({ error: error?.message || "Invalid email or password." });
    }

    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("role, plan, full_name")
      .eq("id", data.user.id)
      .maybeSingle();

    const isAllowed =
      profile?.role === "admin" ||
      data.user.user_metadata?.role === "admin" ||
      (ADMIN_EMAIL && email === ADMIN_EMAIL);

    if (!isAllowed) {
      return res
        .status(403)
        .json({ error: "This account does not have admin privileges." });
    }

    return res.json({
      ok: true,
      admin: {
        email: data.user.email,
        name: profile?.full_name || data.user.email,
        role: "admin",
      },
      token: createAdminSessionToken(data.user.email),
    });
  } catch (err) {
    console.error("Admin login error:", err?.message || err);
    return res.status(500).json({ error: "Admin login failed." });
  }
});

app.get("/api/admin/dashboard", async (req, res) => {
  if (!isAdminAuthorized(req)) {
    return res.status(401).json({ error: "Unauthorized admin access." });
  }

  const telemetry = getTelemetrySummary();
  let recentCodes = [];

  if (supabaseAdmin) {
    const { data } = await supabaseAdmin
      .from("activation_codes")
      .select(
        "id, code, plan, duration_minutes, expires_at, used, used_at, created_at"
      )
      .order("created_at", { ascending: false })
      .limit(25);
    recentCodes = data || [];
  }

  return res.json({ telemetry, recentCodes });
});

app.post("/api/admin/codes/generate", async (req, res) => {
  if (!isAdminAuthorized(req)) {
    return res.status(401).json({ error: "Unauthorized admin access." });
  }
  if (!ensureSupabaseReady(res)) return;

  const plan = normalizePlanTier(req.body?.plan);
  if (plan !== "pro" && plan !== "ultra") {
    return res.status(400).json({ error: "Plan must be 'pro' or 'ultra'." });
  }

  const rawMinutes = Number(req.body?.durationMinutes);
  const durationMinutes =
    Number.isFinite(rawMinutes) && rawMinutes >= 1 && rawMinutes <= 1440
      ? Math.round(rawMinutes)
      : 10;

  const expiresAt = new Date(
    Date.now() + durationMinutes * 60 * 1000
  ).toISOString();

  let lastDbError = null;

  for (let attempt = 0; attempt < 5; attempt++) {
    const code = generate12CharCode();
    const { data, error } = await supabaseAdmin
      .from("activation_codes")
      .insert({
        code,
        plan,
        duration_minutes: durationMinutes,
        expires_at: expiresAt,
        used: false,
      })
      .select("id, code, plan, duration_minutes, expires_at, used, created_at")
      .single();

    if (!error && data) {
      return res.status(201).json({ code: data });
    }

    lastDbError = error;
    console.error("Generate code insert attempt failed:", error);
  }

  return res.status(500).json({
    error: lastDbError?.message || "Failed to generate unique code.",
  });
});

app.post("/api/subscription/activate", async (req, res) => {
  if (!ensureSupabaseReady(res)) return;

  const cleanCode = String(req.body?.code || "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase();

  if (!/^[A-Z0-9]{12}$/.test(cleanCode)) {
    return res
      .status(400)
      .json({ error: "Invalid 12-character code format." });
  }

  const { data: row, error: fetchError } = await supabaseAdmin
    .from("activation_codes")
    .select("id, code, plan, expires_at, used")
    .eq("code", cleanCode)
    .maybeSingle();

  if (fetchError || !row) {
    return res.status(404).json({ error: "Activation code not found." });
  }

  if (row.used) {
    return res
      .status(400)
      .json({ error: "This code has already been used." });
  }

  if (Date.now() > new Date(row.expires_at).getTime()) {
    return res
      .status(400)
      .json({ error: "This code has expired." });
  }

  const authUser = await getAuthenticatedUser(req);
  const nowIso = new Date().toISOString();

  const { error: updateCodeErr } = await supabaseAdmin
    .from("activation_codes")
    .update({
      used: true,
      used_at: nowIso,
      used_by: authUser?.id || null,
    })
    .eq("id", row.id)
    .eq("used", false);

  if (updateCodeErr) {
    return res
      .status(500)
      .json({ error: "Could not mark code as used." });
  }

  if (authUser?.id) {
    await supabaseAdmin
      .from("profiles")
      .update({
        plan: row.plan === "ultra" ? "Ultra" : "Pro",
        updated_at: nowIso,
      })
      .eq("id", authUser.id);
  }

  return res.json({
    ok: true,
    plan: row.plan,
    activatedAt: nowIso,
  });
});

// --- Supabase Auth Routes ---

app.post("/api/auth/register", async (req, res) => {
  if (!ensureSupabaseReady(res)) return;

  try {
    const name = String(req.body?.name || "").trim();
    const email = String(req.body?.email || "").trim().toLowerCase();
    const password = String(req.body?.password || "");

    if (!name || name.length < 2) {
      return res
        .status(400)
        .json({ error: "Name must be at least 2 characters." });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res
        .status(400)
        .json({ error: "Please enter a valid email address." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters." });
    }

    const { data: createdData, error: createError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: name },
      });

    if (createError || !createdData?.user) {
      console.error("Register createUser failed:", createError);
      return res.status(400).json({
        error: createError?.message || "Failed to create account.",
      });
    }

    const authUser = createdData.user;

    await supabaseAdmin.from("profiles").upsert(
      {
        id: authUser.id,
        full_name: name,
        email,
        plan: "Free plan",
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );

    const { data: signInData, error: signInError } =
      await supabaseAuthClient.auth.signInWithPassword({
        email,
        password,
      });

    if (signInError || !signInData?.user) {
      const payload = await buildUserPayload(authUser, null);
      return res.status(201).json(payload);
    }

    const payload = await buildUserPayload(signInData.user, signInData.session);
    return res.status(201).json(payload);
  } catch (err) {
    console.error("Register error:", err?.message, "Cause:", err?.cause);
    return res
      .status(500)
      .json({ error: err?.message || "Failed to create account." });
  }
});

app.post("/api/auth/login", async (req, res) => {
  if (!ensureSupabaseReady(res)) return;

  try {
    const email = String(req.body?.email || "").trim().toLowerCase();
    const password = String(req.body?.password || "");

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    const { data, error } = await supabaseAuthClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data?.user) {
      console.error("Login auth failed:", error?.message, error);
      return res
        .status(401)
        .json({ error: error?.message || "Invalid email or password." });
    }

    const payload = await buildUserPayload(data.user, data.session);
    return res.json(payload);
  } catch (err) {
    console.error("Login error:", err?.message, "Cause:", err?.cause);
    return res.status(500).json({ error: err?.message || "Failed to sign in." });
  }
});

app.put("/api/auth/profile", async (req, res) => {
  if (!ensureSupabaseReady(res)) return;

  try {
    const authUser = await getAuthenticatedUser(req);
    const name = String(req.body?.name || "").trim();

    if (!authUser) {
      return res.status(401).json({ error: "Unauthorized session." });
    }
    if (!name || name.length < 2) {
      return res.status(400).json({ error: "Valid name is required." });
    }

    await supabaseAdmin.auth.admin.updateUserById(authUser.id, {
      user_metadata: { ...authUser.user_metadata, full_name: name },
    });

    const { error } = await supabaseAdmin.from("profiles").upsert(
      {
        id: authUser.id,
        full_name: name,
        email: authUser.email,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );

    if (error) {
      return res
        .status(500)
        .json({ error: error.message || "Failed to update profile." });
    }

    const payload = await buildUserPayload({
      ...authUser,
      user_metadata: { ...authUser.user_metadata, full_name: name },
    });

    return res.json({ user: payload.user });
  } catch (err) {
    console.error("Profile error:", err?.message, "Cause:", err?.cause);
    return res.status(500).json({ error: "Failed to update profile." });
  }
});

// --- Conversations & Messages Sync Routes (Supabase PostgreSQL) ---

app.get("/api/conversations", async (req, res) => {
  if (!ensureSupabaseReady(res)) return;

  try {
    const authUser = await getAuthenticatedUser(req);
    if (!authUser) {
      return res.status(401).json({ error: "Unauthorized." });
    }

    const { data: convRows, error: convError } = await supabaseAdmin
      .from("conversations")
      .select("id, title, created_at, updated_at")
      .eq("user_id", authUser.id)
      .order("updated_at", { ascending: false });

    if (convError) {
      return res.status(500).json({ error: convError.message });
    }

    const { data: msgRows, error: msgError } = await supabaseAdmin
      .from("messages")
      .select("id, conversation_id, role, content, attachment, created_at")
      .eq("user_id", authUser.id)
      .order("created_at", { ascending: true });

    if (msgError) {
      return res.status(500).json({ error: msgError.message });
    }

    const messagesByConv = new Map();
    for (const m of msgRows || []) {
      const list = messagesByConv.get(m.conversation_id) || [];
      list.push({
        id: m.id,
        role: m.role,
        content: m.content || "",
        attachment: m.attachment || null,
        createdAt: m.created_at,
      });
      messagesByConv.set(m.conversation_id, list);
    }

    const formatted = (convRows || []).map((c) => ({
      id: c.id,
      title: c.title || "New chat",
      createdAt: c.created_at,
      updatedAt: c.updated_at,
      messages: messagesByConv.get(c.id) || [],
    }));

    return res.json({ conversations: formatted });
  } catch (err) {
    console.error(
      "Fetch conversations error:",
      err?.message,
      "Cause:",
      err?.cause
    );
    return res.status(500).json({ error: "Failed to load conversations." });
  }
});

app.post("/api/conversations", async (req, res) => {
  if (!ensureSupabaseReady(res)) return;

  try {
    const authUser = await getAuthenticatedUser(req);
    if (!authUser) {
      return res.status(401).json({ error: "Unauthorized." });
    }

    const title =
      String(req.body?.title || "New chat")
        .trim()
        .slice(0, 120) || "New chat";
    const { data, error } = await supabaseAdmin
      .from("conversations")
      .insert({
        user_id: authUser.id,
        title,
      })
      .select("id, title, created_at, updated_at")
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({
      conversation: {
        id: data.id,
        title: data.title,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        messages: [],
      },
    });
  } catch (err) {
    console.error(
      "Create conversation error:",
      err?.message,
      "Cause:",
      err?.cause
    );
    return res.status(500).json({ error: "Failed to create conversation." });
  }
});

app.delete("/api/conversations/:id", async (req, res) => {
  if (!ensureSupabaseReady(res)) return;

  try {
    const authUser = await getAuthenticatedUser(req);
    if (!authUser) {
      return res.status(401).json({ error: "Unauthorized." });
    }

    const convId = String(req.params.id || "").trim();
    const { error } = await supabaseAdmin
      .from("conversations")
      .delete()
      .eq("id", convId)
      .eq("user_id", authUser.id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error(
      "Delete conversation error:",
      err?.message,
      "Cause:",
      err?.cause
    );
    return res.status(500).json({ error: "Failed to delete conversation." });
  }
});

app.post("/api/conversations/:id/messages", async (req, res) => {
  if (!ensureSupabaseReady(res)) return;

  try {
    const authUser = await getAuthenticatedUser(req);
    if (!authUser) {
      return res.status(401).json({ error: "Unauthorized." });
    }

    const convId = String(req.params.id || "").trim();
    const role = req.body?.role === "assistant" ? "assistant" : "user";
    const content = String(req.body?.content || "");
    const rawAtt = req.body?.attachment || null;

    const safeAttachment =
      rawAtt && typeof rawAtt === "object"
        ? {
            kind: rawAtt.kind,
            name: rawAtt.name,
            size: rawAtt.size,
            mimeType: rawAtt.mimeType,
          }
        : null;

    const { data: msg, error: msgError } = await supabaseAdmin
      .from("messages")
      .insert({
        conversation_id: convId,
        user_id: authUser.id,
        role,
        content,
        attachment: safeAttachment,
      })
      .select("id, conversation_id, role, content, attachment, created_at")
      .single();

    if (msgError) {
      return res.status(500).json({ error: msgError.message });
    }

    const updateFields = { updated_at: new Date().toISOString() };
    if (typeof req.body?.title === "string" && req.body.title.trim()) {
      updateFields.title = req.body.title.trim().slice(0, 120);
    }

    await supabaseAdmin
      .from("conversations")
      .update(updateFields)
      .eq("id", convId)
      .eq("user_id", authUser.id);

    return res.status(201).json({
      message: {
        id: msg.id,
        role: msg.role,
        content: msg.content,
        attachment: msg.attachment,
        createdAt: msg.created_at,
      },
    });
  } catch (err) {
    console.error("Save message error:", err?.message, "Cause:", err?.cause);
    return res.status(500).json({ error: "Failed to save message." });
  }
});

// --- AI & Chat Routes ---
const withTimeout = (promise, ms = 6500) =>
  Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), ms)
    ),
  ]);

const isTransientError = (err) => {
  const status = err?.status || err?.code;
  const msg = String(err?.message || "").toLowerCase();
  return (
    status === 503 ||
    status === 429 ||
    msg.includes("503") ||
    msg.includes("unavailable") ||
    msg.includes("high demand") ||
    msg.includes("overloaded") ||
    msg.includes("timed out")
  );
};

function normalizeHistory(history = []) {
  const safeHistory = Array.isArray(history) ? history.slice(-4) : [];
  return safeHistory
    .map((item) => {
      const text =
        typeof item?.content === "string"
          ? item.content
          : typeof item?.text === "string"
            ? item.text
            : "";
      const rawRole = item?.role || item?.sender || "user";
      const role =
        rawRole === "assistant" || rawRole === "model" || rawRole === "bot"
          ? "assistant"
          : "user";

      return text.trim() ? { role, text: text.trim().slice(0, 2000) } : null;
    })
    .filter(Boolean);
}

function buildCombinedPrompt(message, attachment) {
  if (
    attachment?.kind === "file" &&
    typeof attachment.textContent === "string"
  ) {
    return `${message}\n\n--- Attached File: ${attachment.name} ---\n${attachment.textContent.slice(0, 12000)}\n--- End of File ---`;
  }
  return message;
}

function buildGeminiContents(cleanHistory, message, attachment = null) {
  const promptText = buildCombinedPrompt(message, attachment);
  const currentParts = [{ text: promptText }];

  if (
    attachment?.kind === "image" &&
    attachment.base64Data &&
    attachment.mimeType
  ) {
    currentParts.push({
      inlineData: {
        mimeType: attachment.mimeType,
        data: attachment.base64Data,
      },
    });
  }

  return [
    ...cleanHistory.map((item) => ({
      role: item.role === "assistant" ? "model" : "user",
      parts: [{ text: item.text }],
    })),
    {
      role: "user",
      parts: currentParts,
    },
  ];
}

async function generateWithGemini(cleanHistory, message, attachment = null) {
  if (!ai || !process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const contents = buildGeminiContents(cleanHistory, message, attachment);
  const response = await withTimeout(
    ai.models.generateContent({
      model: GEMINI_MODEL,
      contents,
      config: {
        systemInstruction: FLOT_IDENTITY_INSTRUCTION,
      },
    }),
    7500
  );
  return response.text || "No response received.";
}

async function resolveGroqModel() {
  if (GROQ_MODEL) return GROQ_MODEL;
  if (cachedGroqModel) return cachedGroqModel;

  const res = await withTimeout(
    fetch("https://api.groq.com/openai/v1/models", {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
    }),
    3500
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch Groq models (${res.status})`);
  }

  const json = await res.json();
  const models = Array.isArray(json?.data)
    ? json.data.map((m) => m.id).filter(Boolean)
    : [];

  const preferred =
    models.find((id) =>
      /llama-3\.3|llama-3\.1|llama3|gemma2|mixtral|qwen/i.test(id)
    ) || models[0];

  if (!preferred) {
    throw new Error("No available models found on your Groq account.");
  }

  cachedGroqModel = preferred;
  return cachedGroqModel;
}

function buildOpenAICompatibleMessages(cleanHistory, message, attachment = null) {
  const promptText = buildCombinedPrompt(message, attachment);

  const userContent =
    attachment?.kind === "image" && attachment.base64Data && attachment.mimeType
      ? [
          { type: "text", text: promptText },
          {
            type: "image_url",
            image_url: {
              url: `data:${attachment.mimeType};base64,${attachment.base64Data}`,
            },
          },
        ]
      : promptText;

  return [
    {
      role: "system",
      content: FLOT_IDENTITY_INSTRUCTION,
    },
    ...cleanHistory.map((item) => ({
      role: item.role,
      content: item.text,
    })),
    {
      role: "user",
      content: userContent,
    },
  ];
}

async function generateWithGroq(cleanHistory, message, attachment = null) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not configured in .env.");
  }

  if (attachment?.kind === "image") {
    throw new Error("Groq text models do not support image attachments.");
  }

  const modelToUse = await resolveGroqModel();
  const messages = buildOpenAICompatibleMessages(
    cleanHistory,
    message,
    attachment
  );

  const response = await withTimeout(
    fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: modelToUse,
        messages,
        temperature: 0.6,
      }),
    }),
    8000
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errMsg =
      data?.error?.message || `Groq API error (${response.status})`;
    const err = new Error(errMsg);
    err.status = response.status;
    throw err;
  }

  return data?.choices?.[0]?.message?.content?.trim() || "No response received.";
}

async function generateWithOpenRouter(cleanHistory, message, attachment = null) {
  if (!OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY is not configured.");
  }

  const messages = buildOpenAICompatibleMessages(
    cleanHistory,
    message,
    attachment
  );

  const response = await withTimeout(
    fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": `http://localhost:${PORT}`,
        "X-Title": "FLOT AI",
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages,
        temperature: 0.6,
      }),
    }),
    9500
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errMsg =
      data?.error?.message || `OpenRouter API error (${response.status})`;
    const err = new Error(errMsg);
    err.status = response.status;
    throw err;
  }

  return data?.choices?.[0]?.message?.content?.trim() || "No response received.";
}

async function resolveReply(
  cleanHistory,
  effectiveMessage,
  attachment,
  hasImageAttachment,
  planTier = "free"
) {
  if (hasImageAttachment) {
    try {
      const reply = await generateWithOpenRouter(
        cleanHistory,
        effectiveMessage,
        attachment
      );
      return { reply, provider: "openrouter" };
    } catch (openRouterErr) {
      console.warn(
        "OpenRouter image failed, trying Gemini fallback:",
        openRouterErr?.message || openRouterErr
      );
      const reply = await generateWithGemini(
        cleanHistory,
        effectiveMessage,
        attachment
      );
      return { reply, provider: "gemini" };
    }
  }

  if (planTier === "free") {
    try {
      const reply = await generateWithGroq(
        cleanHistory,
        effectiveMessage,
        attachment
      );
      return { reply, provider: "groq" };
    } catch (groqErr) {
      console.warn(
        "Free plan Groq failed, trying OpenRouter fallback:",
        groqErr?.message || groqErr
      );
    }

    try {
      const reply = await generateWithOpenRouter(
        cleanHistory,
        effectiveMessage,
        attachment
      );
      return { reply, provider: "openrouter" };
    } catch (openRouterErr) {
      console.warn(
        "Free plan OpenRouter failed, trying Gemini fallback:",
        openRouterErr?.message || openRouterErr
      );
    }

    const reply = await generateWithGemini(
      cleanHistory,
      effectiveMessage,
      attachment
    );
    return { reply, provider: "gemini" };
  }

  try {
    const reply = await generateWithGemini(
      cleanHistory,
      effectiveMessage,
      attachment
    );
    return { reply, provider: "gemini" };
  } catch (geminiErr) {
    console.warn(
      "Gemini failed, trying Groq fallback:",
      geminiErr?.message || geminiErr
    );
  }

  try {
    const reply = await generateWithGroq(
      cleanHistory,
      effectiveMessage,
      attachment
    );
    return { reply, provider: "groq" };
  } catch (groqErr) {
    console.warn(
      "Groq failed, trying OpenRouter fallback:",
      groqErr?.message || groqErr
    );
  }

  const reply = await generateWithOpenRouter(
    cleanHistory,
    effectiveMessage,
    attachment
  );
  return { reply, provider: "openrouter" };
}

function parseChatPayload(body = {}) {
  const { message, history = [], attachment = null, plan = "free" } = body;
  const cleanMessage = typeof message === "string" ? message.trim() : "";
  const hasAttachment = Boolean(
    attachment &&
      typeof attachment === "object" &&
      (attachment.kind === "image" || attachment.kind === "file")
  );

  if (!cleanMessage && !hasAttachment) {
    return { error: "Message or attachment is required." };
  }

  const effectiveMessage =
    cleanMessage ||
    (attachment?.kind === "image"
      ? "Describe what is in this image."
      : `Analyze the file ${attachment?.name || "attachment"}.`);

  const cleanHistory = normalizeHistory(history);
  const hasImageAttachment = Boolean(
    attachment &&
      typeof attachment === "object" &&
      attachment.kind === "image" &&
      attachment.base64Data &&
      attachment.mimeType
  );

  return {
    effectiveMessage,
    attachment,
    cleanHistory,
    hasImageAttachment,
    planTier: normalizePlanTier(plan),
  };
}

app.get("/api/status", (req, res) => {
  res.json({
    name: "FLOT",
    status: "online",
    message: "FLOT is ready!",
  });
});

// --- Image Generator Route ---
app.post("/api/images/generate", async (req, res) => {
  try {
    const prompt = String(req.body?.prompt || "").trim();
    const aspectRatio = ["1:1", "16:9", "9:16", "4:3", "3:4"].includes(
      String(req.body?.aspectRatio || "").trim()
    )
      ? String(req.body?.aspectRatio).trim()
      : "1:1";
    const planTier = normalizePlanTier(req.body?.plan || "free");

    if (!prompt) {
      return res.status(400).json({ error: "Image prompt is required." });
    }

    const quota = checkAndConsumeHourlyQuota(req, planTier, true);
    if (!quota.ok) {
      return res.status(429).json({ error: quota.error });
    }

    if (!ai || !process.env.GEMINI_API_KEY) {
      return res
        .status(500)
        .json({ error: "GEMINI_API_KEY is not configured in .env." });
    }

    const response = await withTimeout(
      ai.models.generateImages({
        model: GEMINI_IMAGE_MODEL,
        prompt,
        config: {
          numberOfImages: 1,
          aspectRatio,
        },
      }),
      15000
    );

    const generated = response?.generatedImages?.[0]?.image;
    const base64 = generated?.imageBytes || "";
    const mimeType = generated?.mimeType || "image/png";

    if (!base64) {
      return res
        .status(502)
        .json({ error: "No image data returned from model." });
    }

    recordMessageTelemetry(planTier, "gemini-image", true);

    return res.json({
      ok: true,
      mimeType,
      base64,
      dataUrl: `data:${mimeType};base64,${base64}`,
    });
  } catch (err) {
    console.error("FLOT Image Generation Error:", err);
    return res.status(500).json({
      error: err?.message || "Failed to generate image.",
    });
  }
});

// --- File Generator Route (PDF, XLSX, CSV, TXT, MD, JSON) ---
app.post("/api/files/generate", async (req, res) => {
  try {
    const format = String(req.body?.format || "pdf")
      .trim()
      .toLowerCase();
    const title = String(req.body?.title || "FLOT Document").trim();
    const content = String(req.body?.content || "");
    const rows = Array.isArray(req.body?.rows) ? req.body.rows : [];
    const headers = Array.isArray(req.body?.headers) ? req.body.headers : [];
    const fileNameBase = sanitizeFileBaseName(
      req.body?.fileName || title,
      "flot-file"
    );
    const planTier = normalizePlanTier(req.body?.plan || "free");

    const supported = ["pdf", "xlsx", "csv", "txt", "md", "json"];
    if (!supported.includes(format)) {
      return res.status(400).json({
        error: `Unsupported format '${format}'. Supported: ${supported.join(", ")}`,
      });
    }

    const quota = checkAndConsumeHourlyQuota(req, planTier, true);
    if (!quota.ok) {
      return res.status(429).json({ error: quota.error });
    }

    let artifact;

    if (format === "pdf" || format === "xlsx" || format === "csv") {
      artifact = await createGeneratedFileArtifact({
        format,
        title,
        content,
        rows,
        headers,
        fileName: fileNameBase,
      });
    } else if (format === "json") {
      const payloadObj = {
        title,
        generatedAt: new Date().toISOString(),
        content,
        rows,
      };
      const fileBuffer = Buffer.from(JSON.stringify(payloadObj, null, 2), "utf8");
      const mimeType = "application/json; charset=utf-8";
      const base64 = fileBuffer.toString("base64");
      artifact = {
        fileName: `${fileNameBase}.json`,
        format: "json",
        mimeType,
        base64,
        dataUrl: `data:${mimeType};base64,${base64}`,
      };
    } else {
      const textBody = `${title}\n${"=".repeat(Math.min(title.length, 40))}\n${content}`;
      const fileBuffer = Buffer.from(textBody, "utf8");
      const mimeType =
        format === "md"
          ? "text/markdown; charset=utf-8"
          : "text/plain; charset=utf-8";
      const base64 = fileBuffer.toString("base64");
      artifact = {
        fileName: `${fileNameBase}.${format}`,
        format,
        mimeType,
        base64,
        dataUrl: `data:${mimeType};base64,${base64}`,
      };
    }

    recordMessageTelemetry(planTier, "flot-file-gen", true);

    return res.json({
      ok: true,
      ...artifact,
    });
  } catch (err) {
    console.error("FLOT File Generation Error:", err);
    return res.status(500).json({
      error: err?.message || "Failed to generate file.",
    });
  }
});

app.post("/api/chat/stream", async (req, res) => {
  const parsed = parseChatPayload(req.body);
  if (parsed.error) {
    return res.status(400).json({ error: parsed.error });
  }

  const quota = checkAndConsumeHourlyQuota(
    req,
    parsed.planTier,
    Boolean(parsed.attachment)
  );
  if (!quota.ok) {
    return res.status(429).json({ error: quota.error });
  }

  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders?.();

  try {
    const { reply: rawReply, provider } = await resolveReply(
      parsed.cleanHistory,
      parsed.effectiveMessage,
      parsed.attachment,
      parsed.hasImageAttachment,
      parsed.planTier
    );

    const { reply, generatedFiles } = await extractGeneratedFilesFromReply(
      rawReply
    );

    recordMessageTelemetry(parsed.planTier, provider, Boolean(parsed.attachment));

    const chunkSize = 28;
    for (let i = 0; i < reply.length; i += chunkSize) {
      const piece = reply.slice(i, i + chunkSize);
      res.write(`data: ${JSON.stringify({ delta: piece })}\n\n`);
      await new Promise((r) => setTimeout(r, 12));
    }

    res.write(
      `data: ${JSON.stringify({
        done: true,
        reply,
        provider,
        generatedFiles,
      })}\n\n`
    );
    res.end();
  } catch (err) {
    console.error("FLOT Stream Error:", err);
    const friendlyError = isTransientError(err)
      ? "FLOT is currently experiencing high demand. Please try again in a moment."
      : err?.message || "Failed to get a response from FLOT.";

    res.write(`data: ${JSON.stringify({ error: friendlyError })}\n\n`);
    res.end();
  }
});

app.post("/api/chat", async (req, res) => {
  try {
    const parsed = parseChatPayload(req.body);
    if (parsed.error) {
      return res.status(400).json({ error: parsed.error });
    }

    const quota = checkAndConsumeHourlyQuota(
      req,
      parsed.planTier,
      Boolean(parsed.attachment)
    );
    if (!quota.ok) {
      return res.status(429).json({ error: quota.error });
    }

    const { reply: rawReply, provider } = await resolveReply(
      parsed.cleanHistory,
      parsed.effectiveMessage,
      parsed.attachment,
      parsed.hasImageAttachment,
      parsed.planTier
    );

    const { reply, generatedFiles } = await extractGeneratedFilesFromReply(
      rawReply
    );

    recordMessageTelemetry(parsed.planTier, provider, Boolean(parsed.attachment));

    return res.json({ reply, provider, generatedFiles });
  } catch (err) {
    console.error("FLOT Chat Error Full:", err);

    const friendlyError = isTransientError(err)
      ? "FLOT is currently experiencing high demand. Please try again in a moment."
      : err?.message || "Failed to get a response from FLOT.";

    res.status(isTransientError(err) ? 503 : 500).json({
      error: friendlyError,
    });
  }
});

app.listen(PORT, () => {
  console.log(`FLOT is running on http://localhost:${PORT}`);
  console.log("SUPABASE_URL:", JSON.stringify(SUPABASE_URL));
});
