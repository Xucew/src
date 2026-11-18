const headerContainer = document.getElementById("site-header");
const headerScript = document.currentScript;

if (!headerContainer || !headerScript) {
  throw new Error("Header container or loader script is missing.");
}

const siteRoot = new URL("../", headerScript.src);
const headerUrl = new URL("../Pages/Header/header.html", headerScript.src);

fetch(headerUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Header request failed with status ${response.status}.`);
    }

    return response.text();
  })
  .then((markup) => {
    headerContainer.innerHTML = markup;

    headerContainer.querySelectorAll("[data-site-path]").forEach((link) => {
      link.href = new URL(link.dataset.sitePath, siteRoot).href;
    });

    headerContainer.querySelectorAll("[data-current]").forEach((link) => {
      if (new URL(link.href).pathname === window.location.pathname) {
        link.setAttribute("aria-current", "page");
      }
    });
  })
  .catch((error) => {
    console.error("Could not load the site header.", error);
  });
