const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealItems = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
}

const selfCheckInputs = [...document.querySelectorAll('.self-check-list input[type="checkbox"]')];
const selfCheckCount = document.querySelector("#self-check-count");
const selfCheckMessage = document.querySelector("#self-check-message");
const selfCheckResult = document.querySelector("#self-check-result");
const selfCheckEmoji = document.querySelector("#self-check-emoji");

if (selfCheckInputs.length && selfCheckCount && selfCheckMessage && selfCheckResult && selfCheckEmoji) {
  const states = [
    { level: "neutral", emoji: "🙂", message: "Markiert, was heute zutrifft." },
    { level: "watch", emoji: "😐", message: "Ein möglicher Hebel ist sichtbar." },
    { level: "watch", emoji: "😕", message: "Ein paar Punkte verdienen einen genaueren Blick." },
    { level: "action", emoji: "😟", message: "Mehrere Signale sprechen für einen klaren Startpunkt." },
    { level: "action", emoji: "😣", message: "Eure KI-Arbeit braucht wahrscheinlich mehr Struktur." },
    { level: "urgent", emoji: "😰", message: "Zeit, die nächsten KI-Schritte gemeinsam zu ordnen." }
  ];

  const updateSelfCheck = () => {
    const checked = selfCheckInputs.filter((input) => input.checked).length;
    selfCheckCount.textContent = `${checked} von ${selfCheckInputs.length} markiert`;
    const state = states[Math.min(checked, states.length - 1)];
    selfCheckResult.dataset.level = state.level;
    selfCheckEmoji.textContent = state.emoji;
    selfCheckMessage.textContent = state.message;
  };

  selfCheckInputs.forEach((input) => input.addEventListener("change", updateSelfCheck));
}

const newsletterForm = document.querySelector("[data-newsletter-form]");
const newsletterNote = document.querySelector("[data-newsletter-note]");

if (newsletterForm && newsletterNote) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = new FormData(newsletterForm).get("email");
    const subject = encodeURIComponent("KI-Newsletter anmelden");
    const body = encodeURIComponent(`Bitte für den KI-Newsletter anmelden: ${email}`);
    window.location.href = `mailto:hello@blinkin.io?subject=${subject}&body=${body}`;
    newsletterNote.textContent = "Eure E-Mail ist vorbereitet. Schickt die Nachricht noch ab, dann melden wir euch an.";
  });
}
