import "../css/main.css";
import create from "./utils/create.utils";

import Header from "./Header";
import Type from "./utils/trackTypes.utils";
import Sports from "./utils/sportTypes.utils";
import icon_private from "../../assets/img/icons_private.png";
import SearchBar from "./SearchBar";
import FilterFromTo from "./FilterFromTo";
import ButtonsBlock from "./ButtonsBlock";
import MessagePopup from "./MessagePopup";
import SportsNames from "./utils/sportsTypesNames.utils.js";
import Footer from "./Footer";
import ChooseLanguage from "./ChooseLanguage";
import Auth from "./utils/auth.utils";
import TrackListTable from "./TrackListTable"
import GetDate from "./utils/getDate.utils";
import BlockPageLayout from "./BlockPageLayout";

class TrackListPage {
  constructor() {}

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
    let trackListTable = new TrackListTable(this.popup)
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
      console.log("работаут");
      ctrl = false;
    }
  }
  addEventListeners() {
    this.onPress = this.handleBodyKeypress.bind(this);
    document.body.addEventListener("keydown", this.onPress);
    /*document
      .querySelector(".language_container")
      .addEventListener("click", () => {
        this.refreshLayout();
      });*/
    document
      .querySelector(".loadingSpinner_wrapper")
      .addEventListener("click", (e) => {
        if (
          Array.from(e.target.classList).includes("loadingSpinner_wrapper") ||
          Array.from(e.target.classList).includes("button_returnToTrackList")
        ) {
          this.unchooseAll();
          this.checkAllCheckbox.checked = false;
          this.popup.hideMessages();
        }
      });

    //Show and Hide Button Container
    document.querySelector(".table_body_container").addEventListener("click", (e) => {
      if (Array.from(e.target.classList).includes("table_item_checkbox")) {
        //console.log("e.target", e.target.querySelector(".checkbox_item").checked);

        e.target.querySelector(
          ".checkbox_item"
        ).checked = !e.target.querySelector(".checkbox_item").checked;
      }
      // if (e.target.className == "checkbox_item") {
      if (
        Array.from(document.querySelectorAll(".checkbox_item")).every(
          (item) => !item.checked
        )
      ) {
        this.trackListPageButtonsBlock.hideButtonContainer();
      }
      if (
        Array.from(document.querySelectorAll(".checkbox_item")).some(
          (item) => item.checked
        )
      ) {
        this.trackListPageButtonsBlock.showButtonContainer();
      }
      //}
    });

    //Chose and unchose all.
    document.querySelector(".table_item_checkAllCheckbox").addEventListener("click", (e) =>
      this.chooseUnchooseAll(e)
    );
    document.querySelector(".sport-choce").addEventListener("change", () => {
      this.searchBar_input.value = "";
      this.unchooseAll();
      this.checkAllCheckbox.checked = false;
      this.sportType_chosen = this.sportChoce_select.value;
      if (this.sportType_chosen) {
        this.filterBySportType();
      } else {
        this.tableBody_container.innerHTML = "";
        this.tracksToShow = this.userTracks.map((x) => x);
        this.generateTableBodyLayout(this.tracksToShow);
      }
    });

    document.querySelector(".filter_name").addEventListener("click", (e) => {
      if (e.target.className == "icon_triangle_fromHight") {
        this.filterFromHight("title");
      }
      if (e.target.className == "icon_triangle_fromLow") {
        this.filterFromLow("title");
      }
    });
    document.querySelector(".filter_date").addEventListener("click", (e) => {
      if (e.target.className == "icon_triangle_fromHight") {
        this.filterFromHight("created");
      }
      if (e.target.className == "icon_triangle_fromLow") {
        this.filterFromLow("created");
      }
    });
    document.querySelector(".filter_distance").addEventListener("click", (e) => {
      if (e.target.className == "icon_triangle_fromHight") {
        this.filterFromHight("distance");
      }
      if (e.target.className == "icon_triangle_fromLow") {
        this.filterFromLow("distance");
      }
    });
  }
  chooseUnchooseAll(e) {
    if (e.target.tagName == "INPUT") {
      this.checkAllCheckbox.checked = !this.checkAllCheckbox.checked;
    }
    if (this.checkAllCheckbox.checked) {
      this.checkAllCheckbox.checked = false;
      this.unchooseAll();
      this.trackListPageButtonsBlock.hideButtonContainer();
    } else {
      this.checkAllCheckbox.checked = true;
      this.chooseAll();
      this.trackListPageButtonsBlock.showButtonContainer();
    }
  }

  filterFromHight(parametr) {
    this.tracksToShow = this.tracksToShow
      .concat()
      .sort((a, b) => (a[parametr] > b[parametr] ? 1 : -1));
    this.tableBody_container.innerHTML = "";
    this.generateTableBodyLayout(this.tracksToShow);
  }
  filterFromLow(parametr) {
    this.tracksToShow = this.tracksToShow
      .concat()
      .sort((a, b) => (b[parametr] > a[parametr] ? 1 : -1));
    console.log("sss", this.tracksToShow[0].created);
    this.tableBody_container.innerHTML = "";

    this.generateTableBodyLayout(this.tracksToShow);
    //this.tracksToShow = this.userTracks.map((x) => x);
  }
}

const trackListPage = new TrackListPage();
trackListPage.generateLayout();

export default TrackListPage;
