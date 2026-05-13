/* ==========================================================================
   Taleb AI — Core JavaScript
   Shared module: i18n, theme, auth, navbar, toasts, utilities
   ========================================================================== */

/* ---------- Translations ---------- */
const I18N = {
  en: {
    nav: {
      home: "Home", ai: "AI Assistant", exercises: "Exercises",
      community: "Community", library: "Library", dashboard: "Dashboard",
      login: "Login", register: "Sign Up", logout: "Logout", admin: "Admin"
    },
    hero: {
      badge: "Built for Algerian students",
      title1: "Learn smarter with",
      title2: "Taleb AI",
      lead: "Your futuristic AI companion for BAC, BEM, and university. Interactive lessons, live tutoring, and a vibrant community — all in one place.",
      cta1: "Start learning free",
      cta2: "Meet the AI tutor",
      stat1: "Active students",
      stat2: "Lessons & PDFs",
      stat3: "Exercises solved",
      stat4: "Avg. rating"
    },
    home: {
      featuredTitle: "Featured lessons",
      featuredSub: "Hand-picked courses from top Algerian teachers",
      statsTitle: "Numbers that inspire us",
      statsSub: "Trusted by students across 58 wilayas",
      testiTitle: "Students love Taleb AI",
      testiSub: "Real feedback from real learners",
      ctaTitle: "Ready to ace your exams?",
      ctaSub: "Join thousands of Algerian students already learning smarter.",
      ctaBtn: "Create free account"
    },
    lessons: {
      math: "Mathematics", phys: "Physics", philo: "Philosophy",
      arab: "Arabic Literature", sci: "Natural Sciences", hist: "History & Geo",
      by: "By", min: "min"
    },
    footer: {
      about: "About Taleb AI",
      aboutTxt: "A futuristic AI-powered educational platform designed for Algerian students.",
      explore: "Explore", learn: "Learn", connect: "Connect",
      ai: "AI Assistant", ex: "Exercises", lib: "PDF Library", com: "Community",
      docs: "Documentation", help: "Help Center", blog: "Blog",
      contact: "Contact", terms: "Terms", privacy: "Privacy",
      rights: "All rights reserved.",
      madeIn: "Made with ♥ in Algeria"
    },
    auth: {
      loginTitle: "Welcome back",
      loginSub: "Sign in to continue your journey",
      registerTitle: "Create account",
      registerSub: "Join the Taleb AI community today",
      email: "Email address",
      password: "Password",
      name: "Full name",
      level: "Study level",
      loginBtn: "Sign in",
      registerBtn: "Create account",
      noAccount: "Don't have an account?",
      hasAccount: "Already have an account?",
      signup: "Sign up",
      signin: "Sign in"
    },
    common: {
      search: "Search lessons, topics, teachers…",
      save: "Save", delete: "Delete", cancel: "Cancel",
      download: "Download", view: "View", edit: "Edit",
      loginRequired: "Please sign in to continue"
    }
  },
  fr: {
    nav: {
      home: "Accueil", ai: "Assistant IA", exercises: "Exercices",
      community: "Communauté", library: "Bibliothèque", dashboard: "Tableau de bord",
      login: "Connexion", register: "Inscription", logout: "Déconnexion", admin: "Admin"
    },
    hero: {
      badge: "Conçu pour les étudiants algériens",
      title1: "Apprenez mieux avec",
      title2: "Taleb IA",
      lead: "Votre compagnon IA futuriste pour le BAC, le BEM et l'université. Cours interactifs, tutorat en direct et communauté dynamique — le tout en un seul endroit.",
      cta1: "Commencer gratuitement",
      cta2: "Découvrir le tuteur IA",
      stat1: "Étudiants actifs",
      stat2: "Cours & PDF",
      stat3: "Exercices résolus",
      stat4: "Note moyenne"
    },
    home: {
      featuredTitle: "Cours vedettes",
      featuredSub: "Cours sélectionnés des meilleurs enseignants algériens",
      statsTitle: "Des chiffres qui nous inspirent",
      statsSub: "Adopté par les étudiants dans 58 wilayas",
      testiTitle: "Les étudiants adorent Taleb IA",
      testiSub: "Retours authentiques d'apprenants",
      ctaTitle: "Prêt à réussir vos examens ?",
      ctaSub: "Rejoignez des milliers d'étudiants algériens.",
      ctaBtn: "Créer un compte gratuit"
    },
    lessons: {
      math: "Mathématiques", phys: "Physique", philo: "Philosophie",
      arab: "Littérature arabe", sci: "Sciences naturelles", hist: "Histoire-Géo",
      by: "Par", min: "min"
    },
    footer: {
      about: "À propos de Taleb IA",
      aboutTxt: "Une plateforme éducative futuriste propulsée par l'IA pour les étudiants algériens.",
      explore: "Explorer", learn: "Apprendre", connect: "Communauté",
      ai: "Assistant IA", ex: "Exercices", lib: "Bibliothèque PDF", com: "Communauté",
      docs: "Documentation", help: "Centre d'aide", blog: "Blog",
      contact: "Contact", terms: "Conditions", privacy: "Confidentialité",
      rights: "Tous droits réservés.",
      madeIn: "Fait avec ♥ en Algérie"
    },
    auth: {
      loginTitle: "Bon retour",
      loginSub: "Connectez-vous pour continuer",
      registerTitle: "Créer un compte",
      registerSub: "Rejoignez la communauté Taleb IA",
      email: "Adresse e-mail",
      password: "Mot de passe",
      name: "Nom complet",
      level: "Niveau d'étude",
      loginBtn: "Se connecter",
      registerBtn: "Créer le compte",
      noAccount: "Pas encore de compte ?",
      hasAccount: "Déjà inscrit ?",
      signup: "S'inscrire",
      signin: "Se connecter"
    },
    common: {
      search: "Rechercher cours, sujets, enseignants…",
      save: "Enregistrer", delete: "Supprimer", cancel: "Annuler",
      download: "Télécharger", view: "Voir", edit: "Modifier",
      loginRequired: "Veuillez vous connecter pour continuer"
    }
  },
  ar: {
    nav: {
      home: "الرئيسية", ai: "المساعد الذكي", exercises: "التمارين",
      community: "المجتمع", library: "المكتبة", dashboard: "لوحة التحكم",
      login: "دخول", register: "تسجيل", logout: "خروج", admin: "الإدارة"
    },
    hero: {
      badge: "مصمم للطلاب الجزائريين",
      title1: "تعلّم بذكاء مع",
      title2: "طالب AI",
      lead: "رفيقك الذكي المستقبلي للبكالوريا، شهادة التعليم المتوسط والجامعة. دروس تفاعلية، تدريس مباشر ومجتمع نابض — في مكان واحد.",
      cta1: "ابدأ مجاناً",
      cta2: "تعرّف على المعلم الذكي",
      stat1: "طالب نشط",
      stat2: "درس و PDF",
      stat3: "تمرين محلول",
      stat4: "متوسط التقييم"
    },
    home: {
      featuredTitle: "دروس مميزة",
      featuredSub: "دروس مختارة من أفضل الأساتذة الجزائريين",
      statsTitle: "أرقام تلهمنا",
      statsSub: "يثق بنا الطلاب في 58 ولاية",
      testiTitle: "الطلاب يحبون طالب AI",
      testiSub: "آراء حقيقية من متعلمين حقيقيين",
      ctaTitle: "مستعد لتفوق في امتحاناتك؟",
      ctaSub: "انضم لآلاف الطلاب الجزائريين.",
      ctaBtn: "أنشئ حساباً مجانياً"
    },
    lessons: {
      math: "الرياضيات", phys: "الفيزياء", philo: "الفلسفة",
      arab: "الأدب العربي", sci: "العلوم الطبيعية", hist: "التاريخ والجغرافيا",
      by: "بواسطة", min: "دقيقة"
    },
    footer: {
      about: "حول طالب AI",
      aboutTxt: "منصة تعليمية مستقبلية مدعومة بالذكاء الاصطناعي للطلاب الجزائريين.",
      explore: "استكشف", learn: "تعلّم", connect: "تواصل",
      ai: "المساعد الذكي", ex: "التمارين", lib: "مكتبة PDF", com: "المجتمع",
      docs: "التوثيق", help: "مركز المساعدة", blog: "المدونة",
      contact: "اتصل", terms: "الشروط", privacy: "الخصوصية",
      rights: "جميع الحقوق محفوظة.",
      madeIn: "صنع بـ ♥ في الجزائر"
    },
    auth: {
      loginTitle: "مرحباً بعودتك",
      loginSub: "سجّل الدخول لمتابعة رحلتك",
      registerTitle: "إنشاء حساب",
      registerSub: "انضم لمجتمع طالب AI اليوم",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      name: "الاسم الكامل",
      level: "المستوى الدراسي",
      loginBtn: "دخول",
      registerBtn: "إنشاء الحساب",
      noAccount: "ليس لديك حساب؟",
      hasAccount: "لديك حساب بالفعل؟",
      signup: "سجّل",
      signin: "دخول"
    },
    common: {
      search: "ابحث عن دروس، مواضيع، أساتذة…",
      save: "حفظ", delete: "حذف", cancel: "إلغاء",
      download: "تحميل", view: "عرض", edit: "تعديل",
      loginRequired: "الرجاء تسجيل الدخول للمتابعة"
    }
  }
};

/* ---------- Utilities ---------- */
const DB_KEY = "taleb_ai_db_v1";
const SESSION_KEY = "taleb_ai_session";
const LANG_KEY = "taleb_ai_lang";
const THEME_KEY = "taleb_ai_theme";
const ADMIN_EMAIL = "sidahmedag99@gmail.com";

function loadDB() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore */ }
  return seedDB();
}

function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

function seedDB() {
  const db = {
    users: [
      { id: "u1", name: "Sid Ahmed", email: ADMIN_EMAIL, password: "admin123", role: "admin", level: "University", xp: 9850, joined: "2024-09-01" },
      { id: "u2", name: "Amina B.", email: "amina@demo.dz", password: "demo123", role: "student", level: "BAC", xp: 3420, joined: "2025-01-14" },
      { id: "u3", name: "Yacine K.", email: "yacine@demo.dz", password: "demo123", role: "student", level: "BEM", xp: 1280, joined: "2025-03-02" }
    ],
    lessons: [
      { id: "l1", title: "Derivatives Masterclass", subject: "math", level: "BAC", teacher: "Prof. Larbi", duration: 45, icon: "📐", tag: "BAC" },
      { id: "l2", title: "Mechanics Fundamentals", subject: "phys", level: "BAC", teacher: "Prof. Samira", duration: 38, icon: "⚛️", tag: "BAC" },
      { id: "l3", title: "Existentialism Philosophy", subject: "philo", level: "BAC", teacher: "Prof. Karim", duration: 52, icon: "📚", tag: "BAC" },
      { id: "l4", title: "Classical Arabic Poetry", subject: "arab", level: "BEM", teacher: "Prof. Fatima", duration: 30, icon: "✒️", tag: "BEM" },
      { id: "l5", title: "Cell Biology", subject: "sci", level: "BAC", teacher: "Prof. Rachid", duration: 40, icon: "🧬", tag: "BAC" },
      { id: "l6", title: "Algerian Revolution", subject: "hist", level: "BEM", teacher: "Prof. Nadia", duration: 35, icon: "🗺️", tag: "BEM" }
    ],
    exercises: [
      { id: "e1", title: "Quadratic Equations — 20 problems", subject: "math", difficulty: "medium", tags: ["BAC", "Algebra"], solution: "Use the discriminant Δ = b² - 4ac. If Δ>0 → two real roots. Apply x = (-b±√Δ)/2a." },
      { id: "e2", title: "Newton's Laws Practice", subject: "phys", difficulty: "hard", tags: ["BAC", "Mechanics"], solution: "Apply F = ma. For each body, draw a free-body diagram and write the equations of motion." },
      { id: "e3", title: "Arabic Grammar Drill", subject: "arab", difficulty: "easy", tags: ["BEM", "Grammar"], solution: "Identify the grammatical case (مرفوع، منصوب، مجرور) based on the word's position in the sentence." },
      { id: "e4", title: "DNA Replication Q&A", subject: "sci", difficulty: "medium", tags: ["BAC", "Biology"], solution: "DNA replicates semi-conservatively. Helicase unzips, DNA polymerase builds new strands." }
    ],
    pdfs: [
      { id: "p1", title: "BAC Math — Complete Summary", subject: "math", pages: 84, size: "2.3 MB", downloads: 12450 },
      { id: "p2", title: "Physics Formula Sheet", subject: "phys", pages: 18, size: "850 KB", downloads: 8920 },
      { id: "p3", title: "Philosophy Essay Guide", subject: "philo", pages: 42, size: "1.5 MB", downloads: 5630 },
      { id: "p4", title: "Arabic Literature Anthology", subject: "arab", pages: 120, size: "4.1 MB", downloads: 3240 }
    ],
    posts: [
      { id: "post1", author: "Amina B.", authorId: "u2", content: "Just finished the derivatives masterclass — absolutely brilliant! Anyone else preparing for the BAC math exam? 🎯", likes: 24, comments: 7, time: "2h ago", liked: false },
      { id: "post2", author: "Yacine K.", authorId: "u3", content: "Looking for study partners for BEM physics. Let's form a group and revise together 💪", likes: 15, comments: 12, time: "5h ago", liked: false },
      { id: "post3", author: "Sid Ahmed", authorId: "u1", content: "New AI chat feature is live! Ask Taleb any question in Arabic, French, or English. Feedback welcome 🚀", likes: 89, comments: 31, time: "1d ago", liked: false }
    ],
    notifications: []
  };
  saveDB(db);
  return db;
}

let DB = loadDB();

/* ---------- Auth ---------- */
const Auth = {
  current() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  },
  login(email, password) {
    const user = DB.users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) return null;
    const session = { id: user.id, name: user.name, email: user.email, role: user.role, xp: user.xp };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  },
  register(data) {
    if (DB.users.some(u => u.email.toLowerCase() === data.email.toLowerCase())) {
      return { error: "Email already registered" };
    }
    const user = {
      id: "u" + Date.now(),
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.email.toLowerCase() === ADMIN_EMAIL ? "admin" : "student",
      level: data.level || "BAC",
      xp: 0,
      joined: new Date().toISOString().slice(0,10)
    };
    DB.users.push(user);
    saveDB(DB);
    const session = { id: user.id, name: user.name, email: user.email, role: user.role, xp: user.xp };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { user: session };
  },
  logout() { localStorage.removeItem(SESSION_KEY); },
  isAdmin() { const u = this.current(); return u && u.role === "admin"; },
  requireAuth() {
    if (!this.current()) {
      Toast.show(I18N[State.lang].common.loginRequired, "error");
      setTimeout(() => location.href = "/auth/login.html", 600);
      return false;
    }
    return true;
  }
};

/* ---------- Toasts ---------- */
const Toast = {
  host: null,
  init() {
    if (this.host) return;
    this.host = document.createElement("div");
    this.host.id = "toast-host";
    document.body.appendChild(this.host);
  },
  show(msg, type = "info", ms = 3200) {
    this.init();
    const el = document.createElement("div");
    el.className = "toast " + type;
    el.textContent = msg;
    this.host.appendChild(el);
    setTimeout(() => { el.style.opacity = "0"; el.style.transform = "translateX(20px)"; }, ms - 300);
    setTimeout(() => el.remove(), ms);
  }
};

/* ---------- Global State ---------- */
const State = {
  lang: localStorage.getItem(LANG_KEY) || "en",
  theme: localStorage.getItem(THEME_KEY) || "dark"
};

/* ---------- i18n ---------- */
function t(path) {
  const parts = path.split(".");
  let obj = I18N[State.lang];
  for (const p of parts) { obj = obj?.[p]; }
  return obj || path;
}

function applyI18n() {
  document.documentElement.lang = State.lang;
  document.body.dir = State.lang === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });
  document.querySelectorAll("[data-i18n-ph]").forEach(el => {
    el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph")));
  });
  const sel = document.getElementById("lang-select");
  if (sel) sel.value = State.lang;
}

function setLang(lang) {
  State.lang = lang;
  localStorage.setItem(LANG_KEY, lang);
  applyI18n();
  // Allow page-specific re-renders
  window.dispatchEvent(new CustomEvent("taleb:lang", { detail: { lang } }));
}

/* ---------- Theme ---------- */
function applyTheme() {
  document.documentElement.setAttribute("data-theme", State.theme);
  const btn = document.getElementById("theme-toggle");
  if (btn) btn.textContent = State.theme === "dark" ? "☀️" : "🌙";
}
function toggleTheme() {
  State.theme = State.theme === "dark" ? "light" : "dark";
  localStorage.setItem(THEME_KEY, State.theme);
  applyTheme();
}

/* ---------- Navbar rendering ---------- */
function renderNavbar(active = "home") {
  const nav = document.getElementById("navbar");
  if (!nav) return;
  const user = Auth.current();
  const isAdmin = user?.role === "admin";
  const links = [
    { key: "home", href: "/index.html", label: t("nav.home") },
    { key: "ai", href: "/pages/ai-chat.html", label: t("nav.ai") },
    { key: "exercises", href: "/pages/exercises.html", label: t("nav.exercises") },
    { key: "library", href: "/pages/library.html", label: t("nav.library") },
    { key: "community", href: "/pages/community.html", label: t("nav.community") },
    { key: "dashboard", href: "/dashboard/index.html", label: t("nav.dashboard") }
  ];
  nav.innerHTML = `
    <div class="container nav-inner">
      <a href="/index.html" class="brand">
        <div class="brand-logo">✦</div>
        <div class="brand-name">Taleb <span>AI</span></div>
      </a>
      <nav class="nav-links" id="nav-links">
        ${links.map(l => `<a href="${l.href}" class="${l.key === active ? 'active' : ''}">${l.label}</a>`).join("")}
      </nav>
      <div class="nav-actions">
        <select id="lang-select" class="lang-select" aria-label="Language">
          <option value="en">EN</option>
          <option value="fr">FR</option>
          <option value="ar">عربي</option>
        </select>
        <button class="icon-btn" id="theme-toggle" aria-label="Toggle theme">${State.theme === "dark" ? "☀️" : "🌙"}</button>
        ${isAdmin ? `<a href="/admin/dashboard.html" class="btn btn-ghost btn-sm">${t("nav.admin")}</a>` : ""}
        ${user
          ? `<button class="btn btn-ghost btn-sm" id="logout-btn">${t("nav.logout")}</button>`
          : `<a href="/auth/login.html" class="btn btn-ghost btn-sm">${t("nav.login")}</a>
             <a href="/auth/register.html" class="btn btn-primary btn-sm">${t("nav.register")}</a>`}
        <button class="icon-btn menu-toggle" id="menu-toggle" aria-label="Menu">☰</button>
      </div>
    </div>
  `;
  // Wire up events
  document.getElementById("lang-select").addEventListener("change", e => setLang(e.target.value));
  document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
  const mt = document.getElementById("menu-toggle");
  const nl = document.getElementById("nav-links");
  mt?.addEventListener("click", () => nl.classList.toggle("open"));
  document.getElementById("logout-btn")?.addEventListener("click", () => {
    Auth.logout();
    Toast.show("Signed out");
    setTimeout(() => location.reload(), 400);
  });
}

/* ---------- Footer ---------- */
function renderFooter() {
  const f = document.getElementById("footer");
  if (!f) return;
  f.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div>
          <a href="/index.html" class="brand" style="margin-bottom:14px;">
            <div class="brand-logo">✦</div>
            <div class="brand-name">Taleb <span>AI</span></div>
          </a>
          <p style="color:var(--text-dim); font-size:14px; max-width:340px;">${t("footer.aboutTxt")}</p>
        </div>
        <div>
          <h4>${t("footer.explore")}</h4>
          <ul>
            <li><a href="/pages/ai-chat.html">${t("footer.ai")}</a></li>
            <li><a href="/pages/exercises.html">${t("footer.ex")}</a></li>
            <li><a href="/pages/library.html">${t("footer.lib")}</a></li>
            <li><a href="/pages/community.html">${t("footer.com")}</a></li>
          </ul>
        </div>
        <div>
          <h4>${t("footer.learn")}</h4>
          <ul>
            <li><a href="#">${t("footer.docs")}</a></li>
            <li><a href="#">${t("footer.help")}</a></li>
            <li><a href="#">${t("footer.blog")}</a></li>
          </ul>
        </div>
        <div>
          <h4>${t("footer.connect")}</h4>
          <ul>
            <li><a href="#">${t("footer.contact")}</a></li>
            <li><a href="#">${t("footer.terms")}</a></li>
            <li><a href="#">${t("footer.privacy")}</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <div>© ${new Date().getFullYear()} Taleb AI — ${t("footer.rights")}</div>
        <div>${t("footer.madeIn")} 🇩🇿</div>
      </div>
    </div>
  `;
}

/* ---------- Reveal on scroll ---------- */
function setupReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
}

/* ---------- Init ---------- */
function initCore(active = "home") {
  applyTheme();
  renderNavbar(active);
  applyI18n();
  renderFooter();
  setupReveal();
}

// Export globals for page scripts
window.Taleb = { I18N, DB, saveDB: () => saveDB(DB), getDB: () => DB, Auth, Toast, State, t, setLang, initCore, loadDB: () => (DB = loadDB()) };

// Auto-init on DOMContentLoaded if page uses data-taleb-page attribute
document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.getAttribute("data-taleb-page");
  if (page) initCore(page);
});
