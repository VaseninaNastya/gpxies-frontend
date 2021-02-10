import "../css/main.css";
import create from "./utils/create.utils";
import Header from "./Header";
import MessagePopup from "./MessagePopup";
import Footer from "./Footer";
import ChooseLanguage from "./ChooseLanguage";
import Auth from "./utils/auth.utils";
import TrackListTable from "./TrackListTable"
import BlockPageLayout from "./BlockPageLayout";

class TrackListPage {


  getWordsData() {
    this.chooseLanguageComponent = new ChooseLanguage();
    this.wordsArr = this.chooseLanguageComponent.generateWordsData();
    this.chooseLanguage = this.chooseLanguageComponent.determinationLanguage();
    this.wordsChooseArr = this.wordsArr[this.chooseLanguage];
  }
  async generateLayout() {
    let auth = await new Auth().checkAuth();
    if (!auth) {
      window.location = "/login";
    }
    this.trackHashForDelete = [];
    this.getWordsData();
    document.title = `${this.wordsChooseArr.TrackListPageTitle} - Gpxies.ru`;
    const footer = new Footer();
    this.blockPageLayout = new BlockPageLayout();
    this.popup = new MessagePopup(
      `${this.wordsChooseArr.success_trackDelete_message}`,
      [
        [
          "button_returnToTrackList",
          `${this.wordsChooseArr.button_returnToTrackList}`,
        ],
      ],
      `${this.wordsChooseArr.error_trackDelete_message}`,
      [
        [
          "button_returnToTrackList",
          `${this.wordsChooseArr.button_returnToTrackList}`,
        ],
      ]
    );
    let trackListTable = new TrackListTable(this.popup, `${this.wordsChooseArr.myTrackList}`)
    document.body.prepend(this.blockPageLayout.generateMessageLayout());
    this.popup_container = this.popup.generateMessageLayout();
    document
      .querySelector(".loadingSpinner_wrapper")
      .append(this.popup_container);
    const header = new Header();
    document.body.prepend(
      create("div", "table_wrapper", [
        header.generateLayout(),
        trackListTable.generateLayout(),
        footer.generateLayout(),
      ])
    );

   trackListTable.addEventListeners();
  }
  generatePopupLayout() {
    this.popup_container.classList.remove("loadingSpinner_wrapper__hidden");
  }
  handleBodyKeypress(e) {
    if (e.stopPropagation) e.stopPropagation();
    let ctrl = null;
    if (e.ctrlKey) {
      ctrl = true;
    }
    if (ctrl && e.code == "Delete") {
      this.handleEventDeleteTrack(e);
      ctrl = false;
    }
    if (ctrl && e.code == "KeyD") {
      this.gpxiesAPI.downloadTrack(this.hashString);
      ctrl = false;
    }
    if (ctrl && e.code == "KeyC") {
      ctrl = false;
    }
  }
  addEventListeners() {
    this.onPress = this.handleBodyKeypress.bind(this);
    document.body.addEventListener("keydown", this.onPress);
  }
}
const trackListPage = new TrackListPage();
trackListPage.generateLayout();

export default TrackListPage;
