// Mobile navigation
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Scroll reveal animations
const elements = document.querySelectorAll(".reveal");

elements.forEach(container => {
  const textElements = container.querySelectorAll(
    "h1, h2, h3, h4, p, .eyebrow, .solution-number, .quote"
  );
  let textIndex = 0;

  textElements.forEach(text => {
    if (text.closest(".reveal") !== container) return;

    text.classList.add("text-reveal");
    text.style.setProperty(
      "--text-delay",
      `${Math.min(textIndex * 80, 320)}ms`
    );
    textIndex++;
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  elements.forEach(el => observer.observe(el));
} else {
  elements.forEach(el => el.classList.add("visible"));
}

// Highlight active navigation link
const sections = document.querySelectorAll("section[id]");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      document.querySelectorAll(".nav-links a")
        .forEach(link => {
          const active =
            link.getAttribute("href") === "#" + entry.target.id;

          link.style.color = active ? "#6838D3" : "";
          link.setAttribute(
            "aria-current",
            active ? "location" : "false"
          );
        });
    });
  }, {
    rootMargin: "-20% 0px -65% 0px"
  });

  sections.forEach(section => sectionObserver.observe(section));
}
