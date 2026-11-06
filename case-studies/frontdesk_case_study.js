const menuToggle = document.querySelector("#menuToggle");
const primaryNav = document.querySelector("#primaryNav");
const readingProgress = document.querySelector("#readingProgress");

function setMenuOpen(isOpen) {
  if (!menuToggle || !primaryNav) return;
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  primaryNav.classList.toggle("is-open", isOpen);
}

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuOpen(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) setMenuOpen(false);
  });
}

if (readingProgress) {
  let updateScheduled = false;

  const updateReadingProgress = () => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0
      ? Math.min(100, Math.max(0, (window.scrollY / scrollableHeight) * 100))
      : 0;

    readingProgress.style.width = `${progress}%`;
    updateScheduled = false;
  };

  window.addEventListener("scroll", () => {
    if (updateScheduled) return;
    updateScheduled = true;
    window.requestAnimationFrame(updateReadingProgress);
  }, { passive: true });

  window.addEventListener("resize", updateReadingProgress);
  updateReadingProgress();
}

const revealTargets = document.querySelectorAll(
  ".hero-copy, .product-preview, .facts-grid > div, .intro-layout > div, .audience-card, .section-heading, .challenge-card, .challenge-quote, .process-card, .process-rail, .form-showcase, .decision-grid article, .channel-card, .operation-list article, .status-panel, .reporting-copy, .report-preview, .constraint-grid article, .constraint-takeaway, .rollout-copy, .rollout-timeline article, .outcome-grid article, .reflection, .confidentiality"
);

if ("IntersectionObserver" in window && revealTargets.length > 0) {
  document.documentElement.classList.add("has-js");
  const sectionDelays = new Map();
  revealTargets.forEach((element) => {
    const section = element.closest("section");
    const delay = sectionDelays.get(section) ?? 0;
    element.classList.add("reveal");
    element.style.setProperty("--reveal-delay", `${Math.min(delay, 320)}ms`);
    sectionDelays.set(section, delay + 75);
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((element) => revealObserver.observe(element));
}

if ("IntersectionObserver" in window) {
  const sectionLinks = [...document.querySelectorAll('.primary-nav a[href^="#"]')];
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach((link) => {
        if (link.hash === `#${entry.target.id}`) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    });
  }, { rootMargin: "-25% 0px -65% 0px" });

  sectionLinks.forEach((link) => {
    const section = document.querySelector(link.hash);
    if (section) sectionObserver.observe(section);
  });
}
