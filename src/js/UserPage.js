import "../css/main.css";
import create from "./utils/create.utils";
import Header from "./Header";
import Footer from "./Footer";
import Auth from "./utils/auth.utils";
import ChooseLanguage from './ChooseLanguage';

class UserPage {
  getWordsData() {
    this.chooseLanguageComponent = new ChooseLanguage();
    this.wordsArr = this.chooseLanguageComponent.generateWordsData();
    this.chooseLanguage_container = this.chooseLanguageComponent.generateLayout();
   //this.chooseLanguage_container.classList.add('language_container_login');
    this.chooseLanguage = this.chooseLanguageComponent.determinationLanguage();
    this.wordsChooseArr = this.wordsArr[this.chooseLanguage];
  }
  async generateLayout() {
    this.getWordsData();
    let auth = await new Auth().checkAuth();
    if (!auth) {
      window.location = "/login";
    }
    const footer = new Footer();
    const header = new Header();

    
    const user_info = create ("div", "user_info", [
      create("h2","user_info_name",localStorage.getItem("gpxiesUserName")),
      create("span","user_info_email",localStorage.getItem("gpxiesUserEmail"))
    ])
    const user_setting = create('div',"user_setting",[
      create('h5',null,`${this.wordsChooseArr.settings}`),
      create("div","user_setting_container",[
        create("div", "user_setting_language",[
          create('span',null,`${this.wordsChooseArr.language}`
          ),
          this.chooseLanguage_container
        ]),
        create("div", "user_setting_favTracks",[
          create('span',null,`${this.wordsChooseArr.favorites}`
          ),
          create("div","favoirites_chose_container",[
            create("div","language_item",`${this.wordsChooseArr.visibleToAll}`),
            create("div","language_item",`${this.wordsChooseArr.private}`)])
        ]),
      ] )
    ])
    const user_friends = create("div", "user_friends",[
      create('h5',null,`${this.wordsChooseArr.friends}`)
    ])
    const user_content_container = create('div',"user_content_container",[user_info, user_setting,user_friends])
    const user_container = create("div","user_container",create("div","container",[user_content_container]))
    document.body.prepend(
      create("div", "userPage_wrapper", [header.generateLayout(),user_container,footer.generateLayout()]))
  }
}
const userPage = new UserPage();
userPage.generateLayout();


export default UserPage;
