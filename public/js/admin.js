/* ==========================================================================
   Taleb AI — Admin Dashboard
   ========================================================================== */

(function () {
  const { Auth, Toast, getDB, saveDB } = window.Taleb;
  const ADMIN_EMAIL = "sidahmedag99@gmail.com";

  function guardAdmin() {
    const user = Auth.current();
    if (!user) {
      Toast.show("Please sign in as admin", "error");
      setTimeout(() => location.href = "/auth/login.html", 700);
      return null;
    }
    if (user.email.toLowerCase() !== ADMIN_EMAIL) {
      Toast.show("Access denied — only " + ADMIN_EMAIL + " can access admin.", "error");
      setTimeout(() => location.href = "/dashboard/index.html", 1200);
      return null;
    }
    return user;
  }

  /* ---------- Tabs ---------- */
  function initTabs() {
    const links = document.querySelectorAll(".side-menu a[data-tab]");
    const panels = document.querySelectorAll("[data-panel]");
    links.forEach(a => {
      a.addEventListener("click", e => {
        e.preventDefault();
        const tab = a.getAttribute("data-tab");
        links.forEach(x => x.classList.remove("active"));
        a.classList.add("active");
        panels.forEach(p => p.classList.toggle("hidden", p.getAttribute("data-panel") !== tab));
      });
    });
  }

  /* ---------- Overview KPIs ---------- */
  function renderOverview() {
    const db = getDB();
    const el = document.getElementById("admin-kpis");
    const kpis = [
      { ico: "👥", label: "Total users", val: db.users.length },
      { ico: "📚", label: "Lessons", val: db.lessons.length },
      { ico: "📄", label: "PDFs", val: db.pdfs.length },
      { ico: "📝", label: "Exercises", val: db.exercises.length }
    ];
    el.innerHTML = kpis.map(k => `
      <div class="kpi glass">
        <div class="k-ico">${k.ico}</div>
        <div>
          <div class="k-label">${k.label}</div>
          <div class="k-val">${k.val}</div>
        </div>
      </div>
    `).join("");

    // Activity chart
    const chart = document.getElementById("activity-chart");
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const values = [34, 52, 48, 71, 89, 62, 95];
    const max = Math.max(...values);
    chart.innerHTML = values.map((v, i) => `
      <div style="flex:1; display:flex; flex-direction:column; align-items:center; gap:6px;">
        <div style="width:100%; background:var(--grad-1); border-radius:6px 6px 0 0; height:${(v/max)*100}%; min-height:4px; position:relative;" title="${v} sign-ins">
          <div style="position:absolute; top:-18px; left:50%; transform:translateX(-50%); font-size:11px; font-weight:700;">${v}</div>
        </div>
        <div class="muted" style="font-size:11px;">${days[i]}</div>
      </div>
    `).join("");

    // Recent notifications
    const notifList = document.getElementById("admin-notifs");
    const notifs = [
      { ico: "🆕", txt: "New user Amina B. registered", t: "5 min ago" },
      { ico: "📚", txt: "Lesson 'Cell Biology' uploaded", t: "1h ago" },
      { ico: "⚠️", txt: "Community post flagged for review", t: "3h ago" },
      { ico: "🏆", txt: "42 students completed weekly goal", t: "1d ago" }
    ];
    notifList.innerHTML = notifs.map(n => `
      <li style="display:flex; gap:10px; padding:10px 0; border-bottom:1px solid var(--border); font-size:14px;">
        <span>${n.ico}</span>
        <div style="flex:1;">
          <div>${n.txt}</div>
          <div class="muted" style="font-size:12px;">${n.t}</div>
        </div>
      </li>
    `).join("");
  }

  /* ---------- Users ---------- */
  function renderUsers() {
    const db = getDB();
    const tbody = document.getElementById("users-tbody");
    tbody.innerHTML = db.users.map(u => `
      <tr>
        <td><strong>${u.name}</strong></td>
        <td>${u.email}</td>
        <td><span class="role-badge ${u.role}">${u.role}</span></td>
        <td>${u.xp.toLocaleString()}</td>
        <td>${u.joined || "—"}</td>
        <td>
          <button class="btn btn-ghost btn-sm" data-promote="${u.id}">${u.role === "admin" ? "Demote" : "Promote"}</button>
          <button class="btn btn-danger btn-sm" data-del-user="${u.id}">Delete</button>
        </td>
      </tr>
    `).join("");

    tbody.querySelectorAll("[data-promote]").forEach(b => b.addEventListener("click", () => {
      const id = b.getAttribute("data-promote");
      const u = db.users.find(x => x.id === id);
      if (!u) return;
      if (u.email.toLowerCase() === ADMIN_EMAIL) { Toast.show("Cannot change super admin role", "error"); return; }
      u.role = u.role === "admin" ? "student" : "admin";
      saveDB(); renderUsers(); Toast.show("Role updated", "success");
    }));
    tbody.querySelectorAll("[data-del-user]").forEach(b => b.addEventListener("click", () => {
      const id = b.getAttribute("data-del-user");
      const u = db.users.find(x => x.id === id);
      if (u && u.email.toLowerCase() === ADMIN_EMAIL) { Toast.show("Cannot delete super admin", "error"); return; }
      if (!confirm("Delete this user?")) return;
      const db2 = getDB();
      db2.users = db2.users.filter(x => x.id !== id);
      saveDB(); renderUsers(); Toast.show("User deleted");
    }));
  }

  document.getElementById("add-user-btn").addEventListener("click", () => {
    openModal("Add User", `
      <div class="field"><label>Name</label><input id="m-name" type="text" /></div>
      <div class="field"><label>Email</label><input id="m-email" type="email" /></div>
      <div class="field"><label>Password</label><input id="m-pass" type="text" value="demo123" /></div>
      <div class="field"><label>Role</label><select id="m-role"><option value="student">student</option><option value="admin">admin</option></select></div>
    `, () => {
      const db2 = getDB();
      const name = document.getElementById("m-name").value.trim();
      const email = document.getElementById("m-email").value.trim();
      const password = document.getElementById("m-pass").value;
      const role = document.getElementById("m-role").value;
      if (!name || !email) return Toast.show("All fields required", "error");
      db2.users.push({ id: "u" + Date.now(), name, email, password, role, level: "BAC", xp: 0, joined: new Date().toISOString().slice(0,10) });
      saveDB(); renderUsers(); closeModal(); Toast.show("User added", "success");
    });
  });

  /* ---------- Lessons ---------- */
  function renderLessons() {
    const db = getDB();
    const icons = ["📐","⚛️","📚","✒️","🧬","🗺️","🎨","💻"];
    const el = document.getElementById("admin-lessons");
    el.innerHTML = db.lessons.map(l => `
      <div class="card lesson-card">
        <div class="lesson-thumb"><span class="lesson-tag">${l.tag}</span>${l.icon}</div>
        <h3>${l.title}</h3>
        <p>${l.subject} • ${l.level} • ${l.duration} min</p>
        <div style="margin-top:12px; display:flex; gap:8px;">
          <button class="btn btn-ghost btn-sm" style="flex:1;">Edit</button>
          <button class="btn btn-danger btn-sm" data-del-lesson="${l.id}">Delete</button>
        </div>
      </div>
    `).join("");
    el.querySelectorAll("[data-del-lesson]").forEach(b => b.addEventListener("click", () => {
      if (!confirm("Delete this lesson?")) return;
      const db2 = getDB();
      db2.lessons = db2.lessons.filter(x => x.id !== b.getAttribute("data-del-lesson"));
      saveDB(); renderLessons(); Toast.show("Lesson deleted");
    }));
  }

  document.getElementById("add-lesson-btn").addEventListener("click", () => {
    openModal("Add Lesson", `
      <div class="field"><label>Title</label><input id="m-title" type="text" /></div>
      <div class="field"><label>Subject key (math|phys|philo|arab|sci|hist)</label><input id="m-subj" type="text" value="math" /></div>
      <div class="field"><label>Level</label><select id="m-level"><option>BEM</option><option selected>BAC</option><option>University</option></select></div>
      <div class="field"><label>Teacher</label><input id="m-teach" type="text" value="Prof. " /></div>
      <div class="field"><label>Duration (min)</label><input id="m-dur" type="number" value="40" /></div>
    `, () => {
      const db2 = getDB();
      const title = document.getElementById("m-title").value.trim();
      if (!title) return Toast.show("Title required", "error");
      db2.lessons.push({
        id: "l" + Date.now(),
        title,
        subject: document.getElementById("m-subj").value.trim() || "math",
        level: document.getElementById("m-level").value,
        teacher: document.getElementById("m-teach").value.trim(),
        duration: parseInt(document.getElementById("m-dur").value, 10) || 30,
        icon: "📚",
        tag: document.getElementById("m-level").value
      });
      saveDB(); renderLessons(); closeModal(); Toast.show("Lesson added", "success");
    });
  });

  /* ---------- PDFs ---------- */
  function renderPDFs() {
    const db = getDB();
    const tbody = document.getElementById("pdfs-tbody");
    tbody.innerHTML = db.pdfs.map(p => `
      <tr>
        <td><strong>${p.title}</strong></td>
        <td>${p.subject}</td>
        <td>${p.pages}</td>
        <td>${p.size}</td>
        <td>${p.downloads.toLocaleString()}</td>
        <td><button class="btn btn-danger btn-sm" data-del-pdf="${p.id}">Delete</button></td>
      </tr>
    `).join("");
    tbody.querySelectorAll("[data-del-pdf]").forEach(b => b.addEventListener("click", () => {
      if (!confirm("Delete this PDF?")) return;
      const db2 = getDB();
      db2.pdfs = db2.pdfs.filter(x => x.id !== b.getAttribute("data-del-pdf"));
      saveDB(); renderPDFs(); Toast.show("PDF deleted");
    }));
  }

  document.getElementById("add-pdf-btn").addEventListener("click", () => {
    openModal("Upload PDF", `
      <div class="field"><label>Title</label><input id="m-ptitle" type="text" /></div>
      <div class="field"><label>Subject</label><input id="m-psubj" type="text" value="math" /></div>
      <div class="field"><label>Pages</label><input id="m-ppages" type="number" value="30" /></div>
      <div class="field"><label>File size</label><input id="m-psize" type="text" value="1.2 MB" /></div>
      <div class="field"><label>File (mock)</label><input type="file" disabled /><div class="muted" style="font-size:11px; margin-top:4px;">In this demo, PDFs are tracked in localStorage. Real upload goes to /uploads/.</div></div>
    `, () => {
      const db2 = getDB();
      const title = document.getElementById("m-ptitle").value.trim();
      if (!title) return Toast.show("Title required", "error");
      db2.pdfs.push({
        id: "p" + Date.now(),
        title,
        subject: document.getElementById("m-psubj").value,
        pages: parseInt(document.getElementById("m-ppages").value, 10) || 30,
        size: document.getElementById("m-psize").value || "1 MB",
        downloads: 0
      });
      saveDB(); renderPDFs(); closeModal(); Toast.show("PDF uploaded", "success");
    });
  });

  /* ---------- Exercises ---------- */
  function renderExercises() {
    const db = getDB();
    const tbody = document.getElementById("ex-tbody");
    tbody.innerHTML = db.exercises.map(x => `
      <tr>
        <td><strong>${x.title}</strong></td>
        <td>${x.subject}</td>
        <td><span class="difficulty ${x.difficulty}">${x.difficulty}</span></td>
        <td>${x.tags.map(t => `<span class="tag">${t}</span>`).join("")}</td>
        <td><button class="btn btn-danger btn-sm" data-del-ex="${x.id}">Delete</button></td>
      </tr>
    `).join("");
    tbody.querySelectorAll("[data-del-ex]").forEach(b => b.addEventListener("click", () => {
      if (!confirm("Delete this exercise?")) return;
      const db2 = getDB();
      db2.exercises = db2.exercises.filter(x => x.id !== b.getAttribute("data-del-ex"));
      saveDB(); renderExercises(); Toast.show("Exercise deleted");
    }));
  }

  document.getElementById("add-ex-btn").addEventListener("click", () => {
    openModal("Add Exercise", `
      <div class="field"><label>Title</label><input id="m-etitle" type="text" /></div>
      <div class="field"><label>Subject</label><input id="m-esubj" type="text" value="math" /></div>
      <div class="field"><label>Difficulty</label><select id="m-ediff"><option>easy</option><option selected>medium</option><option>hard</option></select></div>
      <div class="field"><label>Tags (comma-separated)</label><input id="m-etags" type="text" value="BAC" /></div>
      <div class="field"><label>Solution</label><textarea id="m-esol" rows="3"></textarea></div>
    `, () => {
      const db2 = getDB();
      const title = document.getElementById("m-etitle").value.trim();
      if (!title) return Toast.show("Title required", "error");
      db2.exercises.push({
        id: "e" + Date.now(),
        title,
        subject: document.getElementById("m-esubj").value,
        difficulty: document.getElementById("m-ediff").value,
        tags: document.getElementById("m-etags").value.split(",").map(s => s.trim()).filter(Boolean),
        solution: document.getElementById("m-esol").value
      });
      saveDB(); renderExercises(); closeModal(); Toast.show("Exercise added", "success");
    });
  });

  /* ---------- Community moderation ---------- */
  function renderCommunity() {
    const db = getDB();
    const el = document.getElementById("admin-posts");
    el.innerHTML = db.posts.map(p => `
      <div class="card post-card">
        <div class="post-head">
          <div class="post-avatar">${p.author.charAt(0)}</div>
          <div><strong>${p.author}</strong><span>${p.time}</span></div>
        </div>
        <div class="post-body">${p.content}</div>
        <div class="post-actions">
          <span>❤ ${p.likes} likes • 💬 ${p.comments} comments</span>
          <button class="btn btn-danger btn-sm" data-del-post="${p.id}" style="margin-left:auto;">Delete post</button>
        </div>
      </div>
    `).join("");
    el.querySelectorAll("[data-del-post]").forEach(b => b.addEventListener("click", () => {
      if (!confirm("Delete this post?")) return;
      const db2 = getDB();
      db2.posts = db2.posts.filter(x => x.id !== b.getAttribute("data-del-post"));
      saveDB(); renderCommunity(); Toast.show("Post deleted");
    }));
  }

  /* ---------- Notifications broadcast ---------- */
  document.getElementById("send-notif-btn").addEventListener("click", () => {
    const title = document.getElementById("notif-title").value.trim();
    const msg = document.getElementById("notif-msg").value.trim();
    if (!title || !msg) return Toast.show("Please fill both fields", "error");
    const db2 = getDB();
    db2.notifications.unshift({ id: "n" + Date.now(), title, msg, t: new Date().toISOString() });
    saveDB();
    document.getElementById("notif-title").value = "";
    document.getElementById("notif-msg").value = "";
    Toast.show("Notification broadcast to all users 📣", "success");
  });

  /* ---------- Modal ---------- */
  function openModal(title, bodyHTML, onSave) {
    const host = document.getElementById("modal-host");
    host.innerHTML = `
      <div style="position:fixed; inset:0; background:rgba(0,0,0,0.6); z-index:200; display:grid; place-items:center; padding:20px; backdrop-filter:blur(4px);">
        <div class="glass-strong" style="width:100%; max-width:480px; padding:26px; border-radius:20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
            <h3 style="margin:0;">${title}</h3>
            <button class="icon-btn" id="m-close">✕</button>
          </div>
          <div>${bodyHTML}</div>
          <div style="display:flex; gap:10px; justify-content:flex-end; margin-top:18px;">
            <button class="btn btn-ghost" id="m-cancel">Cancel</button>
            <button class="btn btn-primary" id="m-save">Save</button>
          </div>
        </div>
      </div>
    `;
    document.getElementById("m-close").onclick = closeModal;
    document.getElementById("m-cancel").onclick = closeModal;
    document.getElementById("m-save").onclick = onSave;
  }
  function closeModal() { document.getElementById("modal-host").innerHTML = ""; }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    const admin = guardAdmin();
    if (!admin) return;
    document.getElementById("admin-email").textContent = admin.email;
    initTabs();
    renderOverview();
    renderUsers();
    renderLessons();
    renderPDFs();
    renderExercises();
    renderCommunity();
  });
})();
