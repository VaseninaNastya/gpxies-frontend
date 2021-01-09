import '../css/main.css';
import create from './create';
console.log('REGISTRATION PAGE JS');
class RegistrationPage {
    generateLayout() {
        document.body.prepend(
            create("form", "registration_form", [
                create('h3', "registration_form_title", 'Вход'),
                //create('label', null, 'логин или email', null,['for',"loginField"]),
                //create('input', null, null, null, ['type',"text"],['id',"loginField"]),
                //create('label', null, 'пароль', null,['for',"password"]),
                //create('input', null, null, null, ['type',"password"],['id',"password"]),
                create('a', null, null, null, ['href', "#"]),
                create('div', "registration_form_buttoncontainer", [
                    create('a', 'button__primary', 'Войти'),
                    create('a', null, null, null, ['href', "#"])
                ])
            ])
        )
    }
}
const registrationPage = new RegistrationPage();
registrationPage.generateLayout();

export default RegistrationPage;