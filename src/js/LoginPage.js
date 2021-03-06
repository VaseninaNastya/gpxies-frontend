import '../css/main.css';
import ChooseLanguage from './ChooseLanguage';
import create from './utils/create.utils';
import GpxiesAPI from './GpxiesAPI';
import MessagePopup from './MessagePopup';
import Footer from './Footer';
import Auth from './utils/auth.utils';

class LoginPage {
  constructor() {}
  getWordsData() {
    this.chooseLanguageComponent = new ChooseLanguage();
    this.wordsArr = this.chooseLanguageComponent.generateWordsData();
    this.chooseLanguage_container = this.chooseLanguageComponent.generateLayout();
    this.chooseLanguage_container.classList.add('language_container_login');
    this.chooseLanguage = this.chooseLanguageComponent.determinationLanguage();
    this.wordsChooseArr = this.wordsArr[this.chooseLanguage];
  }
  async generateLayout() {
    const auth = await new Auth().checkAuth();
    if (auth) {
      window.location = '/mytracks';
    }

    const footer = new Footer();
    this.getWordsData();
    document.title = `${this.wordsChooseArr.LoginPageTitle} - Gpxies.ru`;
    this.button__prime = create('div', 'button__primary', `${this.wordsChooseArr.login}`);
    this.error_description = create('div', 'error_description error_description_hidden', `${this.wordsChooseArr.login_error_description}`);
    this.email_input = create('input', null, null, null, ['type', 'text'], ['id', 'emailField'], ['required', 'required']);
    this.password_input = create('input', null, null, null, ['type', 'password'], ['id', 'password'], ['required', 'required']);
    this.login_form_registrationPageLink = create('div', 'login_form_registrationLink', `${this.wordsChooseArr.registration}`);
    this.login_form_container = create('div', 'login_form_container', [
      create('label', null, 'email', null, ['for', 'emailField']),
      this.email_input,
      this.error_description,
      create('label', 'login_form_password', `${this.wordsChooseArr.password}`, null, ['for', 'password']),
      this.password_input,
      create('a', null, null, null, ['href', '#']),
    ]);
    this.login_form = create('form', 'login_form', [
      create('h3', 'login_form_title', `${this.wordsChooseArr.enter}`),
      this.login_form_container,
      create('div', 'login_form_buttoncontainer', [this.button__prime, this.login_form_registrationPageLink]),
      this.chooseLanguage_container,
    ]);
    const wrapper = create('div', 'login_wrapper wrapper', [this.login_form, footer.generateLayout()]);
    document.body.prepend(wrapper);
    this.checkRegistration();
    this.addEventListeners();
  }
  refreshLayout() {
    document.body.innerHTML = '';
    document.body.removeEventListener('keydown', this.onPress);
    this.chooseLanguage = localStorage.getItem('gpxiesChosen_language');
    this.generateLayout();
  }
  async handleEventLogin(e) {
    e.preventDefault();
    let userData = {
      email: document.querySelector('#emailField').value,
      password: document.querySelector('#password').value,
    };
    this.gpxiesAPI = new GpxiesAPI();
    let res = await this.gpxiesAPI.userLogin(userData);
    console.log('res', res);
    if (res.type == 'error') {
      this.error_description.classList.remove('error_description_hidden');
    } else {
      this.error_description.classList.add('error_description_hidden');
    }
    if (res.token) {
      console.log("res",res);
      localStorage.setItem('gpxiesUserName', res.username);
      localStorage.setItem('gpxiesUserEmail', res.email);
      localStorage.setItem('gpxiesToken', res.token);
      localStorage.setItem('gpxiesUserId', res.id);
     this.redirectToTrackListPage();
    }
  }
  handleBodyKeypress(e) {
    if (e.stopPropagation) e.stopPropagation();
    let alt,
      ctrl = null;

    if (e.ctrlKey) {
      ctrl = true;
    }

    if (e.altKey) {
      alt = true;
    }

    if (ctrl && e.code == 'Enter') {
      this.handleEventLogin(e);
      ctrl = false;
    }
    if (ctrl && e.code == 'KeyE') {
      this.chooseLanguageComponent.hotkeyChangeLanguage();
      this.refreshLayout();
      ctrl = false;
    }
  }
  addEventListeners() {
    this.onPress = this.handleBodyKeypress.bind(this);
    document.body.addEventListener('keydown', this.onPress);
    this.button__prime.addEventListener('click', (e) => this.handleEventLogin(e));
    this.login_form_registrationPageLink.addEventListener('click', () => {
      this.redirectToRegistrationPage();
    });
    document.querySelector('.language_container').addEventListener('click', () => {
      this.refreshLayout();
    });
  }
  redirectToTrackListPage() {
    window.location = '/mytracks';
  }
  redirectToRegistrationPage() {
    window.location = '/registration';
  }
  checkRegistration() {
    const registrationMessage = new MessagePopup(
      `${this.wordsChooseArr.success_registration_message}`,
      null,
      `${this.wordsChooseArr.error_registration_message}`,
      null
    );
    const registrationSuccessMessageNode = registrationMessage.generateSuccessLayout();
    registrationSuccessMessageNode.classList.remove('successMessage_container', 'successMessage_container__hidden');
    registrationSuccessMessageNode.classList.add('registrationMessage_container');
    if (localStorage.getItem('gpxiesEmail')) {
      this.login_form_container.prepend(registrationSuccessMessageNode);
      this.email_input.value = localStorage.getItem('gpxiesEmail');
      localStorage.removeItem('gpxiesEmail');
    }
    if (localStorage.getItem('gpxiesPassword')) {
      this.password_input.value = localStorage.getItem('gpxiesPassword');
      localStorage.removeItem('gpxiesPassword');
    }
  }
}
const loginPage = new LoginPage();
loginPage.generateLayout();

export default LoginPage;
