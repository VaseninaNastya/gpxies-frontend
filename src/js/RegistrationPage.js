import "../css/main.css";
import create from "./create";
import GpxiesAPI from "./GpxiesAPI";
import ChooseLanguage from "./ChooseLanguage";

class RegistrationPage {
  getWordsData() {
    const chooseLanguageComponent = new ChooseLanguage();
    this.wordsArr = chooseLanguageComponent.generateWordsData();
    this.chooseLanguage_container = chooseLanguageComponent.generateLayout();
    this.chooseLanguage_container.classList.add(
      "language_container_registration"
    );
    this.chooseLanguage = chooseLanguageComponent.determinationLanguage();
    this.wordsChooseArr = this.wordsArr[this.chooseLanguage];
  }
  generateLayout() {
    this.getWordsData();
    this.button__prime = create(
      "a",
      "button__primary",
      `${this.wordsChooseArr.signUp}`
    );
    this.password = create(
      "input",
      null,
      null,
      null,
      ["type", "password"],
      ["id", "password"],
      ["required", "required"]
    );
    this.password_description = create(
      "div",
      "password_description__hidden password_description",
      `${this.wordsChooseArr.error_password_signUp_message}`
    );
    this.duplicate_email_description = create(
      "div",
      "duplicate_email_description__hidden duplicate_email_description",
      `${this.wordsChooseArr.error_email_signUp_message}`
    );
    this.confirm_password = create(
      "input",
      null,
      null,
      null,
      ["type", "password"],
      ["id", "confirmPassword"],
      ["required", "required"]
    );
    this.confirm_password_description = create(
      "div",
      "confirm_password_description__hidden confirm_password_description",
      `${this.wordsChooseArr.error_email_proof_signUp_message}`
    );
    this.registration_form_loginLink = create(
      "div",
      "registration_form_loginLink",
      `${this.wordsChooseArr.enter}`
    );
    this.login_description = create("div", "login_description");
    this.email_description = create("div", "email_description");
    this.registration_form = create("form", "registration_form", [
      create(
        "h3",
        "registration_form_title",
        `${this.wordsChooseArr.registration}`
      ),
      create("div", "registration_form_container", [
        create("label", null, `${this.wordsChooseArr.yourLogin}`, null, ["for", "loginField"]),
        create(
          "input",
          null,
          null,
          null,
          ["type", "text"],
          ["id", "loginField"],
          ["required", "required"]
        ),
        this.login_description,
        create("label", null, "email", null, ["for", "emailField"]),
        create(
          "input",
          null,
          null,
          null,
          ["type", "email"],
          ["id", "emailField"],
          ["required", "required"]
        ),
        this.duplicate_email_description,
        this.email_description,
        create("label", null, `${this.wordsChooseArr.password}`, null, ["for", "password"]),
        this.password,
        this.password_description,
        create(
          "label",
          null,
          `${this.wordsChooseArr.confirmThePassword}`,
          null,
          ["for", "confirmPassword"]
        ),
        this.confirm_password,
        this.confirm_password_description,
      ]),
      create("div", "registration_form_buttoncontainer", [
        this.button__prime,
        this.registration_form_loginLink,
      ]),
      this.chooseLanguage_container,
    ]);
    const wrapper = create("div", "wrapper", this.registration_form);
    document.body.prepend(wrapper);
    this.addListeners();
  }
  validateСonfirmPassword() {
    if (this.password.value != this.confirm_password.value) {
      this.confirm_password_description.classList.remove(
        "confirm_password_description__hidden"
      );
    } else {
      this.confirm_password_description.classList.add(
        "confirm_password_description__hidden"
      );
    }
  }
  validatePassword() {
    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/gm.test(
        this.password.value
      )
    ) {
      this.password_description.classList.remove(
        "password_description__hidden"
      );
    } else {
      if (!document.querySelector(".password_description__hidden")) {
        this.password_description.classList.add("password_description__hidden");
      }
    }
  }
  refreshLayout() {
    document.body.innerHTML = "";
    this.chooseLanguage = localStorage.getItem("gpxiesChoosen_language");
    this.generateLayout();
  }
  addListeners() {
    this.button__prime.addEventListener("click", async (e) => {
      e.preventDefault();
      this.clearLoginErrors();
      this.validatePassword();
      this.validateСonfirmPassword();
      this.userRegistrationData = {
        username: document.querySelector("#loginField").value,
        email: document.querySelector("#emailField").value,
        password: document.querySelector("#password").value,
        confirm_password: document.querySelector("#confirmPassword").value,
      };
      this.gpxiesAPI = new GpxiesAPI();
      this.gpxiesAPIAnswer = await this.gpxiesAPI.userRegistration(
        this.userRegistrationData
      );
      await this.showLoginErrorsMessages();
      await this.showDuplicateEmailErrorsMessages();
      await this.addRegisteredDataAtLocalStorage();
    });
    this.registration_form_loginLink.addEventListener("click", () => {
      this.redirectToLoginPage();
    });
    document
      .querySelector(".language_container")
      .addEventListener("click", () => {
        this.refreshLayout();
      });
  }
  showLoginErrorsMessages() {
    if (this.gpxiesAPIAnswer.errors) {
      this.gpxiesAPIAnswer.errors.map((item) => {
        if (item.param == "email") {
          this.email_description.append(create("span", null, item.msg));
        }
        if (item.param == "username") {
          this.login_description.append(create("span", null, item.msg));
        }
      });
    }
  }
  showDuplicateEmailErrorsMessages() {
    console.log("this.gpxiesAPIAnswer", this.gpxiesAPIAnswer);
    if (this.gpxiesAPIAnswer.status == "409") {
      this.duplicate_email_description.classList.remove(
        "duplicate_email_description__hidden"
      );
    } else {
      if (!document.querySelector(".duplicate_email_description__hidden")) {
        this.duplicate_email_description.classList.add(
          "duplicate_email_description__hidden"
        );
      }
    }
  }
  addRegisteredDataAtLocalStorage() {
    if (this.gpxiesAPIAnswer.ok) {
      localStorage.setItem("gpxiesEmail", this.userRegistrationData.email);
      localStorage.setItem(
        "gpxiesPassword",
        this.userRegistrationData.password
      );
      this.redirectToLoginPage();
    }
  }
  redirectToLoginPage() {
    window.location = "loginPage.html";
  }
  clearLoginErrors() {
    if (this.login_description) {
      this.login_description.innerHTML = "";
    }
    if (this.email_description) {
      this.email_description.innerHTML = "";
    }
  }
}
const registrationPage = new RegistrationPage();
registrationPage.generateLayout();

export default RegistrationPage;
