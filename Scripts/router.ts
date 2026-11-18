import calculatorPage from "../Pages/Calculator/calculator.html?raw";
import galleryPage from "../Pages/Gallery/gallery.html?raw";

const homePageElement = document.getElementById("home-page");
const routePageElement = document.getElementById("route-page");
const routeContentElement = document.getElementById("route-content");

if (
  !(homePageElement instanceof HTMLElement) ||
  !(routePageElement instanceof HTMLElement) ||
  !(routeContentElement instanceof HTMLElement)
) {
  throw new Error("Page containers are missing.");
}

const homePage = homePageElement;
const routePage = routePageElement;
const routeContent = routeContentElement;

const routes: Record<string, { title: string; content: string }> = {
  "#/gallery": { title: "Fotogalerie", content: galleryPage },
  "#/calculator": { title: "Taschenrechner", content: calculatorPage },
};

function renderPage(): void {
  const route = routes[window.location.hash];

  if (!route && ["", "#/", "#skills", "#projects"].includes(window.location.hash)) {
    homePage.hidden = false;
    routePage.hidden = true;
    document.title = "Meine Tage";
    return;
  }

  homePage.hidden = true;
  routePage.hidden = false;

  if (!route) {
    document.title = "Seite nicht gefunden";
    routeContent.innerHTML =
      "<section><h2>Seite nicht gefunden</h2><p>Diese Seite existiert nicht.</p></section>";
    return;
  }

  document.title = route.title;
  const pageTemplate = document.createElement("template");
  pageTemplate.innerHTML = route.content;
  routeContent.replaceChildren(pageTemplate.content.cloneNode(true));
}

renderPage();
window.addEventListener("hashchange", renderPage);
