const footerContainer = document.getElementById("site-footer");
const footerScript = document.currentScript;

if (!footerContainer || !footerScript) {
  throw new Error("Footer container or loader script is missing.");
}

const footerUrl = new URL("../Pages/Footer/footer.html", footerScript.src);

fetch(footerUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Footer request failed with status ${response.status}.`);
    }

    return response.text();
  })
  .then((markup) => {
    footerContainer.innerHTML = markup;

    const impressumDialog = footerContainer.querySelector("#impressum-dialog");
    const privacyDialog = footerContainer.querySelector("#privacy-dialog");

    footerContainer
      .querySelector("#open-impressum")
      .addEventListener("click", () => impressumDialog.showModal());

    footerContainer
      .querySelectorAll("#open-privacy, #open-privacy-en")
      .forEach((button) => {
        button.addEventListener("click", () => privacyDialog.showModal());
      });
  })
  .catch((error) => {
    console.error("Could not load the site footer.", error);
  });
