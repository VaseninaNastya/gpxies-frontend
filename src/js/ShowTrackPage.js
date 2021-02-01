import '../css/main.css';
import create from './utils/create.utils';
import ShowTrackPageHeader from './ShowTrackPageHeader';
import Footer from './Footer';
import СompleteStatictics from './СompleteStatictics';
import Header from './Header';
import WorldMap from './WorldMap';
import GpxiesAPI from './GpxiesAPI';
import ChooseLanguage from "./ChooseLanguage";
import GetDate from './utils/getDate.utils'
class ShowTrackPage {
  generateLayout() {
    this.getWordsData();
    const hashString = window.location.pathname.toString().slice(7);

    const completeStatictics = new СompleteStatictics();
    const showTrackPageHeader = new ShowTrackPageHeader();
    const header = new Header();
    const footer = new Footer();
    const map = create('div', 'map', null, null, ['id', 'mapid']);
    document.body.prepend(
      create('div', 'showTrackPage_wrapper', [
        header.generateLayout(),
        showTrackPageHeader.generateLayout(),
        map,
        completeStatictics.generateLayout(),
        footer.generateLayout(),
      ])
    );
    this.worldMap = new WorldMap();
    this.worldMap.generateLayout();
    this.gpxiesAPI = new GpxiesAPI();
    setTimeout(() => {
      this.showTrack(hashString);
    }, 1000);
  }
  getWordsData(){
    this.chooseLanguageComponent = new ChooseLanguage();
    this.wordsArr =  this.chooseLanguageComponent.generateWordsData();
    this.chooseLanguage =  this.chooseLanguageComponent.determinationLanguage();
    this.wordsChooseArr = this.wordsArr[this.chooseLanguage]
  }
  async showTrack(hashString) {
    console.log(hashString);
    let result = await this.gpxiesAPI.getTrackById(hashString);
    let userinfo = await this.gpxiesAPI.getUserInfo(result.user);
    console.log(result);
    console.log(userinfo);
    document.title=`${result.title} - Gpxies.ru`;
    document.querySelector('.trackDescription_trackName').innerHTML = `${result.title}, `;
    document.querySelector('.trackDescription_trackLength').innerHTML = (result.distance/1000).toFixed(1).toString() + ` ${this.wordsChooseArr.km}`;
    document.querySelector('.icon_header').src = `/img/icon_${result.type.toLowerCase()}.png`;
    document.querySelector('.trackDescription_authorName').innerHTML = `<a href='/user/${userinfo.username}'>${userinfo.username}</a>`;
    document.querySelector('.trackDescription_data').innerHTML = GetDate(result.created);
    if (result.isPrivate){
      document.querySelector('.icon_private0').style.visibility="visible"
    }

    // Show track on map
    
    this.worldMap.showGpx(hashString);
    this.addEventListeners()
  }
  refreshLayout() {
    document.body.innerHTML = "";
    document.body.removeEventListener('keydown', this.onPress);
    this.chooseLanguage = localStorage.getItem("gpxiesChosen_language");
    this.generateLayout();
  }
  handleBodyKeypress(e) {
    let shift,alt = null
    if (e.stopPropagation) e.stopPropagation();
   /* if (e.code == 'Enter') {
      this.handleEventLogin(e);
    }*/
    if (e.shiftKey) {
      shift = true;
    }
    if (e.altKey) {
      alt = true;
    }
    if ((e.shiftKey && alt) || (e.altKey && shift)) {
      this.chooseLanguageComponent.hotkeyChangeLanguage();
      this.refreshLayout();
      shift = false;
      alt = false;
    }
  }
  addEventListeners() {
    this.onPress = this.handleBodyKeypress.bind(this);
    document.body.addEventListener('keydown', this.onPress);
    document
    .querySelector(".language_container")
    .addEventListener("click", () => {
      this.refreshLayout();
    });
  }
}

const showTrackPage = new ShowTrackPage();
showTrackPage.generateLayout();

export default ShowTrackPage;
