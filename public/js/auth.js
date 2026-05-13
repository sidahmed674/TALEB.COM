/* ==========================================================================
   Taleb AI — Auth handlers
   ========================================================================== */

(function () {
  const { Auth, Toast } = window.Taleb;

  function markInvalid(fieldEl, invalid) {
    fieldEl.classList.toggle("invalid", invalid);
  }

  function validateEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();
      const data = new FormData(loginForm);
      const email = (data.get("email") || "").toString().trim();
      const password = (data.get("password") || "").toString();
      let valid = true;
      loginForm.querySelectorAll(".field").forEach(f => markInvalid(f, false));

      if (!validateEmail(email)) { markInvalid(loginForm.querySelector('input[name="email"]').closest(".field"), true); valid = false; }
      if (password.length < 6) { markInvalid(loginForm.querySelector('input[name="password"]').closest(".field"), true); valid = false; }
      if (!valid) return;

      const session = Auth.login(email, password);
      if (!session) {
        Toast.show("Invalid email or password", "error");
        return;
      }
      Toast.show("Welcome back, " + session.name + "! 👋", "success");
      setTimeout(() => {
        location.href = session.role === "admin" ? "/admin/dashboard.html" : "/dashboard/index.html";
      }, 600);
    });
  }

  const regForm = document.getElementById("register-form");
  if (regForm) {
    regForm.addEventListener("submit", e => {
      e.preventDefault();
      const data = new FormData(regForm);
      const name = (data.get("name") || "").toString().trim();
      const email = (data.get("email") || "").toString().trim();
      const level = (data.get("level") || "").toString();
      const password = (data.get("password") || "").toString();
      let valid = true;
      regForm.querySelectorAll(".field").forEach(f => markInvalid(f, false));

      if (name.length < 2) { markInvalid(regForm.querySelector('input[name="name"]').closest(".field"), true); valid = false; }
      if (!validateEmail(email)) { markInvalid(regForm.querySelector('input[name="email"]').closest(".field"), true); valid = false; }
      if (password.length < 6) { markInvalid(regForm.querySelector('input[name="password"]').closest(".field"), true); valid = false; }
      if (!valid) return;

      const res = Auth.register({ name, email, level, password });
      if (res.error) { Toast.show(res.error, "error"); return; }
      Toast.show("Welcome to Taleb AI! 🎉", "success");
      setTimeout(() => {
        location.href = res.user.role === "admin" ? "/admin/dashboard.html" : "/dashboard/index.html";
      }, 600);
    });
  }
})();
