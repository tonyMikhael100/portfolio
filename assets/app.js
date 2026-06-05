document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-site-nav]");
  const navLinks = nav ? Array.from(nav.querySelectorAll('a[href^="#"]')) : [];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("menu-open", isOpen);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      });
    });
  }

  if (navLinks.length && sections.length) {
    const setActiveLink = () => {
      const offset = window.scrollY + 160;
      let currentId = "#home";

      sections.forEach((section) => {
        if (section.offsetTop <= offset) {
          currentId = `#${section.id}`;
        }
      });

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === currentId);
      });
    };

    setActiveLink();
    window.addEventListener("scroll", setActiveLink, { passive: true });
  }

  const yearNode = document.querySelector("[data-current-year]");
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }
});
