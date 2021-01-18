import "../css/main.css";
import create from "./create";
import GpxiesAPI from "./GpxiesAPI";
import SuccessRegistrationPopup from "./SuccessRegistrationPopup";

class LoginPage {
  generateLayout() {
    this.button__prime = create("a", "button__primary", "Войти");
    this.error_description = create("div","error_description error_description_hidden", "Логин или пароль не зарегистрированы"),

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
      "Регистрация"
    );
    this.login_form_container =       create("div", "login_form_container", [
      create("label", null, "email", null, ["for", "emailField"]),
      this.email_input,
      this.error_description,
      create("label", null, "пароль", null, ["for", "password"]),
      this.password_input,
      create("a", null, null, null, ["href", "#"]),
    ]),
    this.login_form =     create("form", "login_form", [
      create("h3", "login_form_title", "Вход"),
      this.login_form_container,
      create("div", "login_form_buttoncontainer", [
        this.button__prime,
        this.login_form_registrationPageLink,
      ]),
    ])
    const wrapper = create("div", "wrapper",
    this.login_form
    )
    document.body.prepend(wrapper);
    this.checkRegistration();
    this.addRegistrationPageLinkEventListener();
    this.addSendFormButtonEventListener()

  }
  addSendFormButtonEventListener() {
    this.button__prime.addEventListener("click", async (e) => {
      e.preventDefault();
      let userData = {
        email: document.querySelector("#emailField").value,
        password: document.querySelector("#password").value,
      };
      this.gpxiesAPI = new GpxiesAPI();
      let res = await this.gpxiesAPI.userLogin(userData);
      console.log("res", res);
      if(res.type =="error"){
        this.error_description.classList.remove("error_description_hidden")
      }else{
        this.error_description.classList.add("error_description_hidden")
      }
      if(res.token){
        localStorage.setItem("gpxiesUserName", res.username);
        localStorage.setItem("gpxiesToken", res.token);
        localStorage.setItem("gpxiesUserId", res.id);
        
        this.redirectToTrackListPage()
      }
    });
  }
  addRegistrationPageLinkEventListener() {
    this.login_form_registrationPageLink.addEventListener("click", () => {
      this.redirectToRegistrationPage();
    });
  }
  redirectToTrackListPage(){
    window.location = "trackListPage.html";
  }
  redirectToRegistrationPage() {
    window.location = "registrationPage.html";
  }

  checkRegistration() {
    let successMessage = new SuccessRegistrationPopup()
    if (localStorage.getItem("gpxiesEmail")) {
      this.login_form_container.prepend(successMessage.generateLayout())
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
