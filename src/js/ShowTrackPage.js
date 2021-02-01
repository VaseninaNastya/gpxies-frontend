import "../css/main.css";
import create from "./utils/create.utils";
import ShowTrackPageHeader from "./ShowTrackPageHeader";
import Footer from "./Footer";
import СompleteStatictics from "./СompleteStatictics";
import Header from "./Header";
import WorldMap from "./WorldMap";
import GpxiesAPI from "./GpxiesAPI";
import ChooseLanguage from "./ChooseLanguage";
import GetDate from "./utils/getDate.utils";
import MessagePopup from "./MessagePopup";
import BlockPageLayout from "./BlockPageLayout";
import icon_spinner from "../../assets/img/icons_spinner.png";

class ShowTrackPage {
  generateLayout() {
    this.getWordsData();
    this.loadingSpinner_img = create(
      "img",
      "icon_spinner showTrackPage_icon_spinner",
      null,
      null,
      ["src", icon_spinner]
    );
    this.hashString = window.location.pathname.toString().slice(7);
    this.blockPageLayout = new BlockPageLayout();
    this.blockPageLayoutNode = this.blockPageLayout.generateMessageLayout();
    this.blockPageLayoutNode.append(this.loadingSpinner_img);
    this.blockPageLayoutNode.classList.remove("loadingSpinner_wrapper__hidden");
    document.body.prepend(this.blockPageLayoutNode);
    const completeStatictics = new СompleteStatictics();
    const showTrackPageHeader = new ShowTrackPageHeader();
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
          "button_backTrackPreview",
          `${this.wordsChooseArr.button_backTrackPreview}`,
        ],
      ]
    );
    const header = new Header();
    const footer = new Footer();
    const map = create("div", "map", null, null, ["id", "mapid"]);
    document.body.prepend(
      create("div", "showTrackPage_wrapper", [
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
      this.showTrack(this.hashString);
    }, 800);
  }
  async addTracksData() {
   return this.userTracks = await this.gpxiesAPI.getUserTracksById(localStorage.getItem('gpxiesUserId'));
  }
  getWordsData() {
    this.chooseLanguageComponent = new ChooseLanguage();
    this.wordsArr = this.chooseLanguageComponent.generateWordsData();
    this.chooseLanguage = this.chooseLanguageComponent.determinationLanguage();
    this.wordsChooseArr = this.wordsArr[this.chooseLanguage];
  }
  async showTrack(hashString) {
    //console.log(hashString);
    let result = await this.gpxiesAPI.getTrackById(hashString);
    let userinfo = await this.gpxiesAPI.getUserInfo(result.user);
    // console.log(result);
    //console.log(userinfo);
    document.title = `${result.title} - Gpxies.ru`;
    document.querySelector(
      ".trackDescription_trackName"
    ).innerHTML = `${result.title}, `;
    document.querySelector(".trackDescription_trackLength").innerHTML =
      (result.distance / 1000).toFixed(1).toString() +
      ` ${this.wordsChooseArr.km}`;
    document.querySelector(
      ".icon_header"
    ).src = `/img/icon_${result.type.toLowerCase()}.png`;
    document.querySelector(
      ".trackDescription_authorName"
    ).innerHTML = `<a href='/user/${userinfo.username}'>${userinfo.username}</a>`;
    document.querySelector(".trackDescription_data").innerHTML = GetDate(
      result.created
    );
    if (result.isPrivate) {
      document.querySelector(".icon_private0").style.visibility = "visible";
    }
    console.log(document.querySelector(".item_download"));
   

    // Show track on map

    //this.worldMap.showGpx(hashString);
    this.trackShowRes = await this.worldMap.showGpx(this.hashString);
    if (this.trackShowRes) {
      setTimeout(() => {
        this.blockPageLayoutNode.classList.add(
          "loadingSpinner_wrapper__hidden"
        );
        this.blockPageLayoutNode.innerHTML = "";
      }, 2000);
    } 
    if (this.trackShowRes.type ==  "error") {
      window.location = '/mytracks'
    }
    console.log("this.worldMap.showGpx(hashString);", this.trackShowRes);
    this.addEventListeners();
  }
  refreshLayout() {
    document.body.innerHTML = "";
    document.body.removeEventListener("keydown", this.onPress);
    this.chooseLanguage = localStorage.getItem("gpxiesChosen_language");
    this.generateLayout();
  }
  handleBodyKeypress(e) {
    let shift,
      alt = null;
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
    document
    .querySelector(".item_download")
    .addEventListener("click", async () => {
      // console.log(hashString);
      this.gpxiesAPI.downloadTrack(this.hashString);
    });

    this.onPress = this.handleBodyKeypress.bind(this);
    document.body.addEventListener("keydown", this.onPress);
    document
      .querySelector(".language_container")
      .addEventListener("click", () => {
        this.refreshLayout();
      });
    document
      .querySelector(".item_delete")
      .addEventListener("click",  () => {
         console.log(this.hashString);
        this.handleEventDeleteTrack();
      });
      document.querySelector('.loadingSpinner_wrapper').addEventListener('click', (e) => {
        if (
          Array.from(e.target.classList).includes('loadingSpinner_wrapper') ||
          Array.from(e.target.classList).includes('button_returnToTrackList')
        ) {
          window.location = '/mytracks'
        }
        if(Array.from(e.target.classList).includes('button_backTrackPreview')){
          this.popup.hideMessages();
        }
      });
  }
  
  async handleEventDeleteTrack() {
    let userTracks = await this.addTracksData()
    console.log("userTracks",userTracks);
    /*const checkedItems = Array.from(document.querySelectorAll('.checkbox_item')).map((item) => {
      if (item.checked) {
        return true;
      } else {
        return false;
      }
    });*/
    //if (checkedItems.includes(true)) {
      this.blockPageLayoutNode.append(this.popup.generateMessageLayout())
      document.querySelector(".loadingSpinner_wrapper").classList.remove('loadingSpinner_wrapper__hidden');
      let tracksToDelete = [];
      //Array.from(document.querySelectorAll('.checkbox_item')).map((item) => {
        //if (item.checked) {
          //document.querySelector(`[data_rowhash='${item.getAttribute('data_checkboxhash')}']`).classList.add('table_body_row__hidden');
          console.log(
            'botv',
            this.hashString
          );
          const deleteId = userTracks.find((item1) => {
            return item1.hashString == this.hashString;
          }).id;
          tracksToDelete.push(deleteId);
        //}
     // });
      console.log("tracksToDelete",tracksToDelete);
      let result = await this.gpxiesAPI.deleteTrackById(tracksToDelete);
      if (result.ok) {
        console.log("трек удален");
        this.popup.showSuccessMessage();
        // this.tracksToShow.filter((track)=>{
        //  if ( track.id in tracksToDelete ) {
        //    document.querySelector('')
        //  }
        // })
      } else {
        console.log("ошибка");
        this.popup.showErrorMessage();
      }
    //}*/
  }
}

const showTrackPage = new ShowTrackPage();
showTrackPage.generateLayout();

export default ShowTrackPage;
