/* ==========================================================================
   Taleb AI — Homepage script
   ========================================================================== */

(function () {
  const { getDB, t, Toast } = window.Taleb;

  function renderLessons() {
    const grid = document.getElementById("lessons-grid");
    if (!grid) return;
    const db = getDB();
    grid.innerHTML = db.lessons.map(l => `
      <article class="card lesson-card reveal">
        <div class="lesson-thumb">
          <span class="lesson-tag">${l.tag}</span>
          ${l.icon}
        </div>
        <h3>${l.title}</h3>
        <p>${t("lessons." + l.subject)} • ${l.level}</p>
        <div class="lesson-meta">
          <span>${t("lessons.by")} ${l.teacher}</span>
          <span>${l.duration} ${t("lessons.min")}</span>
        </div>
      </article>
    `).join("");
    // Re-run reveal on dynamically added items
    document.querySelectorAll(".reveal:not(.visible)").forEach(el => {
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
      }, { threshold: 0.12 });
      io.observe(el);
    });
  }

  function renderTestimonials() {
    const grid = document.getElementById("testi-grid");
    if (!grid) return;
    const data = [
      { name: "Yasmine M.", city: "Algiers", text: "Taleb AI changed the way I prepare for BAC. The AI tutor is like having a private teacher 24/7.", init: "Y" },
      { name: "Mohamed R.", city: "Oran", text: "The exercises with step-by-step solutions are incredible. I improved my math grade from 12 to 17.", init: "M" },
      { name: "Lina B.", city: "Constantine", text: "J'adore la communauté ! Les discussions m'aident à rester motivée pendant les révisions.", init: "L" }
    ];
    grid.innerHTML = data.map(d => `
      <div class="card testi-card reveal">
        <p class="quote">"${d.text}"</p>
        <div class="testi-user">
          <div class="testi-avatar">${d.init}</div>
          <div><strong>${d.name}</strong><span>${d.city}, Algeria 🇩🇿</span></div>
        </div>
      </div>
    `).join("");
  }

  function animateCounters() {
    document.querySelectorAll("[data-count]").forEach(el => {
      const target = parseInt(el.getAttribute("data-count"), 10);
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          let cur = 0;
          const step = Math.max(1, Math.floor(target / 60));
          const timer = setInterval(() => {
            cur += step;
            if (cur >= target) { cur = target; clearInterval(timer); }
            el.textContent = cur >= 1000 ? (cur/1000).toFixed(1).replace(/\.0$/, "") + "K+" : cur + (target === 98 ? "%" : "+");
          }, 20);
          io.unobserve(el);
        });
      }, { threshold: 0.4 });
      io.observe(el);
    });
  }

  // Rotating AI demo conversation
  const aiDemo = document.getElementById("ai-demo");
  const conversations = [
    [
      { role: "user", text: "كيف نحل المعادلة من الدرجة الثانية؟" },
      { role: "bot", text: "Use the discriminant Δ = b² - 4ac. Want me to walk through an example?" },
      { role: "user", text: "Oui, donne-moi un exemple 📚" }
    ],
    [
      { role: "user", text: "اشرح لي الثورة التحريرية الجزائرية" },
      { role: "bot", text: "The Algerian Revolution began on November 1, 1954. It lasted 7.5 years and ended with independence in 1962 🇩🇿" },
      { role: "user", text: "What were the main causes?" }
    ],
    [
      { role: "user", text: "Explain Newton's third law please" },
      { role: "bot", text: "For every action, there is an equal and opposite reaction. Example: when you jump, you push the ground down — it pushes you up!" },
      { role: "user", text: "Can you give me a practice question?" }
    ]
  ];
  let convoIdx = 0;
  function rotateConvo() {
    if (!aiDemo) return;
    convoIdx = (convoIdx + 1) % conversations.length;
    const convo = conversations[convoIdx];
    aiDemo.innerHTML = convo.map(m => `<div class="msg ${m.role}">${m.text}</div>`).join("") + `<div class="typing"><span></span><span></span><span></span></div>`;
  }
  setInterval(rotateConvo, 5000);

  // Search feedback
  document.addEventListener("keydown", e => {
    if (e.key === "Enter" && e.target.matches(".search-wrap input")) {
      const q = e.target.value.trim();
      if (q) { Toast.show(`Searching "${q}"…`); setTimeout(() => location.href = "/pages/library.html?q=" + encodeURIComponent(q), 500); }
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    renderLessons();
    renderTestimonials();
    animateCounters();
  });
  window.addEventListener("taleb:lang", () => { renderLessons(); });
})();
