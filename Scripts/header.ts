import headerTemplate from "../Pages/Header/header.html?raw";

const headerContainerElement = document.getElementById("site-header");

if (!(headerContainerElement instanceof HTMLElement)) {
  throw new Error("Header container is missing.");
}

const headerContainer = headerContainerElement;
headerContainer.innerHTML = headerTemplate;

const menuToggleElement =
  headerContainer.querySelector<HTMLButtonElement>(".menu-toggle");
const menuNavigationElement =
  headerContainer.querySelector<HTMLElement>("#site-navigation");
const menuCloseButtonElement =
  headerContainer.querySelector<HTMLButtonElement>("[data-menu-close]");

if (!menuToggleElement || !menuNavigationElement || !menuCloseButtonElement) {
  throw new Error("Mobile navigation controls are missing.");
}

const menuToggle = menuToggleElement;
const menuNavigation = menuNavigationElement;
const menuCloseButton = menuCloseButtonElement;

function setMenuOpen(isOpen: boolean): void {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Menü schließen" : "Menü öffnen",
  );
  menuNavigation.classList.toggle("is-open", isOpen);
  menuCloseButton.hidden = !isOpen;
  document.body.classList.toggle("menu-open", isOpen);
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});
menuCloseButton.addEventListener("click", () => setMenuOpen(false));
menuNavigation.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    setMenuOpen(false);
  }
});
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuToggle.focus();
  }
});
window.matchMedia("(min-width: 701px)").addEventListener("change", (event) => {
  if (event.matches) {
    setMenuOpen(false);
  }
});

const siteRoot = new URL(".", window.location.href);
const navigationLinks =
  headerContainer.querySelectorAll<HTMLAnchorElement>("a[data-site-path]");

function updateNavigation(): void {
  const hash = window.location.hash;
  const currentPage =
    hash === "#/gallery"
      ? "gallery"
      : hash === "#/calculator"
        ? "calculator"
        : hash === "#skills"
          ? "skills"
          : hash === "#projects"
            ? "projects"
            : "home";

  navigationLinks.forEach((link) => {
    const path = link.dataset.sitePath;
    const page = link.dataset.current;
    if (!path || !page) {
      throw new Error("A navigation link is missing its site path or page.");
    }

    link.href = new URL(path, siteRoot).href;

    if (page === currentPage) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

updateNavigation();
window.addEventListener("hashchange", updateNavigation);
