import '../css/main.css';
import create from './utils/create.utils';
import ShowTrackPageHeader from './ShowTrackPageHeader';
import Footer from './Footer';
import СompleteStatictics from './СompleteStatictics';
import Header from './Header';
import WorldMap from './WorldMap';
import GpxiesAPI from './GpxiesAPI';
import ChooseLanguage from './ChooseLanguage';
import GetDate from './utils/getDate.utils';
import MessagePopup from './MessagePopup';
import BlockPageLayout from './BlockPageLayout';
import icon_spinner from '../../assets/img/icons_spinner.png';
import ButtonsBlock from './ButtonsBlock';


class ShowTrackPage {
  generateLayout() {
    this.getWordsData();
    const showTrackPageButtonsArr = [
      ['button__primary item_download', `${this.wordsChooseArr.download}`],
      ['button__primary', `${this.wordsChooseArr.createVariation}`],
      ['button__primary', `${this.wordsChooseArr.addToBookmarks}`],
      ['button__primary', `${this.wordsChooseArr.edit}`],
      ['button__primary item_delete', `${this.wordsChooseArr.delete}`],
    ];
    this.showTrackPageButtonsBlock = new ButtonsBlock(showTrackPageButtonsArr);
    this.buttonsBlock_container = this.showTrackPageButtonsBlock.generateLayout();
    console.log('this.buttonsBlock_container', this.buttonsBlock_container);
    this.loadingSpinner_img = create('img', 'icon_spinner showTrackPage_icon_spinner', null, null, ['src', icon_spinner]);
    // Get HashString from window.location
    console.log(window.location.pathname.toString());
    this.hashString = window.location.pathname.toString().slice(7, parseInt(7 + 32));
    console.log('hash', this.hashString);
    this.mode = window.location.pathname.toString().slice(parseInt(7 + 32 + 1)) || 'view';
    console.log('mode: ',this.mode);

    this.blockPageLayout = new BlockPageLayout();
    this.blockPageLayoutNode = this.blockPageLayout.generateMessageLayout();
    this.blockPageLayoutNode.append(this.loadingSpinner_img);
    this.blockPageLayoutNode.classList.remove('loadingSpinner_wrapper__hidden');
    document.body.prepend(this.blockPageLayoutNode);
    const completeStatictics = new СompleteStatictics();
    const showTrackPageHeader = new ShowTrackPageHeader();
    this.popup = new MessagePopup(
      `${this.wordsChooseArr.success_trackDelete_message}`,
      [['button_returnToTrackList', `${this.wordsChooseArr.button_returnToTrackList}`]],
      `${this.wordsChooseArr.error_trackDelete_message}`,
      [['button_backTrackPreview', `${this.wordsChooseArr.button_backTrackPreview}`]]
    );
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
    this.worldMap.setMode(this.mode);
    this.worldMap.generateLayout();
    this.gpxiesAPI = new GpxiesAPI();
    setTimeout(() => {
      this.showTrack(this.hashString);
    }, 800);
  }
  async addTracksData() {
    return (this.userTracks = await this.gpxiesAPI.getUserTracksById(localStorage.getItem('gpxiesUserId')));
  }
  getWordsData() {
    this.chooseLanguageComponent = new ChooseLanguage();
    this.wordsArr = this.chooseLanguageComponent.generateWordsData();
    this.chooseLanguage = this.chooseLanguageComponent.determinationLanguage();
    this.wordsChooseArr = this.wordsArr[this.chooseLanguage];
  }
  async showTrack(hashString) {
    let result = await this.gpxiesAPI.getTrackById(hashString);
    let userinfo = await this.gpxiesAPI.getUserInfo(result.user);
    document.title = `${result.title} - Gpxies.ru`;
    document.querySelector('.trackDescription_trackName').innerHTML = `${result.title}, `;
    document.querySelector('.trackDescription_trackLength').innerHTML =
      (result.distance / 1000).toFixed(1).toString() + ` ${this.wordsChooseArr.km}`;
    document.querySelector('.icon_header').src = `/img/icon_${result.type.toLowerCase()}.png`;
    document.querySelector('.trackDescription_authorName').innerHTML = `<a href='/user/${userinfo.username}'>${userinfo.username}</a>`;
    document.querySelector('.trackDescription_data').innerHTML = GetDate(result.created);
    if (result.isPrivate) {
      document.querySelector('.icon_private0').style.visibility = 'visible';
    }
    document.querySelectorAll('.stat_distance').forEach((item) => {
      item.innerHTML = (result.distance / 1000).toFixed(1).toString() + ` ${this.wordsChooseArr.km}`;
    });
    document.querySelectorAll('.stat_points').forEach((item) => {
      item.innerHTML = `${this.wordsChooseArr.points} ${result.points}`;
    });

    this.trackShowRes = await this.worldMap.showGpx(this.hashString);
    if (this.trackShowRes) {
      setTimeout(() => {
        this.blockPageLayoutNode.classList.add('loadingSpinner_wrapper__hidden');
        this.blockPageLayoutNode.innerHTML = '';
      }, 2000);
    }
    if (this.trackShowRes.type == 'error') {
      window.location = '/mytracks';
    }
    this.addEventListeners();
  }
  refreshLayout() {
    document.body.innerHTML = '';
    document.body.removeEventListener('keydown', this.onPress);
    this.chooseLanguage = localStorage.getItem('gpxiesChosen_language');
    this.generateLayout();
  }
  handleBodyKeypress(e) {
    let alt,
      ctrl = null;
    if (e.ctrlKey) {
      ctrl = true;
    }
    if (e.altKey) {
      alt = true;
    }
    if (e.stopPropagation) e.stopPropagation();
    if (ctrl && e.code == 'Delete') {
      this.handleEventDeleteTrack(e);
      ctrl = false;
    }
    if (ctrl && e.code == 'KeyD') {
      this.gpxiesAPI.downloadTrack(this.hashString);
      ctrl = false;
    }

    if (ctrl && e.code == 'KeyE') {
      this.chooseLanguageComponent.hotkeyChangeLanguage();
      this.refreshLayout();
      ctrl = false;
    }
  }
  addEventListeners() {
    document.querySelector('.item_download').addEventListener('click', async () => {
      this.gpxiesAPI.downloadTrack(this.hashString);
    });

    this.onPress = this.handleBodyKeypress.bind(this);
    document.body.addEventListener('keydown', this.onPress);
    document.querySelector('.language_container').addEventListener('click', () => {
      this.refreshLayout();
    });
    document.querySelector('.item_delete').addEventListener('click', () => {
      this.handleEventDeleteTrack();
    });
    document.querySelector('.loadingSpinner_wrapper').addEventListener('click', (e) => {
      if (
        Array.from(e.target.classList).includes('loadingSpinner_wrapper') ||
        Array.from(e.target.classList).includes('button_returnToTrackList')
      ) {
        window.location = '/mytracks';
      }
      if (Array.from(e.target.classList).includes('button_backTrackPreview')) {
        this.popup.hideMessages();
      }
    });
  }

  async handleEventDeleteTrack() {
    let userTracks = await this.addTracksData();
    this.blockPageLayoutNode.append(this.popup.generateMessageLayout());
    document.querySelector('.loadingSpinner_wrapper').classList.remove('loadingSpinner_wrapper__hidden');
    let tracksToDelete = [];
    const deleteId = userTracks.find((item1) => {
      return item1.hashString == this.hashString;
    }).id;
    tracksToDelete.push(deleteId);
    let result = await this.gpxiesAPI.deleteTrackById(tracksToDelete);
    if (result.ok) {
      this.popup.showSuccessMessage();
    } else {
      this.popup.showErrorMessage();
    }
  }
}

const showTrackPage = new ShowTrackPage();
showTrackPage.generateLayout();

export default ShowTrackPage;
