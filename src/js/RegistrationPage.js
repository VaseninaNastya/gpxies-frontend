import "../css/main.css";
import create from "./create";
import GpxiesAPI from "./GpxiesAPI";

class RegistrationPage {
  generateLayout() {
    const button__prime = create(
      "input",
      "button__primary",
      "Зарегистрироваться",
      null,
      ["type", "submit"],
      ["value", "Зарегистрироваться"]
    );
    
    const password =create(
      "input",
      null,
      null,
      null,
      ["type", "password"],
      ["id", "password"],
      ["required", "required"]
    )
    const confirm_password = create(
      "input",
      null,
      null,
      null,
      ["type", "password"],
      ["id", "confirmPassword"],
      ["required", "required"]
    )
  
    document.body.prepend(
      create("form", "registration_form", [
        create("h3", "registration_form_title", "Регистрация"),
        create("div", "registration_form_container", [
          create("label", null, "логин", null, ["for", "loginField"]),
          create(
            "input",
            null,
            null,
            null,
            ["type", "text"],
            ["id", "loginField"],
            ["required", "required"]
          ),
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
          create("label", null, "пароль", null, ["for", "password"]),
          password,
          create("div", "password_description__hidden password_description", "Минимальная длина пароля - 6 знаков. Пароль должен содержать не менее одной прописной буквы и не менее одной цифры"),
          create("label", null, "подтвердите пароль", null, [
            "for",
            "confirmPassword",
          ]),
          confirm_password,
          create("a", null, null, null, ["href", "#"]),
        ]),
        create("div", "registration_form_buttoncontainer", [
          button__prime,
          create("a", "registration_form_loginLink", "Вход", null, [
            "href",
            "#",
          ]),
        ]),
      ])
    );
    this.validatePassword = () => {
      if (! /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/gm.test(password.value)  ){
        document.querySelector(".password_description").classList.remove("password_description__hidden")
      } else {
        if(!document.querySelector(".password_description__hidden")){
          document.querySelector(".password_description").classList.add("password_description__hidden")
        }
      }
    }

  function validateСonfirmPassword(){
    if(password.value != confirm_password.value) {
      confirm_password.setCustomValidity("Пароли не совпадают");
    } else {
      confirm_password.setCustomValidity('');
    }
  }
  password.onchange = validateСonfirmPassword;
  confirm_password.onkeyup = validateСonfirmPassword;



  /*


  password.onkeyup 
  password.addEventListener('click', ()=>{
    password.value
  })

*/








    button__prime.addEventListener("click", (e) => {
      //e.preventDefault();
      this.validatePassword()
      let userRegistrationData = {
        username: document.querySelector("#loginField").value,
        email: document.querySelector("#emailField").value,
        password: document.querySelector("#password").value,
        confirm_password: document.querySelector("#confirmPassword").value,
      };
      console.log("userRegistrationData", userRegistrationData);
      this.gpxiesAPI = new GpxiesAPI();
      this.gpxiesAPI.userRegistration(userRegistrationData);
    });
  }
}
const registrationPage = new RegistrationPage();
registrationPage.generateLayout();

export default RegistrationPage;
