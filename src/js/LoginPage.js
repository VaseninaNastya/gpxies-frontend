import '../css/main.css';
import create from './create';
import GpxiesAPI from "./GpxiesAPI";

class LoginPage {
     generateLayout() {
        
        const button__prime = create('a', 'button__primary', 'Войти');
        this.email_input =  create('input', null, null, null, ['type',"text"],['id',"emailField"]);
        this.password_input = create('input', null, null, null, ['type',"password"],['id',"password"]);
        this.login_form_registrationPageLink =  create('div', "login_form_registrationLink", "Регистрация")
        document.body.prepend(
            create("form", "login_form", [
                create('h3', "login_form_title", 'Вход'),
                create("div", "login_form_container",[
                    create('label', null, 'email', null,['for',"emailField"]),
                    this.email_input,
                    create('label', null, 'пароль', null,['for',"password"]),
                    this.password_input,
                    create('a', null, null, null, ['href', "#"]),
                ]),
                create('div', "login_form_buttoncontainer", [
                    button__prime,
                    this.login_form_registrationPageLink
                ])
            ])
        )
        this.checkRegistration()
        this.addRegistrationPageLinkEventListener()
        button__prime.addEventListener("click",  async (e)=>{
            e.preventDefault();
            let userLogin = {
                email : document.querySelector("#emailField").value,
                password : document.querySelector("#password").value,
            }
            console.log("userLogin", userLogin);
            this.gpxiesAPI = new GpxiesAPI();
            let res = await this.gpxiesAPI.userLogin(userLogin)
            localStorage.setItem('token',res.token)
        })
    }
    addRegistrationPageLinkEventListener(){
        this.login_form_registrationPageLink.addEventListener("click", ()=>{
            this.redirectToRegistrationPage()
          }
          )
    }
    redirectToRegistrationPage(){
        window.location = "registrationPage.html";
    }
    checkRegistration(){
        if(localStorage.getItem("email")){
            this.email_input.value = localStorage.getItem("email");
            localStorage.removeItem("email")
        }
        if(localStorage.getItem("password")){
            this.password_input.value = localStorage.getItem("password")
           localStorage.removeItem("password")
        }
    }
}
const loginPage = new LoginPage();
loginPage.generateLayout();

export default LoginPage;