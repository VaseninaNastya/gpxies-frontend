import "../css/main.css";
import create from "./utils/create.utils";
import Type from "./utils/trackTypes.utils";
import SearchBar from "./SearchBar";
import FilterFromTo from "./FilterFromTo";
import ChooseLanguage from "./ChooseLanguage";
import ButtonsBlock from "./ButtonsBlock";
import GpxiesAPI from "./GpxiesAPI";
import TrackListTableBody from "./TrackListTableBody"

class TrackListTable {
constructor(popup,tableTitle){
  this.popup = popup,
  this.tableTitle = tableTitle
}




  getWordsData() {
    this.chooseLanguageComponent = new ChooseLanguage();
    this.wordsArr = this.chooseLanguageComponent.generateWordsData();
    this.chooseLanguage = this.chooseLanguageComponent.determinationLanguage();
    this.wordsChooseArr = this.wordsArr[this.chooseLanguage];
  }
  generateLayout() {
    this.getWordsData()
    this.addTracksData();
    const trackListPageButtonsArr = [
      ["track_download_button", `${this.wordsChooseArr.download}`],
      ["track_delete_button", `${this.wordsChooseArr.delete}`]
    ];
    this.trackListPageButtonsBlock = new ButtonsBlock(trackListPageButtonsArr,"buttonsBlock_container");
    this.buttonsBlock_container = this.trackListPageButtonsBlock.generateLayout();
    this.trackHashForDelete = [];
    this.getWordsData();
    this.tableBody_container = create("div", "table_body_container");
    const tableContainer = create("div", "table_container", [
      create('h3',"tableTitle",this.tableTitle),
      this.generateTableHeaderLayout(),
      this.buttonsBlock_container,
      this.tableBody_container,
    ]);
    return tableContainer
  }
  async addTracksData() {
    this.gpxiesAPI = new GpxiesAPI();
    this.userTracks = await this.gpxiesAPI.getUserTracksById(
      localStorage.getItem("gpxiesUserId")
    );
    if (this.userTracks) {
      this.tracksToShow = this.userTracks.map((x) => x);
      this.tableBody = new TrackListTableBody(this.tracksToShow)
      this.tableBody.generateTableBodyLayout();
    }
  }
  generateTableHeaderLayout() {
    this.iconsContainerName = new FilterFromTo("filter_name");
    this.iconsContainerDate = new FilterFromTo("filter_date");
    this.iconsContainerDistance = new FilterFromTo("filter_distance");
    this.searchBar = new SearchBar();
    this.searchBar_input =this.searchBar.generateLayout()
    this.checkAllCheckbox = create("input", null, null, null, [
      "type",
      "checkbox",
    ]);
    this.sportChoce_select = create(
      "select",
      "sport-choce",
      [
        create("option", null, `${this.wordsChooseArr.all}`, null, [
          "value",
          "",
        ]),
        create("option", null, `${this.wordsChooseArr.bike}`, null, [
          "value",
          Type.Bike,
        ]),
        create("option", null, `${this.wordsChooseArr.run}`, null, [
          "value",
          Type.Run,
        ]),
        create("option", null, `${this.wordsChooseArr.hike}`, null, [
          "value",
          Type.Hike,
        ]),
        create("option", null, `${this.wordsChooseArr.other}`, null, [
          "value",
          Type.Other,
        ]),
      ],
      null,
      ["id", "sport-choce"]
    );
    this.table_item_checkAllCheckbox = create("div", "table_item table_item_checkAllCheckbox", [
      create("div", null, `${this.wordsChooseArr.allTracks}`),
      this.checkAllCheckbox,
    ]);
    this.tableHeader = create("div", "table_header_container", [
      this.table_item_checkAllCheckbox,
      create("div", "table_item table_header_item_sport-choce", [
        create("span", null, `${this.wordsChooseArr.typeOfSport}`),
        this.sportChoce_select,
      ]),
      create("div", "table_item table_header_item_date", [
        create("span", null, `${this.wordsChooseArr.date}`),
        this.iconsContainerDate.generateLayout(),
      ]),
      create("div", "table_item table_header_item_name", [
        create("div", "table_header_item_name_container", [
          create("label", null, `${this.wordsChooseArr.title}`, null, [
            "for",
            "filter_name",
          ]),
        ]),
        this.searchBar_input,
        this.iconsContainerName.generateLayout()
      ]),
      create("div", "table_item table_header_item_distance", [
        create("div", null, `${this.wordsChooseArr.distance}`),
        this.iconsContainerDistance.generateLayout(),
      ]),
    ]);
    return this.tableHeader;
  }
  addEventListeners() {
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

    document.querySelector(".table_body_container").addEventListener("click", (e) => {
      if (Array.from(e.target.classList).includes("table_item_checkbox")) {

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
        this.tableBody = new TrackListTableBody(this.tracksToShow)
        this.tableBody_container.innerHTML =''
        this.tableBody.generateTableBodyLayout();

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
    document
    .querySelector(".track_delete_button")
    .addEventListener("click", () => {
      this.handleEventDeleteTrack();
    });
  document
    .querySelector(".track_download_button")
    .addEventListener("click", () => {
      this.handleEventDownloadTrack();
    });
  }
  
  async handleEventDeleteTrack() {
    const checkedItems = Array.from(
      document.querySelectorAll(".checkbox_item")
    ).map((item) => {
      if (item.checked) {
        return true;
      } else {
        return false;
      }
    });
    if (checkedItems.includes(true)) {
      document
        .querySelector(".loadingSpinner_wrapper")
        .classList.remove("loadingSpinner_wrapper__hidden");
      let tracksToDelete = [];
      Array.from(document.querySelectorAll(".checkbox_item")).map((item) => {
        if (item.checked) {
          document
            .querySelector(
              `[data_rowhash='${item.getAttribute("data_checkboxhash")}']`
            )
            .classList.add("table_body_row__hidden");
          const deleteId = this.tracksToShow.find((item1) => {
            return item1.hashString == item.getAttribute("data_checkboxhash");
          }).id;
          tracksToDelete.push(deleteId);
          console.log("this.userTracks.", this.userTracks);
          console.log("deleteId",deleteId);
          console.log(this.userTracks.findIndex((item)=>item.id == deleteId));
          this.userTracks.splice(this.userTracks.findIndex((item)=>item.id == deleteId),1);
        }
      });
      let result = await this.gpxiesAPI.deleteTrackById(tracksToDelete);
      
      if (result.ok) {
        this.popup.showSuccessMessage();
      } else {
        this.popup.showErrorMessage();
      }
      this.trackListPageButtonsBlock.hideButtonContainer();
    }
  }
  async handleEventDownloadTrack() {
    const checkedItems = Array.from(
      document.querySelectorAll(".checkbox_item")
    ).map((item) => {
      if (item.checked) {
        return true;
      } else {
        return false;
      }
    });
    if (checkedItems.includes(true)) {
      let tracksToDownload = [];
      Array.from(document.querySelectorAll(".checkbox_item")).map((item) => {
        if (item.checked) {
          const downloadHash = this.tracksToShow.find((item1) => {
            return item1.hashString == item.getAttribute("data_checkboxhash");
          }).hashString;

          tracksToDownload.push(downloadHash);
        }
      });
      tracksToDownload.forEach(async (item) => {
        console.log(item);
        let res = await this.gpxiesAPI.downloadTrack(item);
        console.log(res);
      });
      this.trackListPageButtonsBlock.hideButtonContainer();
    }
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
    refreshLayout() {
    document.body.innerHTML = "";
    document.body.removeEventListener("keydown", this.onPress);
    this.chooseLanguage = localStorage.getItem("gpxiesChosen_language");
    this.generateLayout();
  }
  chooseAll() {
    document
      .querySelectorAll(".checkbox_item")
      .forEach((item) => (item.checked = true));
  }
  unchooseAll() {
    console.log("unchooseAll()");
    document
      .querySelectorAll(".checkbox_item")
      .forEach((item) => (item.checked = false));
  }
  filterBySportType() {
    this.tracksToShow = [];
    this.userTracks.map((item) => {
      if (item.type == this.sportType_chosen) {
        this.tracksToShow.push(item);
      }
    });
    this.tableBody_container.innerHTML = "";
    this.tableBody = new TrackListTableBody(this.tracksToShow)
    this.tableBody.generateTableBodyLayout();
  }
  filterFromHight(parametr) {
    this.tracksToShow = this.tracksToShow
      .concat()
      .sort((a, b) => (a[parametr] > b[parametr] ? 1 : -1));
    this.tableBody_container.innerHTML = "";
    this.tableBody = new TrackListTableBody(this.tracksToShow)
    this.tableBody.generateTableBodyLayout();
  }
  filterFromLow(parametr) {
    this.tracksToShow = this.tracksToShow
      .concat()
      .sort((a, b) => (b[parametr] > a[parametr] ? 1 : -1));
    console.log("sss", this.tracksToShow[0].created);
    this.tableBody_container.innerHTML = "";
    this.tableBody = new TrackListTableBody(this.tracksToShow)
    this.tableBody.generateTableBodyLayout();

    //this.tracksToShow = this.userTracks.map((x) => x);
  }
}



export default TrackListTable;
