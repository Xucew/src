const footerContainerElement = document.getElementById("site-footer");

if (!(footerContainerElement instanceof HTMLElement)) {
  throw new Error("Footer container is missing.");
}

const footerContainer = footerContainerElement;
const footerUrl = new URL("../../Pages/Footer/footer.html", import.meta.url);

async function loadFooter(): Promise<void> {
  try {
    const response = await fetch(footerUrl);
    if (!response.ok) {
      throw new Error(`Footer request failed with status ${response.status}.`);
    }

    footerContainer.innerHTML = await response.text();

    const impressumDialog =
      footerContainer.querySelector<HTMLDialogElement>("#impressum-dialog");
    const privacyDialog =
      footerContainer.querySelector<HTMLDialogElement>("#privacy-dialog");
    const openImpressumButton =
      footerContainer.querySelector<HTMLButtonElement>("#open-impressum");
    const openPrivacyButtons =
      footerContainer.querySelectorAll<HTMLButtonElement>(
        "#open-privacy, #open-privacy-en",
      );

    if (
      !impressumDialog ||
      !privacyDialog ||
      !openImpressumButton ||
      openPrivacyButtons.length === 0
    ) {
      throw new Error("Footer dialog controls are missing.");
    }

    openImpressumButton.addEventListener("click", () =>
      impressumDialog.showModal(),
    );

    openPrivacyButtons.forEach((button) => {
      button.addEventListener("click", () => privacyDialog.showModal());
    });
  } catch (error) {
    console.error("Could not load the site footer.", error);
  }
}

void loadFooter();
