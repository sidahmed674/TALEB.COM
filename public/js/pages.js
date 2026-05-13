/* ==========================================================================
   Taleb AI — Pages logic (exercises, library, community)
   Detects which page is loaded via body[data-taleb-page] and runs the handler.
   ========================================================================== */

(function () {
  const { getDB, saveDB, Auth, Toast, t } = window.Taleb;
  const page = document.body.getAttribute("data-taleb-page");

  /* ============================================================
     EXERCISES
     ============================================================ */
  if (page === "exercises") {
    const search = document.getElementById("ex-search");
    const subjSel = document.getElementById("ex-subject");
    const diffSel = document.getElementById("ex-diff");
    const list = document.getElementById("ex-list");

    function render() {
      const db = getDB();
      const q = (search.value || "").toLowerCase();
      const s = subjSel.value;
      const d = diffSel.value;
      const items = db.exercises.filter(x => {
        if (q && !x.title.toLowerCase().includes(q) && !x.tags.join(" ").toLowerCase().includes(q)) return false;
        if (s && x.subject !== s) return false;
        if (d && x.difficulty !== d) return false;
        return true;
      });
      if (items.length === 0) {
        list.innerHTML = `<div class="card" style="padding:40px; text-align:center;">No exercises match your filters.</div>`;
        return;
      }
      list.innerHTML = items.map(x => `
        <details class="exercise glass">
          <summary>
            <div>
              <div style="margin-bottom:4px;">${x.title}</div>
              <div>${x.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
            </div>
            <span class="difficulty ${x.difficulty}">${x.difficulty.toUpperCase()}</span>
          </summary>
          <div class="solution">
            <strong>💡 Solution:</strong><br/>
            ${x.solution || "Solution not available."}
          </div>
          <div style="margin-top:12px; display:flex; gap:8px;">
            <button class="btn btn-ghost btn-sm" onclick="Taleb.Toast.show('PDF attached in real backend 📎')">📎 View PDF</button>
            <button class="btn btn-primary btn-sm" onclick="Taleb.Toast.show('Exercise marked as completed ✅', 'success')">✓ Mark complete</button>
          </div>
        </details>
      `).join("");
    }
    [search, subjSel, diffSel].forEach(el => el.addEventListener("input", render));
    render();
  }

  /* ============================================================
     LIBRARY (PDFs)
     ============================================================ */
  if (page === "library") {
    const search = document.getElementById("lib-search");
    const subjSel = document.getElementById("lib-subject");
    const grid = document.getElementById("pdf-grid");

    // Pre-fill search from query string
    const params = new URLSearchParams(location.search);
    if (params.get("q")) search.value = params.get("q");

    function render() {
      const db = getDB();
      const q = (search.value || "").toLowerCase();
      const s = subjSel.value;
      const items = db.pdfs.filter(p => {
        if (q && !p.title.toLowerCase().includes(q)) return false;
        if (s && p.subject !== s) return false;
        return true;
      });
      if (items.length === 0) {
        grid.innerHTML = `<div class="card" style="padding:40px; text-align:center; grid-column:1/-1;">No PDFs match your search.</div>`;
        return;
      }
      grid.innerHTML = items.map(p => `
        <article class="card">
          <div style="height:120px; border-radius:12px; background:var(--grad-2); display:grid; place-items:center; font-size:48px; margin-bottom:14px;">📄</div>
          <h3 style="margin:0 0 6px; font-size:16px;">${p.title}</h3>
          <p style="margin:0 0 12px; font-size:13px; color:var(--text-mute);">${p.subject} • ${p.pages} pages • ${p.size}</p>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="muted" style="font-size:12px;">⬇ ${p.downloads.toLocaleString()} downloads</span>
            <button class="btn btn-primary btn-sm" data-download="${p.id}">Download</button>
          </div>
        </article>
      `).join("");
      grid.querySelectorAll("[data-download]").forEach(b => b.addEventListener("click", () => {
        const db2 = getDB();
        const pdf = db2.pdfs.find(x => x.id === b.getAttribute("data-download"));
        if (pdf) { pdf.downloads++; saveDB(); }
        Toast.show("📥 Downloading " + pdf.title + "…", "success");
        render();
      }));
    }
    [search, subjSel].forEach(el => el.addEventListener("input", render));
    render();
  }

  /* ============================================================
     COMMUNITY
     ============================================================ */
  if (page === "community") {
    const composerGuest = document.getElementById("composer-guest");
    const postForm = document.getElementById("post-form");
    const composerAvatar = document.getElementById("composer-avatar");
    const contentTA = document.getElementById("post-content");
    const postsList = document.getElementById("posts-list");

    const user = Auth.current();
    if (user) {
      composerGuest.classList.add("hidden");
      postForm.classList.remove("hidden");
      composerAvatar.textContent = user.name.trim().charAt(0).toUpperCase();
    }

    function render() {
      const db = getDB();
      postsList.innerHTML = db.posts.map(p => `
        <article class="card post-card">
          <div class="post-head">
            <div class="post-avatar">${p.author.charAt(0).toUpperCase()}</div>
            <div>
              <strong>${p.author}</strong>
              <span>${p.time}</span>
            </div>
          </div>
          <div class="post-body">${escapeHTML(p.content)}</div>
          <div class="post-actions">
            <button data-like="${p.id}" class="${p.liked ? 'liked' : ''}">❤ <span>${p.likes}</span></button>
            <button data-comment="${p.id}">💬 ${p.comments}</button>
            <button data-share="${p.id}">↗ Share</button>
          </div>
        </article>
      `).join("");

      postsList.querySelectorAll("[data-like]").forEach(b => b.addEventListener("click", () => {
        if (!Auth.current()) { Toast.show(t("common.loginRequired"), "error"); setTimeout(() => location.href = "/auth/login.html", 700); return; }
        const db2 = getDB();
        const post = db2.posts.find(x => x.id === b.getAttribute("data-like"));
        if (!post) return;
        post.liked = !post.liked;
        post.likes += post.liked ? 1 : -1;
        saveDB(); render();
      }));
      postsList.querySelectorAll("[data-comment]").forEach(b => b.addEventListener("click", () => Toast.show("Comments UI — coming soon 💬")));
      postsList.querySelectorAll("[data-share]").forEach(b => b.addEventListener("click", () => {
        if (navigator.share) {
          navigator.share({ title: "Taleb AI post", text: "Check out this discussion on Taleb AI", url: location.href }).catch(() => {});
        } else {
          navigator.clipboard?.writeText(location.href);
          Toast.show("Link copied 📋", "success");
        }
      }));
    }

    postForm.addEventListener("submit", e => {
      e.preventDefault();
      const user = Auth.current();
      if (!user) return;
      const content = contentTA.value.trim();
      if (!content) return Toast.show("Write something first", "error");
      const db = getDB();
      db.posts.unshift({
        id: "post" + Date.now(),
        author: user.name,
        authorId: user.id,
        content,
        likes: 0, comments: 0, time: "just now", liked: false
      });
      saveDB();
      contentTA.value = "";
      Toast.show("Posted! 🎉", "success");
      render();
    });

    render();
  }

  function escapeHTML(str) {
    return str.replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
  }
})();
