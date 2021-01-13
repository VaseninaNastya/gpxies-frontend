import '../css/main.css';
import create from './create';
import GpxiesAPI from "./GpxiesAPI";

class LoginPage {
     generateLayout() {
        const button__prime = create('a', 'button__primary', 'Войти');
        document.body.prepend(
            create("form", "login_form", [
                create('h3', "login_form_title", 'Вход'),
                create("div", "login_form_container",[
                    create('label', null, 'email', null,['for',"emailField"]),
                    create('input', null, null, null, ['type',"text"],['id',"emailField"]),
                    create('label', null, 'пароль', null,['for',"password"]),
                    create('input', null, null, null, ['type',"password"],['id',"password"]),
                    create('a', null, null, null, ['href', "#"]),
                ]),
                create('div', "login_form_buttoncontainer", [
                    button__prime,
                    create('a', "login_form_registrationLink", "Регистрация", null, ['href', "#"])
                ])
            ])
        )
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
}
const loginPage = new LoginPage();
loginPage.generateLayout();

export default LoginPage;