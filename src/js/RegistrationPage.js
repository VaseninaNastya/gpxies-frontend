import '../css/main.css';
import create from './create';
import GpxiesAPI from "./GpxiesAPI";

class RegistrationPage {
    generateLayout() {
        const button__prime = create('a', 'button__primary', 'Зарегистрироваться');
        document.body.prepend(
            create("form", "registration_form", [
                create('h3', "registration_form_title", 'Регистрация'),
                create("div", "registration_form_container",[
                create('label', null, 'логин', null,['for',"loginField"]),
                create('input', null, null, null, ['type',"text"],['id',"loginField"]),
                create('label', null, 'email', null,['for',"emailField"]),
                create('input', null, null, null, ['type',"email"],['id',"emailField"]),
                create('label', null, 'пароль', null,['for',"password"]),
                create('input', null, null, null, ['type',"password"],['id',"password"]), 
                create('label', null, 'подтвердите пароль', null,['for',"confirmPassword"]),
                create('input', null, null, null, ['type',"password"],['id',"confirmPassword"]),                     
                create('a', null, null, null, ['href', "#"]),
                ]),
                create('div', "registration_form_buttoncontainer", [
                    button__prime,
                    create('a', "registration_form_loginLink", "Вход", null, ['href', "#"])
                ])
            ])
        )
        button__prime.addEventListener("click", (e)=>{
            e.preventDefault();





            let userRegistrationData = {
                username : document.querySelector("#loginField").value,
                email : document.querySelector("#emailField").value,
                password : document.querySelector("#password").value,
                confirm_password: document.querySelector("#confirmPassword").value,
            }
            console.log("userRegistrationData", userRegistrationData);
            this.gpxiesAPI = new GpxiesAPI();
            this.gpxiesAPI.userRegistration(userRegistrationData);
        })
    }
    registrationUser(){

    }
}
const registrationPage = new RegistrationPage();
registrationPage.generateLayout();

export default RegistrationPage;