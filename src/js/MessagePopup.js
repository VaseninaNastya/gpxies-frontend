import create from "./utils/create.utils";
import tree from "../../assets/img/tree.png";

class MessagePopup {
  constructor(successMessage, successButtons, errorMessage, errorButtons) {
    (this.successMessage = successMessage),
      (this.successButtons = successButtons),
      (this.errorMessage = errorMessage),
      (this.errorButtons = errorButtons);
  }
  generateMessageLayout() {
    this.loadingSpinner_img = create("img", "loadingSpinner_img", null, null, [
      "src",
      tree,
    ]);
    const loadingSpinner_container = create("div", "loadingSpinner_container", [
      this.loadingSpinner_img,
      this.generateSuccessLayout(),
      this.generateErrorLayout(),
    ]);
    return loadingSpinner_container;
  }
  generateSuccessLayout() {
    this.successMessageNode = create(
      "div",
      "successMessage_container successMessage_container__hidden",
      [create("h3", "successMessage_title", this.successMessage)]
    );
    if (this.successButtons) {
      this.successButtons.map((item) => {
        const successButton = create(
          "div",
          `button__primary ${item[0]}`,
          item[1]
        );
        this.successMessageNode.append(successButton);
      });
    }
    return this.successMessageNode;
  }
  generateErrorLayout() {
    this.errorMessageNode = create(
      "div",
      "errorMessage_container errorMessage_container__hidden",
      [create("h3", "errorMessage_title", this.errorMessage)]
    );
    if (this.errorButtons) {
      this.errorButtons.map((item) => {
        const errorButton = create(
          "div",
          `button__primary ${item[0]}`,
          item[1]
        );
        this.errorMessageNode.append(errorButton);
      });
    }
    return this.errorMessageNode;
  }
  showSuccessMessage() {
    setTimeout(() => {
      this.loadingSpinner_img.classList.add("loadingSpinner_img__hidden");
      this.successMessageNode.classList.remove(
        "successMessage_container__hidden"
      );
    }, 1000);
  }
  showErrorMessage() {
    setTimeout(() => {
      this.loadingSpinner_img.classList.add("loadingSpinner_img__hidden");
      this.errorMessageNode.classList.remove("errorMessage_container__hidden");
    }, 1000);

  }

  hideMessages() {
    document
      .querySelector(".loadingSpinner_wrapper")
      .classList.add("loadingSpinner_wrapper__hidden");
    this.loadingSpinner_img.classList.remove("loadingSpinner_img__hidden");
    if (document.querySelector(".successMessage_container")) {
      document
        .querySelector(".successMessage_container")
        .classList.add("successMessage_container__hidden");
    }
    if (document.querySelector(".errorMessage_container")) {
      document
        .querySelector(".errorMessage_container")
        .classList.add("errorMessage_container__hidden");
    }
  }
}
export default MessagePopup;
