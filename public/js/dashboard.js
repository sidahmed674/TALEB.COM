/* ==========================================================================
   Taleb AI — Student Dashboard
   ========================================================================== */

(function () {
  const { Auth, Toast, t, getDB } = window.Taleb;

  function guard() {
    const user = Auth.current();
    if (!user) {
      Toast.show(t("common.loginRequired"), "error");
      setTimeout(() => location.href = "/auth/login.html", 700);
      return null;
    }
    return user;
  }

  function renderSidebar(user) {
    const sb = document.getElementById("sidebar");
    if (!sb) return;
    const initial = user.name.trim().charAt(0).toUpperCase();
    sb.innerHTML = `
      <div class="side-head">
        <div class="side-avatar">${initial}</div>
        <div>
          <strong>${user.name}</strong>
          <span>${user.email}</span>
        </div>
      </div>
      <ul class="side-menu">
        <li><a href="#overview" class="active"><span class="ico">🏠</span> Overview</a></li>
        <li><a href="/pages/ai-chat.html"><span class="ico">✨</span> AI Assistant</a></li>
        <li><a href="/pages/exercises.html"><span class="ico">📝</span> Exercises</a></li>
        <li><a href="/pages/library.html"><span class="ico">📚</span> Library</a></li>
        <li><a href="/pages/community.html"><span class="ico">💬</span> Community</a></li>
        <li><a href="#planner-anchor"><span class="ico">📅</span> Study planner</a></li>
        <li><a href="#settings"><span class="ico">⚙️</span> Settings</a></li>
      </ul>
    `;
  }

  function renderKPIs(user) {
    const row = document.getElementById("kpi-row");
    const kpis = [
      { ico: "⚡", label: "Total XP", val: user.xp.toLocaleString(), delta: "+120 this week" },
      { ico: "🔥", label: "Day streak", val: "14", delta: "Personal best!" },
      { ico: "📚", label: "Lessons completed", val: "42", delta: "+5 this week" },
      { ico: "🎯", label: "Accuracy", val: "87%", delta: "+3% vs last month" }
    ];
    row.innerHTML = kpis.map(k => `
      <div class="kpi glass">
        <div class="k-ico">${k.ico}</div>
        <div>
          <div class="k-label">${k.label}</div>
          <div class="k-val">${k.val}</div>
          <div class="k-delta">↑ ${k.delta}</div>
        </div>
      </div>
    `).join("");
  }

  function renderProgress() {
    const list = document.getElementById("progress-list");
    const subjects = [
      { name: "Mathematics", pct: 78, color: "#22d3ee" },
      { name: "Physics", pct: 64, color: "#6366f1" },
      { name: "Arabic Literature", pct: 85, color: "#ec4899" },
      { name: "Natural Sciences", pct: 52, color: "#10b981" },
      { name: "Philosophy", pct: 71, color: "#fbbf24" }
    ];
    list.innerHTML = subjects.map(s => `
      <div>
        <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
          <span style="font-size:14px; font-weight:600;">${s.name}</span>
          <span class="muted" style="font-size:13px;">${s.pct}%</span>
        </div>
        <div class="progress"><div style="width:${s.pct}%; background:linear-gradient(90deg, ${s.color}, ${s.color}99);"></div></div>
      </div>
    `).join("");
  }

  function renderXP(user) {
    const panel = document.getElementById("xp-panel");
    const next = Math.ceil(user.xp / 1000) * 1000;
    const pct = Math.min(100, ((user.xp % 1000) / 1000) * 100);
    const level = Math.floor(user.xp / 1000) + 1;
    panel.innerHTML = `
      <div style="text-align:center; padding:10px 0 18px;">
        <div style="font-size:42px;">🏆</div>
        <div style="font-size:24px; font-weight:800;">Level ${level}</div>
        <div class="muted" style="font-size:13px;">${user.xp} / ${next} XP</div>
      </div>
      <div class="progress" style="margin-bottom:18px;"><div style="width:${pct}%;"></div></div>
      <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:8px;">
        <div class="pill" style="text-align:center; padding:10px 6px;">🔥 14-day streak</div>
        <div class="pill" style="text-align:center; padding:10px 6px;">⭐ Top 10%</div>
        <div class="pill" style="text-align:center; padding:10px 6px;">🧠 AI Explorer</div>
      </div>
    `;
  }

  function renderSaved() {
    const db = getDB();
    const el = document.getElementById("saved-lessons");
    el.innerHTML = db.lessons.slice(0, 4).map(l => `
      <div style="display:flex; gap:12px; align-items:center; padding:10px 0; border-bottom:1px solid var(--border);">
        <div style="width:42px; height:42px; border-radius:10px; background:var(--grad-2); display:grid; place-items:center; font-size:20px;">${l.icon}</div>
        <div style="flex:1;">
          <div style="font-size:14px; font-weight:600;">${l.title}</div>
          <div class="muted" style="font-size:12px;">${l.teacher} • ${l.duration} min</div>
        </div>
        <button class="icon-btn" style="width:32px; height:32px;" title="Open">→</button>
      </div>
    `).join("");
  }

  function renderPlanner() {
    const el = document.getElementById("planner");
    el.id = "planner";
    el.parentElement.id = "planner-anchor";
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    const tasks = [
      "Math — Derivatives practice",
      "Physics — Newton's laws",
      "Arabic — Poetry analysis",
      "AI chat revision session",
      "BAC mock exam"
    ];
    el.innerHTML = days.map((d, i) => `
      <div style="display:flex; gap:12px; align-items:center; padding:10px 0; border-bottom:1px solid var(--border);">
        <div style="width:42px; height:42px; border-radius:10px; background:var(--surface-strong); display:grid; place-items:center; font-weight:700; font-size:13px;">${d}</div>
        <div style="flex:1; font-size:14px;">${tasks[i]}</div>
        <input type="checkbox" ${i < 2 ? "checked" : ""} style="width:18px; height:18px; accent-color: var(--primary);" />
      </div>
    `).join("");
  }

  function renderActivity() {
    const ul = document.getElementById("activity");
    const items = [
      { ico: "✅", txt: "Completed 'Quadratic Equations' exercise", t: "2h ago" },
      { ico: "📚", txt: "Started 'Derivatives Masterclass'", t: "5h ago" },
      { ico: "💬", txt: "Posted in Community forum", t: "1d ago" },
      { ico: "🏆", txt: "Earned 'AI Explorer' badge", t: "2d ago" },
      { ico: "⭐", txt: "Reached Level 10!", t: "3d ago" }
    ];
    ul.innerHTML = items.map(it => `
      <li style="display:flex; gap:12px; align-items:center; padding:10px 0; border-bottom:1px solid var(--border);">
        <div style="font-size:18px;">${it.ico}</div>
        <div style="flex:1;">
          <div style="font-size:14px;">${it.txt}</div>
          <div class="muted" style="font-size:12px;">${it.t}</div>
        </div>
      </li>
    `).join("");
  }

  function renderAIRecs() {
    const el = document.getElementById("ai-recs");
    const recs = [
      { ico: "🎯", txt: "You're 3 lessons away from completing Algebra — keep going!" },
      { ico: "⚠️", txt: "Your Physics accuracy dropped this week — try revision mode." },
      { ico: "💡", txt: "New philosophy essay guide matches your current topic." }
    ];
    el.innerHTML = recs.map(r => `
      <div style="display:flex; gap:12px; padding:12px; border-radius:12px; background:var(--surface); margin-bottom:10px;">
        <div style="font-size:20px;">${r.ico}</div>
        <div style="font-size:14px; color:var(--text-dim);">${r.txt}</div>
      </div>
    `).join("");
  }

  document.addEventListener("DOMContentLoaded", () => {
    const user = guard();
    if (!user) return;
    document.getElementById("welcome-line").textContent = `Welcome back, ${user.name.split(" ")[0]} 👋`;
    renderSidebar(user);
    renderKPIs(user);
    renderProgress();
    renderXP(user);
    renderSaved();
    renderPlanner();
    renderActivity();
    renderAIRecs();
  });
})();
