/* ==========================================================================
   Taleb AI — AI Chat (mock responses with typing animation)
   ========================================================================== */

(function () {
  const body = document.getElementById("chat-body");
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  const clearBtn = document.getElementById("clear-chat");
  const suggestRow = document.getElementById("suggest-row");

  // Mock response generator — picks a themed reply based on keywords
  function generateReply(q) {
    const lower = q.toLowerCase();
    if (/newton|force|motion/.test(lower)) {
      return "Newton's 3 laws of motion:\n1️⃣ An object stays at rest or in uniform motion unless acted upon by a force.\n2️⃣ F = ma — force equals mass times acceleration.\n3️⃣ For every action there is an equal and opposite reaction.\n\nWould you like a real-world example for each?";
    }
    if (/x\^2|x²|quadratic|equation/.test(lower) || /\d+x/.test(lower)) {
      return "Let's solve this step-by-step 📐\nFor a quadratic ax² + bx + c = 0, compute Δ = b² - 4ac.\n• If Δ > 0 → 2 real roots: x = (-b ± √Δ) / 2a\n• If Δ = 0 → 1 double root\n• If Δ < 0 → no real roots\n\nWant me to plug in the numbers from your equation?";
    }
    if (/ثورة|جزائر|تحرير/.test(lower)) {
      return "الثورة التحريرية الجزائرية 🇩🇿\nانطلقت في 1 نوفمبر 1954 واستمرت 7 سنوات ونصف. قادها جيش التحرير الوطني (ALN) وجبهة التحرير الوطني (FLN). انتهت بالاستقلال في 5 جويلية 1962 بعد تضحيات كبيرة. هل تريد تفاصيل أكثر عن مرحلة معينة؟";
    }
    if (/révis|plan|bac|bem/.test(lower)) {
      return "Voici un plan de révision BAC sur 4 semaines 📅\n• Semaine 1 : Mathématiques + Physique (fondamentaux)\n• Semaine 2 : Philo + Arabe + Langues\n• Semaine 3 : Sciences + Histoire-Géo\n• Semaine 4 : Examens blancs + révision ciblée\n\nChaque jour : 2h de cours + 1h d'exercices + 30 min de relecture. Je peux te créer un planning personnalisé !";
    }
    if (/quiz|test|exercice/.test(lower)) {
      return "Quick biology quiz 🧬\nQ1: What is the powerhouse of the cell?\nA) Nucleus  B) Mitochondria  C) Ribosome  D) Chloroplast\n\nReply with your answer (A, B, C or D) and I'll check!";
    }
    if (/hello|hi|salam|bonjour|مرحبا/.test(lower)) {
      return "Hello! 👋 Ready to study? Pick a subject or ask me anything — I'm here to help.";
    }
    if (/thank|merci|شكرا/.test(lower)) {
      return "You're very welcome! 🙌 Keep up the great work. Any other question?";
    }
    // Fallback
    const fallbacks = [
      `Great question! Let me break "${q.slice(0,60)}" down step-by-step.\n\nFirst, let's identify the key concepts. Then we'll apply the right method. Finally, I'll give you a practice problem to lock it in. Shall we continue?`,
      `Interesting! Here's my take on "${q.slice(0,60)}":\n\n1. Start with the definition\n2. See a worked example\n3. Try it yourself\n\nI recommend reviewing the related lesson in your library first — it'll make this much clearer. Want me to open it?`,
      `I'd love to help with that! For "${q.slice(0,60)}", I'd suggest approaching it from three angles:\n📐 Conceptual understanding\n📝 Worked examples\n🎯 Practice problems\n\nWhich angle do you want to start with?`
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  function addMsg(role, text) {
    const el = document.createElement("div");
    el.className = "msg " + role;
    el.textContent = text;
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
  }

  function addTyping() {
    const el = document.createElement("div");
    el.className = "typing";
    el.id = "typing-ind";
    el.innerHTML = "<span></span><span></span><span></span>";
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
  }
  function removeTyping() {
    document.getElementById("typing-ind")?.remove();
  }

  function send(text) {
    if (!text.trim()) return;
    addMsg("user", text);
    input.value = "";
    suggestRow.style.display = "none";
    addTyping();
    const delay = 600 + Math.min(1600, text.length * 20);
    setTimeout(() => {
      removeTyping();
      addMsg("bot", generateReply(text));
    }, delay);
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    send(input.value);
    input.focus();
  });

  suggestRow.addEventListener("click", e => {
    const btn = e.target.closest(".suggest-chip");
    if (!btn) return;
    send(btn.getAttribute("data-prompt"));
  });

  clearBtn.addEventListener("click", () => {
    body.innerHTML = '<div class="msg bot">Chat cleared. How can I help you now?</div>';
    suggestRow.style.display = "flex";
  });

  input.focus();
})();
