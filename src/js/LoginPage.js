import "../css/main.css";
import ChooseLanguage from "./ChooseLanguage";
import create from "./create.utils";
import GpxiesAPI from "./GpxiesAPI";
import MessagePopap from "./MessagePopap";

class LoginPage {
  getWordsData(){
    const chooseLanguageComponent = new ChooseLanguage();
    this.wordsArr = chooseLanguageComponent.generateWordsData();
    this.chooseLanguage_container = chooseLanguageComponent.generateLayout();
    this.chooseLanguage_container.classList.add("language_container_login");
    this.chooseLanguage = chooseLanguageComponent.determinationLanguage();
    this.wordsChooseArr = this.wordsArr[this.chooseLanguage]
  }
  generateLayout() {
    this.getWordsData()
    this.button__prime = create(
      "div",
      "button__primary",
      `${this.wordsChooseArr.login}`
    );
    this.error_description = create(
      "div",
      "error_description error_description_hidden",
      `${this.wordsChooseArr.login_error_description}`
    );
    this.email_input = create(
      "input",
      null,
      null,
      null,
      ["type", "text"],
      ["id", "emailField"],
      ["required", "required"]
    );
    this.password_input = create(
      "input",
      null,
      null,
      null,
      ["type", "password"],
      ["id", "password"],
      ["required", "required"]
    );
    this.login_form_registrationPageLink = create(
      "div",
      "login_form_registrationLink",
      `${this.wordsChooseArr.registration}`
    );
    (this.login_form_container = create("div", "login_form_container", [
      create("label", null, "email", null, ["for", "emailField"]),
      this.email_input,
      this.error_description,
      create(
        "label",
        "login_form_password",
        `${this.wordsChooseArr.password}`,
        null,
        ["for", "password"]
      ),
      this.password_input,
      create("a", null, null, null, ["href", "#"]),
    ])),
      (this.login_form = create("form", "login_form", [
        create(
          "h3",
          "login_form_title",
          `${this.wordsChooseArr.enter}`
        ),
        this.login_form_container,
        create("div", "login_form_buttoncontainer", [
          this.button__prime,
          this.login_form_registrationPageLink,
        ]),
        this.chooseLanguage_container,
      ]));
    const wrapper = create("div", "wrapper", this.login_form);
    document.body.prepend(wrapper);
    this.checkRegistration();
    this.addEventListeners();
  }
  refreshLayout() {
    document.body.innerHTML = "";
    this.chooseLanguage = localStorage.getItem("gpxiesChoosen_language");
    this.generateLayout();
  }
  addEventListeners() {
    this.button__prime.addEventListener("click", async (e) => {
      e.preventDefault();
      let userData = {
        email: document.querySelector("#emailField").value,
        password: document.querySelector("#password").value,
      };
      this.gpxiesAPI = new GpxiesAPI();
      let res = await this.gpxiesAPI.userLogin(userData);
      console.log("res", res);
      if (res.type == "error") {
        this.error_description.classList.remove("error_description_hidden");
      } else {
        this.error_description.classList.add("error_description_hidden");
      }
      if (res.token) {
        localStorage.setItem("gpxiesUserName", res.username);
        localStorage.setItem("gpxiesToken", res.token);
        localStorage.setItem("gpxiesUserId", res.id);
        this.redirectToTrackListPage();
      }
    });
    this.login_form_registrationPageLink.addEventListener("click", () => {
      this.redirectToRegistrationPage();
    });
    document
      .querySelector(".language_container")
      .addEventListener("click", () => {
        this.refreshLayout();
      });
  }
  redirectToTrackListPage() {
    window.location = "/mytracks";
  }
  redirectToRegistrationPage() {
    window.location = "/registration";
  }
  checkRegistration() {
    const registrationMessage = new MessagePopap(
      `${this.wordsChooseArr.success_registration_message}`,
      null,
      `${this.wordsChooseArr.error_registration_message}`,
      null
    );
    const registrationSuccessMessageNode = registrationMessage.generateSuccessLayout();
    registrationSuccessMessageNode.classList.remove(
      "successMessage_container",
      "successMessage_container__hidden"
    );
    registrationSuccessMessageNode.classList.add(
      "registrationMessage_container"
    );
    if (localStorage.getItem("gpxiesEmail")) {
      this.login_form_container.prepend(registrationSuccessMessageNode);
      this.email_input.value = localStorage.getItem("gpxiesEmail");
      localStorage.removeItem("gpxiesEmail");
    }
    if (localStorage.getItem("gpxiesPassword")) {
      this.password_input.value = localStorage.getItem("gpxiesPassword");
      localStorage.removeItem("gpxiesPassword");
    } 
  }
}
const loginPage = new LoginPage();
loginPage.generateLayout();

export default LoginPage;
