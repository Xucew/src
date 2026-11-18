import headerTemplate from "../Pages/Header/header.html?raw";

const headerContainerElement = document.getElementById("site-header");

if (!(headerContainerElement instanceof HTMLElement)) {
  throw new Error("Header container is missing.");
}

const headerContainer = headerContainerElement;
headerContainer.innerHTML = headerTemplate;

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
