const $ = (selector) => document.querySelector(selector);

const elements = {
  sidebar: $("#sidebar"),
  overlay: $("#mobileOverlay"),
  menuBtn: $("#menuBtn"),
  closeSidebar: $("#closeSidebar"),
  newChat: $("#newChat"),
  languageBtn: $("#languageBtn"),
  languageLabel: $("#languageLabel"),
  themeBtn: $("#themeBtn"),
  welcome: $("#welcomeScreen"),
  messages: $("#messages"),
  history: $("#historyList"),
  form: $("#chatForm"),
  input: $("#messageInput"),
  send: $("#sendBtn"),
  chatArea: $("#chatArea"),
  attachBtn: $("#attachBtn"),
  fileInput: $("#fileInput"),
  attachmentPreview: $("#attachmentPreview"),
  accountBtn: $("#accountBtn"),
  accountPopover: $("#accountPopover"),
  popoverUserName: $("#popoverUserName"),
  popoverUserEmail: $("#popoverUserEmail"),
  openAuthModalBtn: $("#openAuthModalBtn"),
  languageSelect: $("#languageSelect"),
  darkModeBtn: $("#darkModeBtn"),
  lightModeBtn: $("#lightModeBtn"),
  archiveCountBadge: $("#archiveCountBadge"),
  archiveGateView: $("#archiveGateView"),
  archiveGateHint: $("#archiveGateHint"),
  openArchiveBtn: $("#openArchiveBtn"),
  openArchiveBtnText: $("#openArchiveBtnText"),
  archivePassForm: $("#archivePassForm"),
  archivePassTitle: $("#archivePassTitle"),
  archivePassInput: $("#archivePassInput"),
  archivePassConfirmInput: $("#archivePassConfirmInput"),
  archivePassError: $("#archivePassError"),
  archivePassSubmitBtn: $("#archivePassSubmitBtn"),
  archivePassCancelBtn: $("#archivePassCancelBtn"),
  archiveUnlockedView: $("#archiveUnlockedView"),
  lockArchiveBtn: $("#lockArchiveBtn"),
  archiveList: $("#archiveList"),
  currentPlanBadge: $("#currentPlanBadge"),
  topbarPlanTag: $("#topbarPlanTag"),
  plansGrid: $("#plansGrid"),
  activationForm: $("#activationForm"),
  activationTargetLabel: $("#activationTargetLabel"),
  cancelActivationBtn: $("#cancelActivationBtn"),
  activationCodeInput: $("#activationCodeInput"),
  codeCounter: $("#codeCounter"),
  activatePlanBtn: $("#activatePlanBtn"),
  activationError: $("#activationError"),
  activationSuccess: $("#activationSuccess"),
  popoverLogoutRow: $("#popoverLogoutRow"),
  popoverLogoutBtn: $("#popoverLogoutBtn"),
  userAvatar: $("#userAvatar"),
  userName: $("#userName"),
  userSubtitle: $("#userSubtitle"),
  authModal: $("#authModal"),
  closeAuthModal: $("#closeAuthModal"),
  guestAuthView: $("#guestAuthView"),
  profileAuthView: $("#profileAuthView"),
  tabLogin: $("#tabLogin"),
  tabRegister: $("#tabRegister"),
  authForm: $("#authForm"),
  nameFieldGroup: $("#nameFieldGroup"),
  authName: $("#authName"),
  authEmail: $("#authEmail"),
  authPassword: $("#authPassword"),
  authError: $("#authError"),
  authSubmitBtn: $("#authSubmitBtn"),
  profileAvatar: $("#profileAvatar"),
  profileDisplayName: $("#profileDisplayName"),
  profileDisplayEmail: $("#profileDisplayEmail"),
  profileForm: $("#profileForm"),
  profileNameInput: $("#profileNameInput"),
  profileSuccess: $("#profileSuccess"),
  profileError: $("#profileError"),
  logoutBtn: $("#logoutBtn"),
};

const translations = {
  en: {
    newChat: "New chat",
    recent: "RECENT",
    emptyHistory: "Your conversations will appear here.",
    freePlan: "Free plan",
    signInPrompt: "Sign in to save history",
    accountTitle: "Account",
    signIn: "Sign in",
    createAccount: "Create account",
    fullName: "Full name",
    email: "Email",
    password: "Password",
    saveChanges: "Save changes",
    signOut: "Sign out",
    profileSaved: "Profile updated.",
    welcomeEyebrow: "YOUR AI ASSISTANT",
    welcomeTitle: "What can I help",
    welcomeHighlight: "you with?",
    welcomeDescription: "Ask anything. Explore ideas. Make something amazing.",
    suggestion1Title: "Creative ideas",
    suggestion1Desc: "Explore something new",
    suggestion2Title: "Learn something",
    suggestion2Desc: "Understand complex topics",
    suggestion3Title: "Write anything",
    suggestion3Desc: "Turn thoughts into words",
    suggestion4Title: "Build & code",
    suggestion4Desc: "Bring your ideas to life",
    inputPlaceholder: "Message FLOT...",
    previewLabel: "FLOT Preview",
    disclaimer: "FLOT can make mistakes. Check important information.",
    thinking: "Thinking...",
    requestError: "Failed to get a response from FLOT.",
    networkError: "Could not reach the server. Make sure it is running.",
    retry: "Retry",
    archiveChat: "Archive chat",
    restoreChat: "Restore",
    deleteChat: "Delete chat",
    archiveTitle: "Chat Archive",
    archiveLockedHint: "Protected by password. Click to unlock.",
    archiveSetupHint: "No password set yet. Click to create one.",
    openArchive: "Open Archive",
    setupArchivePassTitle: "Create archive password (min 4 chars)",
    unlockArchivePassTitle: "Enter archive password",
    newPassPlaceholder: "Create password",
    confirmPassPlaceholder: "Confirm password",
    enterPassPlaceholder: "Archive password",
    createAndOpen: "Create & Open",
    unlockBtn: "Unlock",
    cancel: "Cancel",
    lockArchive: "Lock",
    archivedChatsLabel: "Archived chats",
    passTooShort: "Password must be at least 4 characters.",
    passMismatch: "Passwords do not match.",
    wrongArchivePass: "Incorrect archive password.",
    emptyArchive: "No archived chats.",
    languageLabel: "Language",
    themeLabel: "Theme",
    darkMode: "Dark",
    lightMode: "Light",
    subscriptionTitle: "Subscription",
    planFreePrice: "$0",
    planFreeF1: "25 msgs/hr",
    planFreeF2: "Fast AI models",
    planFreeF3: "3 files/hr",
    planProF1: "300 msgs/hr",
    planProF2: "Full Gemini AI",
    planProF3: "50 files/hr",
    planUltraF1: "Unlimited msgs",
    planUltraF2: "Priority speed",
    planUltraF3: "Unlimited files",
    activatePrefix: "Activate",
    activateBtn: "Activate",
    codePlaceholder: "12-CHAR CODE",
    invalidCodeError: "Enter a valid 12-character code (letters & numbers).",
    planActivatedSuccess: "Plan activated!",
    msgLimitReached: "Message limit reached for {plan}. Resets in {mins} min.",
    fileLimitReached: "File limit reached for {plan}. Resets in {mins} min.",
    copy: "Copy",
    copied: "Copied",
    downloadFile: "Download",
    exportExcel: "Export Excel",
    exportingFile: "Exporting...",
    attachFile: "Attach file or image",
    removeAttachment: "Remove attachment",
    fileTooLarge: "File size must be under 6 MB.",
    unsupportedFile:
      "Unsupported file type. Please choose an image or text/code file.",
    you: "You",
    assistant: "FLOT",
    language: "العربية",
  },

  ar: {
    newChat: "محادثة جديدة",
    recent: "المحادثات الأخيرة",
    emptyHistory: "محادثاتك هتظهر هنا.",
    freePlan: "الخطة المجانية",
    signInPrompt: "سجّل الدخول لحفظ محادثاتك",
    accountTitle: "حساب المستخدم",
    signIn: "تسجيل الدخول",
    createAccount: "إنشاء حساب",
    fullName: "الاسم الكامل",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    saveChanges: "حفظ التعديلات",
    signOut: "تسجيل الخروج",
    profileSaved: "تم تحديث بيانات الحساب.",
    welcomeEyebrow: "مساعدك الذكي",
    welcomeTitle: "إزاي أقدر",
    welcomeHighlight: "أساعدك؟",
    welcomeDescription:
      "اسأل عن أي حاجة، اكتشف أفكار جديدة، وابدأ إبداعك.",
    suggestion1Title: "أفكار إبداعية",
    suggestion1Desc: "اكتشف أفكار جديدة",
    suggestion2Title: "اتعلم حاجة",
    suggestion2Desc: "افهم المواضيع الصعبة",
    suggestion3Title: "اكتب أي حاجة",
    suggestion3Desc: "حوّل أفكارك لكلمات",
    suggestion4Title: "برمجة وتطوير",
    suggestion4Desc: "حوّل أفكارك لمشاريع",
    inputPlaceholder: "اكتب رسالتك لـ FLOT...",
    previewLabel: "معاينة FLOT",
    disclaimer:
      "ممكن FLOT يقدم معلومات غير دقيقة. راجع المعلومات المهمة.",
    thinking: "جاري التفكير...",
    requestError: "حدث خطأ أثناء الحصول على رد من FLOT.",
    networkError: "تعذر الاتصال بالسيرفر. تأكد أن السيرفر يعمل.",
    retry: "إعادة المحاولة",
    archiveChat: "أرشفة المحادثة",
    restoreChat: "استعادة",
    deleteChat: "حذف المحادثة",
    archiveTitle: "أرشيف الشات",
    archiveLockedHint: "محمي بكلمة مرور. اضغط للفتح.",
    archiveSetupHint: "أنشئ كلمة مرور أول مرة لدخول الأرشيف.",
    openArchive: "دخول الأرشيف",
    setupArchivePassTitle: "إنشاء كلمة مرور للأرشيف (4 أحرف على الأقل)",
    unlockArchivePassTitle: "أدخل كلمة مرور الأرشيف",
    newPassPlaceholder: "كلمة المرور الجديدة",
    confirmPassPlaceholder: "تأكيد كلمة المرور",
    enterPassPlaceholder: "كلمة مرور الأرشيف",
    createAndOpen: "إنشاء ودخول",
    unlockBtn: "فتح",
    cancel: "إلغاء",
    lockArchive: "قفل",
    archivedChatsLabel: "المحادثات المؤرشفة",
    passTooShort: "كلمة المرور يجب أن تكون 4 أحرف على الأقل.",
    passMismatch: "كلمتا المرور غير متطابقتين.",
    wrongArchivePass: "كلمة مرور الأرشيف غير صحيحة.",
    emptyArchive: "لا توجد محادثات مؤرشفة.",
    languageLabel: "اللغة",
    themeLabel: "المظهر",
    darkMode: "داكن",
    lightMode: "فاتح",
    subscriptionTitle: "الاشتراكات",
    planFreePrice: "مجاني",
    planFreeF1: "25 رسالة/ساعة",
    planFreeF2: "نماذج سريعة",
    planFreeF3: "3 ملفات/ساعة",
    planProF1: "300 رسالة/ساعة",
    planProF2: "Gemini الكامل",
    planProF3: "50 ملف/ساعة",
    planUltraF1: "رسائل غير محدودة",
    planUltraF2: "أولوية قصوى",
    planUltraF3: "ملفات غير محدودة",
    activatePrefix: "تفعيل باقة",
    activateBtn: "تفعيل",
    codePlaceholder: "كود من 12 حرف ورقم",
    invalidCodeError: "أدخل كود مكون من 12 حرف ورقم بالضبط.",
    planActivatedSuccess: "تم تفعيل الباقة بنجاح!",
    msgLimitReached:
      "وصلت للحد المسموح في باقة {plan}. سيتم التصفير خلال {mins} دقيقة.",
    fileLimitReached:
      "وصلت للحد المسموح للملفات في باقة {plan}. سيتم التصفير خلال {mins} دقيقة.",
    copy: "نسخ",
    copied: "تم النسخ",
    downloadFile: "تحميل الملف",
    exportExcel: "تصدير Excel",
    exportingFile: "جاري التجهيز...",
    attachFile: "إرفاق ملف أو صورة",
    removeAttachment: "إزالة المرفق",
    fileTooLarge: "حجم الملف يجب أن يكون أقل من 6 ميجابايت.",
    unsupportedFile:
      "نوع الملف غير مدعوم. اختر صورة أو ملف نصي/برمجي.",
    you: "أنت",
    assistant: "FLOT",
    language: "English",
  },

  fr: {
    newChat: "Nouveau chat",
    recent: "RÉCENTS",
    emptyHistory: "Vos conversations apparaîtront ici.",
    freePlan: "Offre gratuite",
    signInPrompt: "Connectez-vous pour enregistrer",
    accountTitle: "Compte",
    signIn: "Connexion",
    createAccount: "Créer un compte",
    fullName: "Nom complet",
    email: "E-mail",
    password: "Mot de passe",
    saveChanges: "Enregistrer",
    signOut: "Déconnexion",
    profileSaved: "Profil mis à jour.",
    welcomeEyebrow: "VOTRE ASSISTANT IA",
    welcomeTitle: "Comment puis-je",
    welcomeHighlight: "vous aider ?",
    welcomeDescription: "Posez vos questions, explorez et créez.",
    suggestion1Title: "Idées créatives",
    suggestion1Desc: "Explorer quelque chose de neuf",
    suggestion2Title: "Apprendre",
    suggestion2Desc: "Comprendre des sujets complexes",
    suggestion3Title: "Rédiger",
    suggestion3Desc: "Transformer vos idées en texte",
    suggestion4Title: "Développer",
    suggestion4Desc: "Donner vie à vos projets",
    inputPlaceholder: "Écrire à FLOT...",
    previewLabel: "Aperçu FLOT",
    disclaimer: "FLOT peut faire des erreurs. Vérifiez les infos importantes.",
    thinking: "Réflexion...",
    requestError: "Échec de la réponse de FLOT.",
    networkError: "Impossible de joindre le serveur.",
    retry: "Réessayer",
    archiveChat: "Archiver",
    restoreChat: "Restaurer",
    deleteChat: "Supprimer",
    archiveTitle: "Archives",
    archiveLockedHint: "Protégé par mot de passe.",
    archiveSetupHint: "Créez un mot de passe pour ouvrir.",
    openArchive: "Ouvrir",
    setupArchivePassTitle: "Créer un mot de passe (min 4 car.)",
    unlockArchivePassTitle: "Mot de passe des archives",
    newPassPlaceholder: "Nouveau mot de passe",
    confirmPassPlaceholder: "Confirmer le mot de passe",
    enterPassPlaceholder: "Mot de passe",
    createAndOpen: "Créer",
    unlockBtn: "Déverrouiller",
    cancel: "Annuler",
    lockArchive: "Verrouiller",
    archivedChatsLabel: "Discussions archivées",
    passTooShort: "4 caractères minimum.",
    passMismatch: "Les mots de passe ne correspondent pas.",
    wrongArchivePass: "Mot de passe incorrect.",
    emptyArchive: "Aucune discussion archivée.",
    languageLabel: "Langue",
    themeLabel: "Thème",
    darkMode: "Sombre",
    lightMode: "Clair",
    subscriptionTitle: "Abonnement",
    planFreePrice: "0 €",
    planFreeF1: "25 msg/h",
    planFreeF2: "Modèles rapides",
    planFreeF3: "3 fichiers/h",
    planProF1: "300 msg/h",
    planProF2: "Gemini complet",
    planProF3: "50 fichiers/h",
    planUltraF1: "Messages illimités",
    planUltraF2: "Vitesse prioritaire",
    planUltraF3: "Fichiers illimités",
    activatePrefix: "Activer",
    activateBtn: "Activer",
    codePlaceholder: "CODE 12 CAR.",
    invalidCodeError: "Entrez un code valide de 12 caractères.",
    planActivatedSuccess: "Forfait activé !",
    msgLimitReached: "Limite de messages atteinte pour {plan}. Reset dans {mins} min.",
    fileLimitReached: "Limite de fichiers atteinte pour {plan}. Reset dans {mins} min.",
    copy: "Copier",
    copied: "Copié",
    downloadFile: "Télécharger",
    exportExcel: "Exporter Excel",
    exportingFile: "Préparation...",
    attachFile: "Joindre un fichier ou une image",
    removeAttachment: "Retirer la pièce jointe",
    fileTooLarge: "La taille du fichier doit être inférieure à 6 Mo.",
    unsupportedFile: "Type de fichier non pris en charge.",
    you: "Vous",
    assistant: "FLOT",
    language: "English",
  },

  es: {
    newChat: "Nuevo chat",
    recent: "RECIENTES",
    emptyHistory: "Tus conversaciones aparecerán aquí.",
    freePlan: "Plan gratuito",
    signInPrompt: "Inicia sesión para guardar",
    accountTitle: "Cuenta",
    signIn: "Iniciar sesión",
    createAccount: "Crear cuenta",
    fullName: "Nombre completo",
    email: "Correo electrónico",
    password: "Contraseña",
    saveChanges: "Guardar cambios",
    signOut: "Cerrar sesión",
    profileSaved: "Perfil actualizado.",
    welcomeEyebrow: "TU ASISTENTE IA",
    welcomeTitle: "¿En qué puedo",
    welcomeHighlight: "ayudarte?",
    welcomeDescription: "Pregunta lo que quieras, explora y crea.",
    suggestion1Title: "Ideas creativas",
    suggestion1Desc: "Explora algo nuevo",
    suggestion2Title: "Aprender algo",
    suggestion2Desc: "Entiende temas complejos",
    suggestion3Title: "Escribir",
    suggestion3Desc: "Convierte ideas en palabras",
    suggestion4Title: "Programar",
    suggestion4Desc: "Haz realidad tus proyectos",
    inputPlaceholder: "Escribe a FLOT...",
    previewLabel: "Vista previa FLOT",
    disclaimer: "FLOT puede cometer errores. Revisa la información importante.",
    thinking: "Pensando...",
    requestError: "No se pudo obtener respuesta de FLOT.",
    networkError: "No se pudo conectar con el servidor.",
    retry: "Reintentar",
    archiveChat: "Archivar",
    restoreChat: "Restaurar",
    deleteChat: "Eliminar",
    archiveTitle: "Archivo de chats",
    archiveLockedHint: "Protegido con contraseña.",
    archiveSetupHint: "Crea una contraseña para entrar.",
    openArchive: "Abrir archivo",
    setupArchivePassTitle: "Crear contraseña (mín. 4 car.)",
    unlockArchivePassTitle: "Contraseña del archivo",
    newPassPlaceholder: "Nueva contraseña",
    confirmPassPlaceholder: "Confirmar contraseña",
    enterPassPlaceholder: "Contraseña",
    createAndOpen: "Crear y abrir",
    unlockBtn: "Desbloquear",
    cancel: "Cancelar",
    lockArchive: "Bloquear",
    archivedChatsLabel: "Chats archivados",
    passTooShort: "Mínimo 4 caracteres.",
    passMismatch: "Las contraseñas no coinciden.",
    wrongArchivePass: "Contraseña incorrecta.",
    emptyArchive: "No hay chats archivados.",
    languageLabel: "Idioma",
    themeLabel: "Tema",
    darkMode: "Oscuro",
    lightMode: "Claro",
    subscriptionTitle: "Suscripción",
    planFreePrice: "$0",
    planFreeF1: "25 msgs/h",
    planFreeF2: "Modelos rápidos",
    planFreeF3: "3 archivos/h",
    planProF1: "300 msgs/h",
    planProF2: "Gemini completo",
    planProF3: "50 archivos/h",
    planUltraF1: "Mensajes ilimitados",
    planUltraF2: "Velocidad prioritaria",
    planUltraF3: "Archivos ilimitados",
    activatePrefix: "Activar",
    activateBtn: "Activar",
    codePlaceholder: "CÓDIGO 12 CAR.",
    invalidCodeError: "Ingresa un código válido de 12 caracteres.",
    planActivatedSuccess: "¡Plan activado!",
    msgLimitReached: "Límite de mensajes alcanzado en {plan}. Reinicia en {mins} min.",
    fileLimitReached: "Límite de archivos alcanzado en {plan}. Reinicia en {mins} min.",
    copy: "Copiar",
    copied: "Copiado",
    downloadFile: "Descargar",
    exportExcel: "Exportar Excel",
    exportingFile: "Generando...",
    attachFile: "Adjuntar archivo o imagen",
    removeAttachment: "Quitar adjunto",
    fileTooLarge: "El archivo debe pesar menos de 6 MB.",
    unsupportedFile: "Tipo de archivo no compatible.",
    you: "Tú",
    assistant: "FLOT",
    language: "English",
  },
};

const MAX_FILE_SIZE = 6 * 1024 * 1024;
const HOURLY_RESET_MS = 60 * 60 * 1000;

const PLAN_LIMITS = {
  free: {
    maxMessages: 25,
    maxFiles: 3,
    windowMs: HOURLY_RESET_MS,
  },
  pro: {
    maxMessages: 300,
    maxFiles: 50,
    windowMs: HOURLY_RESET_MS,
  },
  ultra: {
    maxMessages: Infinity,
    maxFiles: Infinity,
    windowMs: HOURLY_RESET_MS,
  },
};

const TEXT_EXTENSIONS = new Set([
  "txt",
  "md",
  "json",
  "csv",
  "js",
  "mjs",
  "cjs",
  "ts",
  "tsx",
  "jsx",
  "html",
  "css",
  "scss",
  "py",
  "sql",
  "xml",
  "yaml",
  "yml",
  "log",
  "env",
  "sh",
]);

function safeStorageGet(key, fallback = null) {
  try {
    const val = localStorage.getItem(key);
    return val !== null ? val : fallback;
  } catch {
    return fallback;
  }
}

function safeStorageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignore storage quota or private mode errors
  }
}

function safeStorageRemove(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore
  }
}

let currentLanguage = safeStorageGet("flot-language", "en");
if (!translations[currentLanguage]) currentLanguage = "en";

let currentTheme = safeStorageGet("flot-theme", "dark");
let authMode = "login";

let currentUser = null;
let accessToken = safeStorageGet("flot-access-token", "");

try {
  const savedUser = safeStorageGet("flot-user", "");
  if (savedUser) {
    const parsedUser = JSON.parse(savedUser);
    if (parsedUser && parsedUser.id && parsedUser.email) {
      currentUser = parsedUser;
    }
  }
} catch {
  currentUser = null;
}

const VALID_PLANS = new Set(["free", "pro", "ultra"]);
let pendingTargetPlan = null;

function getPlanStorageKey() {
  return currentUser?.id ? `flot-plan-${currentUser.id}` : "flot-plan-guest";
}

function getUsageStorageKey(planKey = currentPlan) {
  const userPart = currentUser?.id || "guest";
  return `flot-hourly-usage-${userPart}-${planKey}`;
}

function normalizePlan(rawPlan) {
  const clean = String(rawPlan || "").trim().toLowerCase();
  if (clean.includes("ultra")) return "ultra";
  if (clean.includes("pro")) return "pro";
  return "free";
}

function loadCurrentPlan() {
  const stored = safeStorageGet(getPlanStorageKey(), "");
  if (VALID_PLANS.has(stored)) return stored;
  return normalizePlan(currentUser?.plan);
}

let currentPlan = loadCurrentPlan();

function getPlanDisplayName(planKey) {
  if (planKey === "ultra") return "Ultra";
  if (planKey === "pro") return "Pro";
  return "Free";
}

function getHourlyUsageState(planKey = currentPlan) {
  const now = Date.now();
  const cfg = PLAN_LIMITS[planKey] || PLAN_LIMITS.free;
  const fresh = {
    messages: 0,
    files: 0,
    resetAt: now + cfg.windowMs,
  };

  try {
    const raw = safeStorageGet(getUsageStorageKey(planKey), "");
    if (!raw) {
      safeStorageSet(getUsageStorageKey(planKey), JSON.stringify(fresh));
      return fresh;
    }
    const parsed = JSON.parse(raw);
    const resetAt = Number(parsed?.resetAt) || 0;
    if (!resetAt || now >= resetAt) {
      safeStorageSet(getUsageStorageKey(planKey), JSON.stringify(fresh));
      return fresh;
    }
    return {
      messages: Math.max(0, Number(parsed?.messages) || 0),
      files: Math.max(0, Number(parsed?.files) || 0),
      resetAt,
    };
  } catch {
    return fresh;
  }
}

function saveHourlyUsageState(state, planKey = currentPlan) {
  safeStorageSet(getUsageStorageKey(planKey), JSON.stringify(state));
}

function formatTemplate(template, params = {}) {
  return Object.entries(params).reduce(
    (acc, [k, v]) => acc.replaceAll(`{${k}}`, String(v)),
    template
  );
}

function evaluateHourlyQuota(hasFile) {
  const dict = translations[currentLanguage] || translations.en;
  const cfg = PLAN_LIMITS[currentPlan] || PLAN_LIMITS.free;
  const state = getHourlyUsageState(currentPlan);
  const minsLeft = Math.max(1, Math.ceil((state.resetAt - Date.now()) / 60000));
  const planName = getPlanDisplayName(currentPlan);

  if (state.messages + 1 > cfg.maxMessages) {
    return {
      ok: false,
      state,
      reason: formatTemplate(dict.msgLimitReached, {
        plan: planName,
        mins: minsLeft,
      }),
    };
  }

  if (hasFile && state.files + 1 > cfg.maxFiles) {
    return {
      ok: false,
      state,
      reason: formatTemplate(dict.fileLimitReached, {
        plan: planName,
        mins: minsLeft,
      }),
    };
  }

  return { ok: true, state };
}

function recordHourlyQuota(state, hasFile) {
  const next = {
    ...state,
    messages: state.messages + 1,
    files: state.files + (hasFile ? 1 : 0),
  };
  saveHourlyUsageState(next, currentPlan);
  return next;
}

function updateSubscriptionUI() {
  const dict = translations[currentLanguage] || translations.en;
  const label = getPlanDisplayName(currentPlan);

  if (elements.currentPlanBadge) {
    elements.currentPlanBadge.textContent = label;
  }
  if (elements.topbarPlanTag) {
    elements.topbarPlanTag.textContent = label;
  }

  document.querySelectorAll(".plan-card").forEach((card) => {
    const plan = card.dataset.plan;
    card.classList.toggle("active", plan === currentPlan);
  });

  if (elements.activationCodeInput) {
    elements.activationCodeInput.placeholder = dict.codePlaceholder;
  }
}

function openPlanActivation(targetPlan) {
  const dict = translations[currentLanguage] || translations.en;
  pendingTargetPlan = targetPlan;

  if (elements.activationError) elements.activationError.hidden = true;
  if (elements.activationSuccess) elements.activationSuccess.hidden = true;
  if (elements.activationCodeInput) elements.activationCodeInput.value = "";
  if (elements.codeCounter) elements.codeCounter.textContent = "0 / 12";

  if (elements.activationTargetLabel) {
    elements.activationTargetLabel.textContent = `${dict.activatePrefix} ${getPlanDisplayName(targetPlan)}`;
  }
  if (elements.activationForm) {
    elements.activationForm.hidden = false;
  }
  elements.activationCodeInput?.focus();
}

function closePlanActivation() {
  pendingTargetPlan = null;
  if (elements.activationForm) elements.activationForm.hidden = true;
  if (elements.activationError) elements.activationError.hidden = true;
  if (elements.activationSuccess) elements.activationSuccess.hidden = true;
  if (elements.activationCodeInput) elements.activationCodeInput.value = "";
}

function setUserPlan(newPlan, activationCode = "") {
  const normalized = VALID_PLANS.has(newPlan) ? newPlan : "free";
  currentPlan = normalized;
  safeStorageSet(getPlanStorageKey(), normalized);
  getHourlyUsageState(normalized);

  if (activationCode) {
    safeStorageSet(`${getPlanStorageKey()}-code`, activationCode);
  }

  if (currentUser) {
    currentUser.plan = getPlanDisplayName(normalized);
    safeStorageSet("flot-user", JSON.stringify(currentUser));
  }

  updateSubscriptionUI();
}

let isArchiveUnlocked = false;
let archivePassMode = "unlock";

function getArchivePassStorageKey() {
  return currentUser?.id
    ? `flot-archive-pass-${currentUser.id}`
    : "flot-archive-pass-guest";
}

async function hashSecret(secret) {
  const raw = String(secret || "");
  if (window.crypto?.subtle && window.TextEncoder) {
    const data = new TextEncoder().encode(raw);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }
  return btoa(unescape(encodeURIComponent(raw)));
}

function hasArchivePassword() {
  return Boolean(safeStorageGet(getArchivePassStorageKey(), ""));
}

function updateArchiveGateUI() {
  const dict = translations[currentLanguage] || translations.en;
  const archivedCount = getArchivedConversations().length;

  if (elements.archiveCountBadge) {
    elements.archiveCountBadge.textContent = String(archivedCount);
  }

  const hasPass = hasArchivePassword();
  if (elements.archiveGateHint) {
    elements.archiveGateHint.textContent = hasPass
      ? dict.archiveLockedHint
      : dict.archiveSetupHint;
  }
  if (elements.openArchiveBtnText) {
    elements.openArchiveBtnText.textContent = dict.openArchive;
  }

  if (isArchiveUnlocked) {
    if (elements.archiveGateView) elements.archiveGateView.hidden = true;
    if (elements.archivePassForm) elements.archivePassForm.hidden = true;
    if (elements.archiveUnlockedView) elements.archiveUnlockedView.hidden = false;
    renderArchiveList();
  } else {
    if (elements.archiveUnlockedView) elements.archiveUnlockedView.hidden = true;
    if (elements.archivePassForm && !elements.archivePassForm.hidden) {
      if (elements.archiveGateView) elements.archiveGateView.hidden = true;
    } else if (elements.archiveGateView) {
      elements.archiveGateView.hidden = false;
    }
  }
}

function showArchivePasswordForm() {
  const dict = translations[currentLanguage] || translations.en;
  const hasPass = hasArchivePassword();
  archivePassMode = hasPass ? "unlock" : "setup";

  if (elements.archivePassError) elements.archivePassError.hidden = true;
  if (elements.archivePassInput) elements.archivePassInput.value = "";
  if (elements.archivePassConfirmInput) elements.archivePassConfirmInput.value = "";

  if (archivePassMode === "setup") {
    if (elements.archivePassTitle)
      elements.archivePassTitle.textContent = dict.setupArchivePassTitle;
    if (elements.archivePassInput)
      elements.archivePassInput.placeholder = dict.newPassPlaceholder;
    if (elements.archivePassConfirmInput) {
      elements.archivePassConfirmInput.hidden = false;
      elements.archivePassConfirmInput.required = true;
      elements.archivePassConfirmInput.placeholder = dict.confirmPassPlaceholder;
    }
    if (elements.archivePassSubmitBtn)
      elements.archivePassSubmitBtn.textContent = dict.createAndOpen;
  } else {
    if (elements.archivePassTitle)
      elements.archivePassTitle.textContent = dict.unlockArchivePassTitle;
    if (elements.archivePassInput)
      elements.archivePassInput.placeholder = dict.enterPassPlaceholder;
    if (elements.archivePassConfirmInput) {
      elements.archivePassConfirmInput.hidden = true;
      elements.archivePassConfirmInput.required = false;
    }
    if (elements.archivePassSubmitBtn)
      elements.archivePassSubmitBtn.textContent = dict.unlockBtn;
  }

  if (elements.archiveGateView) elements.archiveGateView.hidden = true;
  if (elements.archiveUnlockedView) elements.archiveUnlockedView.hidden = true;
  if (elements.archivePassForm) elements.archivePassForm.hidden = false;
  elements.archivePassInput?.focus();
}

function lockArchive() {
  isArchiveUnlocked = false;
  if (elements.archivePassForm) elements.archivePassForm.hidden = true;
  if (elements.archivePassError) elements.archivePassError.hidden = true;
  if (elements.archivePassInput) elements.archivePassInput.value = "";
  if (elements.archivePassConfirmInput) elements.archivePassConfirmInput.value = "";
  updateArchiveGateUI();
}

function getHistoryStorageKey() {
  return currentUser?.id
    ? `flot-conversations-${currentUser.id}`
    : "flot-conversations-guest";
}

function loadConversationsFromLocal() {
  try {
    const legacyRaw = safeStorageGet("flot-conversations", "");
    if (legacyRaw && !safeStorageGet("flot-conversations-guest", "")) {
      safeStorageSet("flot-conversations-guest", legacyRaw);
    }

    const rawConv = safeStorageGet(getHistoryStorageKey(), "[]");
    const parsed = JSON.parse(rawConv || "[]");
    if (Array.isArray(parsed)) {
      return parsed
        .filter(
          (chat) =>
            chat && typeof chat === "object" && Array.isArray(chat.messages)
        )
        .map((chat) => ({
          ...chat,
          archived: Boolean(chat.archived),
        }));
    }
  } catch {
    // Fallback to empty
  }
  return [];
}

let conversations = loadConversationsFromLocal();

function getActiveConversations() {
  return conversations.filter((c) => !c.archived);
}

function getArchivedConversations() {
  return conversations.filter((c) => Boolean(c.archived));
}

const initialActive = getActiveConversations();
let activeChatId = initialActive.length > 0 ? initialActive[0].id : null;
let isSending = false;
let lastFailedPayload = null;
let pendingAttachment = null;

function getUserInitial() {
  const name = currentUser?.name?.trim();
  return name ? name[0].toUpperCase() : "G";
}

function updateAccountUI() {
  const dict = translations[currentLanguage] || translations.en;
  const initial = getUserInitial();
  const displayName = currentUser ? currentUser.name : "Guest";
  const subtitle = currentUser ? currentUser.email : dict.signInPrompt;

  if (elements.userAvatar) elements.userAvatar.textContent = initial;
  if (elements.userName) elements.userName.textContent = displayName;
  if (elements.userSubtitle) elements.userSubtitle.textContent = subtitle;

  if (elements.popoverUserName) elements.popoverUserName.textContent = displayName;
  if (elements.popoverUserEmail) elements.popoverUserEmail.textContent = subtitle;
  if (elements.popoverLogoutRow) {
    elements.popoverLogoutRow.hidden = !currentUser;
  }

  if (currentUser) {
    if (elements.profileAvatar) elements.profileAvatar.textContent = initial;
    if (elements.profileDisplayName)
      elements.profileDisplayName.textContent = currentUser.name;
    if (elements.profileDisplayEmail)
      elements.profileDisplayEmail.textContent = currentUser.email;
    if (elements.profileNameInput)
      elements.profileNameInput.value = currentUser.name;
  }
}

function toggleAccountPopover(forceState = null) {
  if (!elements.accountPopover || !elements.accountBtn) return;
  const nextOpen =
    typeof forceState === "boolean"
      ? forceState
      : elements.accountPopover.hidden;
  elements.accountPopover.hidden = !nextOpen;
  elements.accountBtn.setAttribute("aria-expanded", String(nextOpen));
  if (nextOpen) {
    updateArchiveGateUI();
    updateSubscriptionUI();
  } else {
    lockArchive();
    closePlanActivation();
  }
}

function syncAuthFormViews() {
  const dict = translations[currentLanguage] || translations.en;
  const isRegister = authMode === "register";

  if (elements.nameFieldGroup) elements.nameFieldGroup.hidden = !isRegister;
  if (elements.authName) elements.authName.required = isRegister;

  if (elements.authSubmitBtn) {
    elements.authSubmitBtn.textContent = isRegister
      ? dict.createAccount
      : dict.signIn;
  }

  if (elements.authPassword) {
    elements.authPassword.setAttribute(
      "autocomplete",
      isRegister ? "new-password" : "current-password"
    );
  }
}

function setAuthMode(mode) {
  authMode = mode;
  if (elements.authError) elements.authError.hidden = true;

  elements.tabLogin?.classList.toggle("active", mode === "login");
  elements.tabRegister?.classList.toggle("active", mode === "register");
  syncAuthFormViews();
}

function openAuthModal() {
  toggleAccountPopover(false);
  if (!elements.authModal) return;
  if (elements.authError) elements.authError.hidden = true;
  if (elements.profileError) elements.profileError.hidden = true;
  if (elements.profileSuccess) elements.profileSuccess.hidden = true;

  if (currentUser) {
    if (elements.guestAuthView) elements.guestAuthView.hidden = true;
    if (elements.profileAuthView) elements.profileAuthView.hidden = false;
    updateAccountUI();
  } else {
    if (elements.profileAuthView) elements.profileAuthView.hidden = true;
    if (elements.guestAuthView) elements.guestAuthView.hidden = false;
    setAuthMode("login");
  }

  elements.authModal.hidden = false;
}

function closeAuthModal() {
  if (elements.authModal) {
    elements.authModal.hidden = true;
  }
}

async function syncConversationsFromSupabase() {
  if (!currentUser || !accessToken) {
    conversations = loadConversationsFromLocal();
    const activeList = getActiveConversations();
    activeChatId = activeList.length > 0 ? activeList[0].id : null;
    renderMessages(getActiveChat());
    renderHistory();
    updateArchiveGateUI();
    return;
  }

  try {
    const res = await fetch("/api/conversations", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) return;
    const data = await res.json().catch(() => ({}));
    if (Array.isArray(data.conversations)) {
      const localById = new Map(conversations.map((c) => [c.id, c]));
      conversations = data.conversations.map((c) => ({
        ...c,
        archived: Boolean(localById.get(c.id)?.archived),
      }));
      saveConversationsToLocal();
      const activeList = getActiveConversations();
      if (!activeList.some((c) => c.id === activeChatId)) {
        activeChatId = activeList.length > 0 ? activeList[0].id : null;
      }
      renderMessages(getActiveChat());
      renderHistory();
      updateArchiveGateUI();
    }
  } catch {
    // Keep local conversations if offline
  }
}

async function switchAccountSession(authPayload) {
  currentUser = authPayload?.user || null;
  accessToken = authPayload?.accessToken || "";

  if (currentUser) {
    safeStorageSet("flot-user", JSON.stringify(currentUser));
  } else {
    safeStorageRemove("flot-user");
  }

  if (accessToken) {
    safeStorageSet("flot-access-token", accessToken);
  } else {
    safeStorageRemove("flot-access-token");
  }

  isArchiveUnlocked = false;
  closePlanActivation();
  currentPlan = loadCurrentPlan();
  getHourlyUsageState(currentPlan);
  conversations = loadConversationsFromLocal();
  const activeList = getActiveConversations();
  activeChatId = activeList.length > 0 ? activeList[0].id : null;
  updateAccountUI();
  updateSubscriptionUI();
  renderMessages(getActiveChat());
  renderHistory();
  updateArchiveGateUI();

  if (currentUser && accessToken) {
    await syncConversationsFromSupabase();
  }
}

function formatFileSize(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileExtension(filename = "") {
  const parts = String(filename).toLowerCase().split(".");
  return parts.length > 1 ? parts.pop() : "";
}

function syncSendButtonState() {
  if (!elements.send || !elements.input) return;
  const hasText = Boolean(elements.input.value.trim());
  const hasFile = Boolean(pendingAttachment);
  elements.send.disabled = isSending || (!hasText && !hasFile);
}

function triggerFileDownload({ fileName, dataUrl, base64, mimeType }) {
  const href =
    dataUrl ||
    `data:${mimeType || "application/octet-stream"};base64,${base64 || ""}`;
  if (!href) return;

  const link = document.createElement("a");
  link.href = href;
  link.download = fileName || "flot-export";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

async function requestGeneratedExport({ format, title, content, rows = [] }) {
  const res = await fetch("/api/files/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      format,
      title,
      content,
      rows,
      fileName: title,
      userId: currentUser?.id || null,
      plan: currentPlan,
    }),
  });

  const data = await parseJsonResponse(res, "Failed to export file.");
  triggerFileDownload(data);
  return data;
}

function extractMarkdownTables(rawText = "") {
  const tables = [];
  const lines = String(rawText || "").split(/\r?\n/);
  let currentRows = [];

  const flush = () => {
    if (currentRows.length >= 2) {
      tables.push(currentRows);
    }
    currentRows = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (/^\|.*\|$/.test(trimmed)) {
      const cells = trimmed
        .slice(1, -1)
        .split("|")
        .map((c) => c.trim());
      const isSeparator = cells.every((c) => /^:?-{2,}:?$/.test(c));
      if (!isSeparator) {
        currentRows.push(cells);
      }
    } else {
      flush();
    }
  }
  flush();

  return tables;
}

function renderGeneratedFileCards(bubble, generatedFiles, sourceText = "") {
  const dict = translations[currentLanguage] || translations.en;
  const existingBox = bubble.querySelector(".generated-files-box");
  if (existingBox) existingBox.remove();

  const filesList = Array.isArray(generatedFiles) ? generatedFiles : [];
  const tables = extractMarkdownTables(sourceText);
  const hasTable = tables.length > 0;

  if (filesList.length === 0 && !hasTable) {
    return;
  }

  const box = document.createElement("div");
  box.className = "generated-files-box";

  filesList.forEach((fileObj) => {
    if (!fileObj || !fileObj.fileName) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "file-export-btn";
    btn.textContent = `${dict.downloadFile} (${fileObj.fileName})`;
    btn.addEventListener("click", () => triggerFileDownload(fileObj));
    box.appendChild(btn);
  });

  if (hasTable) {
    const excelBtn = document.createElement("button");
    excelBtn.type = "button";
    excelBtn.className = "file-export-btn secondary";
    excelBtn.textContent = dict.exportExcel;
    excelBtn.addEventListener("click", async () => {
      const prev = excelBtn.textContent;
      excelBtn.disabled = true;
      excelBtn.textContent = dict.exportingFile;
      try {
        await requestGeneratedExport({
          format: "xlsx",
          title: "FLOT Table Export",
          content: sourceText,
          rows: tables[0],
        });
      } catch (err) {
        addMessage("assistant", err?.message || dict.requestError, {
          isError: true,
        });
      } finally {
        excelBtn.disabled = false;
        excelBtn.textContent = prev;
      }
    });
    box.appendChild(excelBtn);
  }

  if (box.childElementCount > 0) {
    bubble.appendChild(box);
  }
}

function renderAttachmentPreview() {
  const dict = translations[currentLanguage] || translations.en;
  const box = elements.attachmentPreview;
  if (!box) return;

  box.innerHTML = "";

  if (!pendingAttachment) {
    box.hidden = true;
    syncSendButtonState();
    return;
  }

  box.hidden = false;

  const chip = document.createElement("div");
  chip.className = "attachment-chip";

  if (pendingAttachment.kind === "image" && pendingAttachment.dataUrl) {
    const thumb = document.createElement("img");
    thumb.className = "attachment-thumb";
    thumb.src = pendingAttachment.dataUrl;
    thumb.alt = pendingAttachment.name;
    chip.appendChild(thumb);
  } else {
    const badge = document.createElement("span");
    badge.className = "attachment-badge";
    badge.textContent = (
      getFileExtension(pendingAttachment.name) || "FILE"
    ).toUpperCase();
    chip.appendChild(badge);
  }

  const meta = document.createElement("div");
  meta.className = "attachment-meta";

  const nameEl = document.createElement("span");
  nameEl.className = "attachment-name";
  nameEl.textContent = pendingAttachment.name;
  nameEl.title = pendingAttachment.name;

  const sizeText = formatFileSize(pendingAttachment.size);
  meta.appendChild(nameEl);

  if (sizeText) {
    const sizeEl = document.createElement("span");
    sizeEl.className = "attachment-size";
    sizeEl.textContent = sizeText;
    meta.appendChild(sizeEl);
  }

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "remove-attachment-btn";
  removeBtn.title = dict.removeAttachment;
  removeBtn.setAttribute("aria-label", dict.removeAttachment);
  removeBtn.textContent = "×";
  removeBtn.addEventListener("click", () => {
    pendingAttachment = null;
    if (elements.fileInput) elements.fileInput.value = "";
    renderAttachmentPreview();
  });

  chip.append(meta, removeBtn);
  box.appendChild(chip);
  syncSendButtonState();
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () =>
      reject(reader.error || new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

function compressImageDataUrl(rawDataUrl, maxSide = 1280, quality = 0.82) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      if (width > maxSide || height > maxSide) {
        if (width >= height) {
          height = Math.round((height * maxSide) / width);
          width = maxSide;
        } else {
          width = Math.round((width * maxSide) / height);
          height = maxSide;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve({ dataUrl: rawDataUrl, mimeType: "image/jpeg" });
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      const compressed = canvas.toDataURL("image/jpeg", quality);
      resolve({ dataUrl: compressed, mimeType: "image/jpeg" });
    };
    img.onerror = () =>
      resolve({ dataUrl: rawDataUrl, mimeType: "image/jpeg" });
    img.src = rawDataUrl;
  });
}

function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () =>
      reject(reader.error || new Error("Failed to read text file"));
    reader.readAsText(file);
  });
}

async function handleFileSelection(file) {
  const dict = translations[currentLanguage] || translations.en;
  if (!file) return;

  if (file.size > MAX_FILE_SIZE) {
    addMessage("assistant", dict.fileTooLarge, { isError: true });
    if (elements.fileInput) elements.fileInput.value = "";
    return;
  }

  const ext = getFileExtension(file.name);
  const isImage = file.type.startsWith("image/");
  const isText = file.type.startsWith("text/") || TEXT_EXTENSIONS.has(ext);

  if (!isImage && !isText) {
    addMessage("assistant", dict.unsupportedFile, { isError: true });
    if (elements.fileInput) elements.fileInput.value = "";
    return;
  }

  try {
    if (isImage) {
      const rawDataUrl = await readFileAsDataUrl(file);
      const { dataUrl, mimeType } = await compressImageDataUrl(rawDataUrl);
      const base64Data = dataUrl.includes(",") ? dataUrl.split(",")[1] : "";
      pendingAttachment = {
        kind: "image",
        name: file.name,
        size: file.size,
        mimeType,
        dataUrl,
        base64Data,
      };
    } else {
      const textContent = await readFileAsText(file);
      pendingAttachment = {
        kind: "file",
        name: file.name,
        size: file.size,
        mimeType: file.type || "text/plain",
        textContent: textContent.slice(0, 12000),
      };
    }

    renderAttachmentPreview();
    elements.input?.focus();
  } catch {
    addMessage("assistant", dict.requestError, { isError: true });
  }
}

function cleanMathNotation(rawText) {
  return String(rawText || "")
    .replace(/\$\$([\s\S]*?)\$\$/g, (_, expr) => `\n${expr.trim()}\n`)
    .replace(/\$([^$\n]+)\$/g, (_, expr) => expr.trim())
    .replace(/\\text\{([^}]*)\}/g, "$1")
    .replace(/\\frac\{([^}]*)\}\{([^}]*)\}/g, "($1 / $2)")
    .replace(/\\times/g, "×")
    .replace(/\\div/g, "÷")
    .replace(/\\pm/g, "±")
    .replace(/\\neq/g, "≠")
    .replace(/\\leq/g, "≤")
    .replace(/\\geq/g, "≥")
    .replace(/\\sqrt\{([^}]*)\}/g, "√($1)")
    .replace(/\\[a-zA-Z]+/g, "");
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatInlineMarkdown(text) {
  let out = escapeHtml(text);
  out = out.replace(/`([^`\n]+)`/g, '<code class="inline-code">$1</code>');
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/\*([^*\n]+)\*/g, "<em>$1</em>");
  return out;
}

function renderFormattedContent(container, rawText) {
  container.innerHTML = "";
  const dict = translations[currentLanguage] || translations.en;
  const text = cleanMathNotation(rawText);
  const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;

  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const beforeText = text.slice(lastIndex, match.index);
      appendTextSegment(container, beforeText);
    }

    const lang = (match[1] || "code").trim();
    const codeContent = match[2].replace(/\n$/, "");

    const block = document.createElement("div");
    block.className = "code-block";

    const header = document.createElement("div");
    header.className = "code-header";

    const langLabel = document.createElement("span");
    langLabel.className = "code-lang";
    langLabel.textContent = lang;

    const copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.className = "copy-code-btn";
    copyBtn.textContent = dict.copy;
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(codeContent);
        copyBtn.textContent = dict.copied;
        setTimeout(() => {
          copyBtn.textContent = (
            translations[currentLanguage] || translations.en
          ).copy;
        }, 1500);
      } catch {
        // Fallback ignored
      }
    });

    const pre = document.createElement("pre");
    const codeEl = document.createElement("code");
    codeEl.textContent = codeContent;
    pre.appendChild(codeEl);

    header.append(langLabel, copyBtn);
    block.append(header, pre);
    container.appendChild(block);

    lastIndex = codeBlockRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    appendTextSegment(container, text.slice(lastIndex));
  }
}

function appendTextSegment(container, segment) {
  const lines = segment.split("\n");
  const frag = document.createDocumentFragment();
  let listEl = null;

  const flushList = () => {
    if (listEl) {
      frag.appendChild(listEl);
      listEl = null;
    }
  };

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (/^###\s+/.test(trimmed)) {
      flushList();
      const h = document.createElement("h4");
      h.className = "md-heading";
      h.innerHTML = formatInlineMarkdown(trimmed.replace(/^###\s+/, ""));
      frag.appendChild(h);
      return;
    }

    if (/^##\s+/.test(trimmed)) {
      flushList();
      const h = document.createElement("h3");
      h.className = "md-heading";
      h.innerHTML = formatInlineMarkdown(trimmed.replace(/^##\s+/, ""));
      frag.appendChild(h);
      return;
    }

    if (/^#\s+/.test(trimmed)) {
      flushList();
      const h = document.createElement("h2");
      h.className = "md-heading";
      h.innerHTML = formatInlineMarkdown(trimmed.replace(/^#\s+/, ""));
      frag.appendChild(h);
      return;
    }

    if (/^[-*•]\s+/.test(trimmed)) {
      if (!listEl) {
        listEl = document.createElement("ul");
        listEl.className = "md-list";
      }
      const li = document.createElement("li");
      li.innerHTML = formatInlineMarkdown(trimmed.replace(/^[-*•]\s+/, ""));
      listEl.appendChild(li);
      return;
    }

    flushList();
    const p = document.createElement("p");
    p.className = "md-line";
    p.innerHTML = trimmed ? formatInlineMarkdown(line) : "<br>";
    frag.appendChild(p);
  });

  flushList();
  container.appendChild(frag);
}

function translatePage() {
  const dictionary = translations[currentLanguage] || translations.en;
  const isRtl = currentLanguage === "ar";

  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = isRtl ? "rtl" : "ltr";
  document.body.dir = isRtl ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) {
      element.textContent = dictionary[key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    if (dictionary[key]) {
      element.placeholder = dictionary[key];
    }
  });

  if (elements.languageSelect) {
    elements.languageSelect.value = currentLanguage;
  }

  if (elements.attachBtn) {
    elements.attachBtn.title = dictionary.attachFile;
    elements.attachBtn.setAttribute("aria-label", dictionary.attachFile);
  }

  document.querySelectorAll(".retry-btn").forEach((btn) => {
    btn.textContent = dictionary.retry;
  });

  document.querySelectorAll(".copy-code-btn").forEach((btn) => {
    btn.textContent = dictionary.copy;
  });

  document.querySelectorAll(".archive-chat-btn").forEach((btn) => {
    btn.title = dictionary.archiveChat;
    btn.setAttribute("aria-label", dictionary.archiveChat);
  });

  document.querySelectorAll(".delete-chat-btn").forEach((btn) => {
    btn.title = dictionary.deleteChat;
    btn.setAttribute("aria-label", dictionary.deleteChat);
  });

  if (elements.languageLabel) {
    elements.languageLabel.textContent = dictionary.language;
  }

  syncAuthFormViews();
  updateAccountUI();
  updateSubscriptionUI();
  renderHistory();
  updateArchiveGateUI();
  renderAttachmentPreview();
}

function setTheme(theme) {
  currentTheme = theme === "light" ? "light" : "dark";
  document.body.classList.toggle("light-theme", currentTheme === "light");
  safeStorageSet("flot-theme", currentTheme);

  elements.darkModeBtn?.classList.toggle("active", currentTheme === "dark");
  elements.lightModeBtn?.classList.toggle("active", currentTheme === "light");
}

function saveConversationsToLocal() {
  try {
    const compact = conversations.map((chat) => ({
      ...chat,
      archived: Boolean(chat.archived),
      messages: (chat.messages || []).map((msg) => ({
        role: msg.role,
        content: msg.content,
        generatedFiles: Array.isArray(msg.generatedFiles)
          ? msg.generatedFiles
          : [],
        attachment: msg.attachment
          ? {
              kind: msg.attachment.kind,
              name: msg.attachment.name,
              size: msg.attachment.size,
              mimeType: msg.attachment.mimeType,
              ...(msg.attachment.kind === "image" && msg.attachment.dataUrl
                ? { dataUrl: msg.attachment.dataUrl }
                : {}),
            }
          : null,
      })),
    }));
    safeStorageSet(getHistoryStorageKey(), JSON.stringify(compact));
  } catch {
    // Ignore quota limits if images are large
  }
}

async function ensureRemoteConversation(title) {
  if (!currentUser || !accessToken) return null;
  try {
    const res = await fetch("/api/conversations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ title }),
    });
    if (!res.ok) return null;
    const data = await res.json().catch(() => ({}));
    return data.conversation?.id || null;
  } catch {
    return null;
  }
}

async function persistMessageToSupabase(chatId, msg, titleIfUpdated = "") {
  if (!currentUser || !accessToken || !chatId) return;
  try {
    await fetch(`/api/conversations/${encodeURIComponent(chatId)}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        role: msg.role,
        content: msg.content || "",
        attachment: msg.attachment || null,
        title: titleIfUpdated || undefined,
      }),
    });
  } catch {
    // Keep local copy safe
  }
}

function closeSidebar() {
  elements.sidebar?.classList.remove("open");
  elements.overlay?.classList.remove("show");
}

function openSidebar() {
  elements.sidebar?.classList.add("open");
  elements.overlay?.classList.add("show");
}

function startNewChat() {
  activeChatId = null;
  lastFailedPayload = null;
  isSending = false;
  pendingAttachment = null;
  if (elements.fileInput) elements.fileInput.value = "";
  renderAttachmentPreview();

  elements.messages.innerHTML = "";
  elements.welcome.style.display = "flex";

  elements.input.value = "";
  elements.input.style.height = "auto";
  syncSendButtonState();
  elements.input.focus();

  closeSidebar();
  renderHistory();
}

function setConversationArchived(chatId, archived) {
  const target = conversations.find((chat) => chat.id === chatId);
  if (!target) return;

  target.archived = Boolean(archived);
  saveConversationsToLocal();

  if (target.archived && activeChatId === chatId) {
    const nextActive = getActiveConversations()[0] || null;
    if (nextActive) {
      activeChatId = nextActive.id;
      renderMessages(nextActive);
    } else {
      activeChatId = null;
      elements.messages.innerHTML = "";
      elements.welcome.style.display = "flex";
    }
  } else if (!target.archived && !activeChatId) {
    activeChatId = target.id;
    renderMessages(target);
  }

  renderHistory();
  updateArchiveGateUI();
}

async function deleteConversation(chatId) {
  const index = conversations.findIndex((chat) => chat.id === chatId);
  if (index === -1) return;

  conversations.splice(index, 1);
  saveConversationsToLocal();

  if (currentUser && accessToken) {
    fetch(`/api/conversations/${encodeURIComponent(chatId)}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    }).catch(() => {});
  }

  if (activeChatId === chatId) {
    const remainingActive = getActiveConversations();
    if (remainingActive.length > 0) {
      activeChatId = remainingActive[0].id;
      renderMessages(remainingActive[0]);
    } else {
      startNewChat();
      updateArchiveGateUI();
      return;
    }
  }

  renderHistory();
  updateArchiveGateUI();
}

function createChat(initialTitle = "") {
  const chat = {
    id: Date.now().toString(),
    title: initialTitle,
    archived: false,
    messages: [],
    createdAt: new Date().toISOString(),
  };

  conversations.unshift(chat);
  activeChatId = chat.id;
  saveConversationsToLocal();

  return chat;
}

function getActiveChat() {
  return (
    conversations.find((chat) => chat.id === activeChatId && !chat.archived) ||
    null
  );
}

function clearRetryMessages() {
  elements.messages?.querySelectorAll(".message.error-message").forEach((el) => {
    el.remove();
  });
}

function createMessageAttachmentNode(attachment) {
  if (!attachment || !attachment.name) return null;

  const box = document.createElement("div");
  box.className = "msg-attachment";

  if (attachment.kind === "image" && attachment.dataUrl) {
    const img = document.createElement("img");
    img.src = attachment.dataUrl;
    img.alt = attachment.name;
    img.className = "msg-attachment-img";
    box.appendChild(img);
  }

  const label = document.createElement("span");
  label.className = "msg-attachment-name";
  label.textContent = attachment.name;
  box.appendChild(label);

  return box;
}

function createStreamingAssistantMessage() {
  const dict = translations[currentLanguage] || translations.en;
  const message = document.createElement("div");
  message.className = "message assistant streaming";

  const avatar = document.createElement("div");
  avatar.className = "message-avatar";
  avatar.textContent = "F";

  const bubble = document.createElement("div");
  bubble.className = "message-content";

  const name = document.createElement("span");
  name.className = "message-name";
  name.textContent = dict.assistant;

  const body = document.createElement("div");
  body.className = "message-body";
  body.textContent = dict.thinking;

  bubble.append(name, body);
  message.append(avatar, bubble);
  elements.messages.appendChild(message);
  elements.welcome.style.display = "none";
  elements.chatArea.scrollTop = elements.chatArea.scrollHeight;

  return { message, bubble, body };
}

function addMessage(role, content, options = {}) {
  const {
    isError = false,
    retryPayload = null,
    attachment = null,
    generatedFiles = [],
  } = options;
  const dict = translations[currentLanguage] || translations.en;

  const message = document.createElement("div");
  message.className = `message ${role}${isError ? " error-message" : ""}`;

  const avatar = document.createElement("div");
  avatar.className = "message-avatar";
  avatar.textContent = role === "user" ? getUserInitial() : "F";

  const bubble = document.createElement("div");
  bubble.className = `message-content${isError ? " error-card" : ""}`;

  if (role === "assistant") {
    const name = document.createElement("span");
    name.className = "message-name";
    name.textContent = isError ? `${dict.assistant} • !` : dict.assistant;
    bubble.appendChild(name);
  }

  if (attachment) {
    const attNode = createMessageAttachmentNode(attachment);
    if (attNode) bubble.appendChild(attNode);
  }

  if (content) {
    const body = document.createElement("div");
    body.className = "message-body";

    if (role === "assistant") {
      renderFormattedContent(body, content);
    } else {
      body.textContent = content;
    }

    bubble.appendChild(body);
  }

  if (role === "assistant" && !isError && content) {
    renderGeneratedFileCards(bubble, generatedFiles, content);
  }

  if (isError && retryPayload) {
    const retryBtn = document.createElement("button");
    retryBtn.type = "button";
    retryBtn.className = "retry-btn";
    retryBtn.textContent = dict.retry;
    retryBtn.addEventListener("click", () => {
      if (isSending) return;
      message.remove();
      sendMessage(retryPayload.message, {
        isRetry: true,
        attachmentOverride: retryPayload.attachment || null,
      });
    });
    bubble.appendChild(retryBtn);
  }

  message.append(avatar, bubble);
  elements.messages.appendChild(message);

  elements.welcome.style.display = "none";
  elements.chatArea.scrollTop = elements.chatArea.scrollHeight;
}

function renderMessages(chat) {
  elements.messages.innerHTML = "";

  if (!chat || !Array.isArray(chat.messages) || chat.messages.length === 0) {
    elements.welcome.style.display = "flex";
    return;
  }

  elements.welcome.style.display = "none";

  chat.messages.forEach((msg) => {
    if (msg && msg.role) {
      addMessage(msg.role, msg.content || "", {
        attachment: msg.attachment || null,
        generatedFiles: msg.generatedFiles || [],
      });
    }
  });
}

function renderHistory() {
  if (!elements.history) return;
  const dict = translations[currentLanguage] || translations.en;
  const visibleChats = getActiveConversations();
  elements.history.innerHTML = "";

  if (visibleChats.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-history";
    empty.textContent = dict.emptyHistory;
    elements.history.appendChild(empty);
    return;
  }

  visibleChats.forEach((chat) => {
    const row = document.createElement("div");
    row.className = "history-row";
    if (chat.id === activeChatId) {
      row.classList.add("active");
    }

    const button = document.createElement("button");
    const title =
      chat.title ||
      (currentLanguage === "ar" ? "محادثة جديدة" : "New conversation");

    button.type = "button";
    button.className = "history-item";
    button.textContent = title;
    button.title = title;

    button.addEventListener("click", () => {
      activeChatId = chat.id;
      renderMessages(chat);
      renderHistory();
      closeSidebar();
    });

    const actions = document.createElement("div");
    actions.className = "history-actions";

    const archiveBtn = document.createElement("button");
    archiveBtn.type = "button";
    archiveBtn.className = "archive-chat-btn";
    archiveBtn.title = dict.archiveChat;
    archiveBtn.setAttribute("aria-label", dict.archiveChat);
    archiveBtn.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 8v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8M1 3h22v5H1zM10 12h4"/>
      </svg>
    `;
    archiveBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      setConversationArchived(chat.id, true);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-chat-btn";
    deleteBtn.title = dict.deleteChat;
    deleteBtn.setAttribute("aria-label", dict.deleteChat);
    deleteBtn.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6"/>
      </svg>
    `;

    deleteBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteConversation(chat.id);
    });

    actions.append(archiveBtn, deleteBtn);
    row.append(button, actions);
    elements.history.appendChild(row);
  });
}

function renderArchiveList() {
  if (!elements.archiveList || !isArchiveUnlocked) return;
  const dict = translations[currentLanguage] || translations.en;
  const archivedChats = getArchivedConversations();

  elements.archiveList.innerHTML = "";

  if (archivedChats.length === 0) {
    const empty = document.createElement("div");
    empty.className = "archive-empty";
    empty.textContent = dict.emptyArchive;
    elements.archiveList.appendChild(empty);
    return;
  }

  archivedChats.forEach((chat) => {
    const item = document.createElement("div");
    item.className = "archive-item";

    const titleEl = document.createElement("span");
    titleEl.className = "archive-item-title";
    titleEl.textContent =
      chat.title ||
      (currentLanguage === "ar" ? "محادثة جديدة" : "New conversation");
    titleEl.title = titleEl.textContent;

    const btns = document.createElement("div");
    btns.className = "archive-item-actions";

    const restoreBtn = document.createElement("button");
    restoreBtn.type = "button";
    restoreBtn.className = "archive-mini-btn";
    restoreBtn.textContent = dict.restoreChat;
    restoreBtn.addEventListener("click", () => {
      setConversationArchived(chat.id, false);
    });

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "archive-mini-btn del";
    delBtn.textContent = "×";
    delBtn.title = dict.deleteChat;
    delBtn.addEventListener("click", () => {
      deleteConversation(chat.id);
    });

    btns.append(restoreBtn, delBtn);
    item.append(titleEl, btns);
    elements.archiveList.appendChild(item);
  });
}

async function sendMessage(content, options = {}) {
  const { isRetry = false, attachmentOverride = null } = options;
  const cleanContent = typeof content === "string" ? content.trim() : "";
  const activeAttachment = isRetry ? attachmentOverride : pendingAttachment;

  if (!cleanContent && !activeAttachment) return;

  if (isSending) {
    return;
  }

  const dict = translations[currentLanguage] || translations.en;
  const quotaCheck = evaluateHourlyQuota(Boolean(activeAttachment));
  if (!quotaCheck.ok) {
    addMessage("assistant", quotaCheck.reason, { isError: true });
    return;
  }

  isSending = true;
  syncSendButtonState();
  clearRetryMessages();

  const generatedTitle = (
    cleanContent ||
    activeAttachment?.name ||
    (currentLanguage === "ar" ? "محادثة جديدة" : "New chat")
  ).slice(0, 35);
  let chat = getActiveChat();
  const isBrandNewChat = !chat;

  if (!chat) {
    chat = createChat(generatedTitle);
  }

  const previousHistory = chat.messages.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));

  const effectivePrompt =
    cleanContent ||
    (activeAttachment?.kind === "image"
      ? currentLanguage === "ar"
        ? "اشرح محتوى هذه الصورة."
        : "Describe what is in this image."
      : currentLanguage === "ar"
        ? `حلل محتوى الملف ${activeAttachment?.name || ""}`
        : `Analyze the file ${activeAttachment?.name || ""}`);

  let updatedTitle = "";
  if (!isRetry) {
    if (!chat.title) {
      chat.title = generatedTitle;
      updatedTitle = generatedTitle;
    }

    const userMsgObj = {
      role: "user",
      content: cleanContent,
      attachment: activeAttachment || null,
    };
    chat.messages.push(userMsgObj);

    addMessage("user", cleanContent, { attachment: activeAttachment || null });
    saveConversationsToLocal();
    renderHistory();

    if (currentUser && accessToken) {
      if (isBrandNewChat) {
        const remoteId = await ensureRemoteConversation(chat.title);
        if (remoteId) {
          chat.id = remoteId;
          activeChatId = remoteId;
          saveConversationsToLocal();
        }
      }
      await persistMessageToSupabase(chat.id, userMsgObj, updatedTitle);
    }

    pendingAttachment = null;
    if (elements.fileInput) elements.fileInput.value = "";
    renderAttachmentPreview();
  }

  const updatedUsage = recordHourlyQuota(
    quotaCheck.state,
    Boolean(activeAttachment)
  );

  lastFailedPayload = {
    message: effectivePrompt,
    attachment: activeAttachment || null,
  };

  elements.input.value = "";
  elements.input.style.height = "auto";

  const streamView = createStreamingAssistantMessage();

  try {
    const res = await fetch("/api/chat/stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: effectivePrompt,
        history: previousHistory,
        attachment: activeAttachment || null,
        userId: currentUser?.id || null,
        plan: currentPlan,
        usage: updatedUsage,
      }),
    });

    if (!res.ok || !res.body) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || dict.requestError);
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";
    let streamedText = "";
    let streamedFiles = [];
    let startedTyping = false;

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const frames = buffer.split("\n\n");
      buffer = frames.pop() || "";

      for (const frame of frames) {
        const line = frame.split("\n").find((l) => l.startsWith("data: "));
        if (!line) continue;

        const payload = JSON.parse(line.slice(6));
        if (payload.error) {
          throw new Error(payload.error);
        }

        if (payload.delta) {
          if (!startedTyping) {
            streamedText = "";
            startedTyping = true;
          }
          streamedText += payload.delta;
          streamView.body.textContent = streamedText;
          elements.chatArea.scrollTop = elements.chatArea.scrollHeight;
        }

        if (payload.done) {
          if (typeof payload.reply === "string") {
            streamedText = payload.reply;
          }
          if (Array.isArray(payload.generatedFiles)) {
            streamedFiles = payload.generatedFiles;
          }
        }
      }
    }

    streamView.message.remove();

    const finalReply = streamedText.trim() || dict.requestError;
    lastFailedPayload = null;

    const assistantMsgObj = {
      role: "assistant",
      content: finalReply,
      generatedFiles: streamedFiles,
    };

    chat.messages.push(assistantMsgObj);

    addMessage("assistant", finalReply, { generatedFiles: streamedFiles });
    saveConversationsToLocal();
    renderHistory();

    if (currentUser && accessToken) {
      await persistMessageToSupabase(chat.id, assistantMsgObj);
    }
  } catch (err) {
    streamView.message.remove();
    const errorMsg = err?.message || dict.networkError;
    addMessage("assistant", errorMsg, {
      isError: true,
      retryPayload: lastFailedPayload,
    });
  } finally {
    isSending = false;
    syncSendButtonState();
  }
}

async function parseJsonResponse(res, fallbackMsg) {
  const rawText = await res.text();
  let data = {};
  try {
    data = rawText ? JSON.parse(rawText) : {};
  } catch {
    throw new Error(fallbackMsg || `HTTP ${res.status}`);
  }
  if (!res.ok) {
    throw new Error(data.error || `HTTP ${res.status}`);
  }
  return data;
}

elements.openArchiveBtn?.addEventListener("click", (event) => {
  event.stopPropagation();
  showArchivePasswordForm();
});

elements.archivePassCancelBtn?.addEventListener("click", (event) => {
  event.stopPropagation();
  lockArchive();
});

elements.lockArchiveBtn?.addEventListener("click", (event) => {
  event.stopPropagation();
  lockArchive();
});

elements.archivePassForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  event.stopPropagation();
  const dict = translations[currentLanguage] || translations.en;

  if (elements.archivePassError) elements.archivePassError.hidden = true;

  const pass = elements.archivePassInput?.value || "";
  const confirmPass = elements.archivePassConfirmInput?.value || "";

  if (archivePassMode === "setup") {
    if (pass.length < 4) {
      if (elements.archivePassError) {
        elements.archivePassError.textContent = dict.passTooShort;
        elements.archivePassError.hidden = false;
      }
      return;
    }
    if (pass !== confirmPass) {
      if (elements.archivePassError) {
        elements.archivePassError.textContent = dict.passMismatch;
        elements.archivePassError.hidden = false;
      }
      return;
    }

    const hashed = await hashSecret(pass);
    safeStorageSet(getArchivePassStorageKey(), hashed);
    isArchiveUnlocked = true;
    updateArchiveGateUI();
    return;
  }

  const savedHash = safeStorageGet(getArchivePassStorageKey(), "");
  const enteredHash = await hashSecret(pass);
  if (enteredHash !== savedHash) {
    if (elements.archivePassError) {
      elements.archivePassError.textContent = dict.wrongArchivePass;
      elements.archivePassError.hidden = false;
    }
    return;
  }

  isArchiveUnlocked = true;
  updateArchiveGateUI();
});

elements.plansGrid?.addEventListener("click", (event) => {
  const card = event.target.closest(".plan-card");
  if (!card) return;
  const chosenPlan = card.dataset.plan;

  if (chosenPlan === "free") {
    closePlanActivation();
    setUserPlan("free");
    return;
  }

  if (chosenPlan === "pro" || chosenPlan === "ultra") {
    openPlanActivation(chosenPlan);
  }
});

elements.cancelActivationBtn?.addEventListener("click", (event) => {
  event.stopPropagation();
  closePlanActivation();
});

elements.activationCodeInput?.addEventListener("input", () => {
  const cleaned = elements.activationCodeInput.value
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase()
    .slice(0, 12);
  elements.activationCodeInput.value = cleaned;

  if (elements.codeCounter) {
    elements.codeCounter.textContent = `${cleaned.length} / 12`;
  }
  if (elements.activationError) elements.activationError.hidden = true;
});

elements.activationForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  event.stopPropagation();
  const dict = translations[currentLanguage] || translations.en;

  if (elements.activationError) elements.activationError.hidden = true;
  if (elements.activationSuccess) elements.activationSuccess.hidden = true;

  const code = (elements.activationCodeInput?.value || "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase();

  if (!/^[A-Z0-9]{12}$/.test(code) || !pendingTargetPlan) {
    if (elements.activationError) {
      elements.activationError.textContent = dict.invalidCodeError;
      elements.activationError.hidden = false;
    }
    return;
  }

  try {
    if (elements.activatePlanBtn) elements.activatePlanBtn.disabled = true;

    const res = await fetch("/api/subscription/activate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      body: JSON.stringify({
        code,
        targetPlan: pendingTargetPlan,
      }),
    });

    const data = await parseJsonResponse(res, dict.requestError);
    const activatedPlan = normalizePlan(data.plan || pendingTargetPlan);

    setUserPlan(activatedPlan, code);

    if (elements.activationSuccess) {
      elements.activationSuccess.textContent = `${dict.planActivatedSuccess} (${getPlanDisplayName(activatedPlan)})`;
      elements.activationSuccess.hidden = false;
    }

    setTimeout(() => {
      closePlanActivation();
    }, 1100);
  } catch (err) {
    if (elements.activationError) {
      elements.activationError.textContent = err?.message || dict.requestError;
      elements.activationError.hidden = false;
    }
  } finally {
    if (elements.activatePlanBtn) elements.activatePlanBtn.disabled = false;
  }
});

elements.accountBtn?.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleAccountPopover();
});

elements.openAuthModalBtn?.addEventListener("click", (event) => {
  event.stopPropagation();
  openAuthModal();
});

document.addEventListener("click", (event) => {
  if (!elements.accountPopover || elements.accountPopover.hidden) return;
  const insidePopover = elements.accountPopover.contains(event.target);
  const insideAccountBtn = elements.accountBtn?.contains(event.target);
  if (!insidePopover && !insideAccountBtn) {
    toggleAccountPopover(false);
  }
});

elements.closeAuthModal?.addEventListener("click", closeAuthModal);

elements.authModal?.addEventListener("click", (event) => {
  if (event.target === elements.authModal) {
    closeAuthModal();
  }
});

elements.tabLogin?.addEventListener("click", () => setAuthMode("login"));
elements.tabRegister?.addEventListener("click", () => setAuthMode("register"));

elements.authForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const dict = translations[currentLanguage] || translations.en;
  if (elements.authError) elements.authError.hidden = true;

  const name = elements.authName?.value?.trim() || "";
  const email = elements.authEmail?.value?.trim().toLowerCase() || "";
  const password = elements.authPassword?.value || "";

  try {
    if (elements.authSubmitBtn) elements.authSubmitBtn.disabled = true;

    const endpoint =
      authMode === "register" ? "/api/auth/register" : "/api/auth/login";
    const payload =
      authMode === "register" ? { name, email, password } : { email, password };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await parseJsonResponse(res, dict.requestError);
    if (!data.user) {
      throw new Error(data.error || dict.requestError);
    }

    await switchAccountSession(data);
    elements.authForm.reset();
    closeAuthModal();
  } catch (err) {
    if (elements.authError) {
      elements.authError.textContent = err?.message || dict.requestError;
      elements.authError.hidden = false;
    }
  } finally {
    if (elements.authSubmitBtn) elements.authSubmitBtn.disabled = false;
  }
});

elements.profileForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!currentUser) return;
  const dict = translations[currentLanguage] || translations.en;

  if (elements.profileError) elements.profileError.hidden = true;
  if (elements.profileSuccess) elements.profileSuccess.hidden = true;

  const updatedName = elements.profileNameInput?.value?.trim() || "";

  try {
    const res = await fetch("/api/auth/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      body: JSON.stringify({
        userId: currentUser.id,
        name: updatedName,
      }),
    });

    const data = await parseJsonResponse(res, dict.requestError);
    if (!data.user) {
      throw new Error(data.error || dict.requestError);
    }

    currentUser = data.user;
    safeStorageSet("flot-user", JSON.stringify(currentUser));
    updateAccountUI();
    renderMessages(getActiveChat());

    if (elements.profileSuccess) {
      elements.profileSuccess.textContent = dict.profileSaved;
      elements.profileSuccess.hidden = false;
    }
  } catch (err) {
    if (elements.profileError) {
      elements.profileError.textContent = err?.message || dict.requestError;
      elements.profileError.hidden = false;
    }
  }
});

async function handleSignOut() {
  await switchAccountSession(null);
  toggleAccountPopover(false);
  closeAuthModal();
}

elements.logoutBtn?.addEventListener("click", handleSignOut);
elements.popoverLogoutBtn?.addEventListener("click", handleSignOut);

function applyLanguage(lang) {
  currentLanguage = translations[lang] ? lang : "en";
  safeStorageSet("flot-language", currentLanguage);
  translatePage();
  renderMessages(getActiveChat());
}

elements.languageSelect?.addEventListener("change", (event) => {
  applyLanguage(event.target.value);
});

elements.attachBtn?.addEventListener("click", () => {
  if (isSending) return;
  elements.fileInput?.click();
});

elements.fileInput?.addEventListener("change", (event) => {
  const file = event.target?.files?.[0];
  if (file) {
    handleFileSelection(file);
  }
});

elements.form?.addEventListener("submit", (event) => {
  event.preventDefault();
  sendMessage(elements.input.value);
});

elements.input?.addEventListener("input", () => {
  syncSendButtonState();
  elements.input.style.height = "auto";
  elements.input.style.height =
    Math.min(elements.input.scrollHeight, 180) + "px";
});

elements.input?.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    elements.form?.requestSubmit();
  }
});

elements.newChat?.addEventListener("click", startNewChat);

elements.languageBtn?.addEventListener("click", () => {
  applyLanguage(currentLanguage === "en" ? "ar" : "en");
});

elements.themeBtn?.addEventListener("click", () => {
  setTheme(currentTheme === "dark" ? "light" : "dark");
});

elements.darkModeBtn?.addEventListener("click", () => setTheme("dark"));
elements.lightModeBtn?.addEventListener("click", () => setTheme("light"));

elements.menuBtn?.addEventListener("click", openSidebar);
elements.closeSidebar?.addEventListener("click", closeSidebar);
elements.overlay?.addEventListener("click", closeSidebar);

document.querySelectorAll(".suggestion-card").forEach((button) => {
  button.addEventListener("click", () => {
    sendMessage(button.dataset.prompt);
  });
});

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    startNewChat();
  }

  if (event.key === "Escape") {
    toggleAccountPopover(false);
    closeAuthModal();
    closeSidebar();
  }
});

translatePage();
setTheme(currentTheme);
getHourlyUsageState(currentPlan);
updateSubscriptionUI();
renderMessages(getActiveChat());
renderHistory();
updateArchiveGateUI();
renderAttachmentPreview();
syncSendButtonState();

if (currentUser && accessToken) {
  syncConversationsFromSupabase();
}