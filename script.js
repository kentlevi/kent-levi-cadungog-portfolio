const nav = document.querySelector(".nav");
const navMenu = document.querySelector(".nav-items");
const btnToggleNav = document.querySelector(".menu-btn");
const switchThemeEl = document.querySelector("#theme-switch");
const lastFocusedEl = document.querySelector('[data-focused="last-focused"]');
const revealEls = document.querySelectorAll(".reveal");
const yearEl = document.querySelector(".footer-text span");
const interactiveCards = document.querySelectorAll(
  ".timeline-card, .skill-card, .work-box, .profile-card, .project-card, .hero-metrics li, .skills-img"
);

function toggleNav(forceClose = false) {
  const shouldClose = forceClose || !nav.classList.contains("hidden");
  nav.classList.toggle("hidden", shouldClose);
  document.body.classList.toggle("lock-screen", !shouldClose && window.innerWidth <= 760);
  btnToggleNav.setAttribute("aria-expanded", String(!shouldClose));
  btnToggleNav.textContent = shouldClose ? "Menu" : "Close";
}

btnToggleNav.addEventListener("click", () => toggleNav());

navMenu.addEventListener("click", (event) => {
  if (event.target.localName === "a") {
    toggleNav(true);
  }
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !nav.classList.contains("hidden")) {
    toggleNav(true);
  }
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "Tab" && document.activeElement === lastFocusedEl && !nav.classList.contains("hidden")) {
    event.preventDefault();
    btnToggleNav.focus();
  }
});

const storedTheme = localStorage.getItem("theme");
switchThemeEl.checked = storedTheme === "dark" || storedTheme === null;

switchThemeEl.addEventListener("click", () => {
  const isChecked = switchThemeEl.checked;

  if (!isChecked) {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    localStorage.setItem("theme", "light");
    return;
  }

  document.body.classList.add("dark");
  document.body.classList.remove("light");
  localStorage.setItem("theme", "dark");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealEls.forEach((element) => observer.observe(element));

interactiveCards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    card.style.setProperty("--cursor-x", `${x}px`);
    card.style.setProperty("--cursor-y", `${y}px`);
  });
});

yearEl.textContent = new Date().getFullYear();
