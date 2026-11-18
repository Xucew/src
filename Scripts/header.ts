const headerContainerElement = document.getElementById("site-header");

if (!(headerContainerElement instanceof HTMLElement)) {
  throw new Error("Header container is missing.");
}

const headerContainer = headerContainerElement;
const siteRoot = new URL("../", import.meta.url);
const headerUrl = new URL("../Pages/Header/header.html", import.meta.url);

async function loadHeader(): Promise<void> {
  try {
    const response = await fetch(headerUrl);
    if (!response.ok) {
      throw new Error(`Header request failed with status ${response.status}.`);
    }

    headerContainer.innerHTML = await response.text();

    headerContainer
      .querySelectorAll<HTMLAnchorElement>("a[data-site-path]")
      .forEach((link) => {
        const path = link.dataset.sitePath;
        if (!path) {
          throw new Error("A navigation link is missing its site path.");
        }

        link.href = new URL(path, siteRoot).href;
      });

    headerContainer
      .querySelectorAll<HTMLAnchorElement>("a[data-current]")
      .forEach((link) => {
        if (new URL(link.href).pathname === window.location.pathname) {
          link.setAttribute("aria-current", "page");
        }
      });
  } catch (error) {
    console.error("Could not load the site header.", error);
  }
}

void loadHeader();
