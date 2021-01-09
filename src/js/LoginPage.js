import '../css/main.css';
import create from './create';

class LoginPage {
    generateLayout() {
        document.body.prepend(
            create("form", "login_form", [
                create('h3', "login_form_title", 'Вход'),
                create("div", "login_form_container",[
                    create('label', null, 'логин или email', null,['for',"loginField"]),
                    create('input', null, null, null, ['type',"text"],['id',"loginField"]),
                    create('label', null, 'пароль', null,['for',"password"]),
                    create('input', null, null, null, ['type',"password"],['id',"password"]),
                    create('a', null, null, null, ['href', "#"]),
                ]),
                create('div', "login_form_buttoncontainer", [
                    create('a', 'button__primary', 'Войти'),
                    create('a', "login_form_registrationLink", "Регистрация", null, ['href', "#"])
                ])
            ])
        )
    }
}
const loginPage = new LoginPage();
loginPage.generateLayout();

export default LoginPage;