import "../css/main.css";
import create from "./utils/create.utils";
import Type from "./utils/trackTypes.utils";
import SearchBar from "./SearchBar";
import FilterFromTo from "./FilterFromTo";
import ChooseLanguage from "./ChooseLanguage";
import ButtonsBlock from "./ButtonsBlock";

class TrackListTable {


  getWordsData() {
    this.chooseLanguageComponent = new ChooseLanguage();
    this.wordsArr = this.chooseLanguageComponent.generateWordsData();
    this.chooseLanguage = this.chooseLanguageComponent.determinationLanguage();
    this.wordsChooseArr = this.wordsArr[this.chooseLanguage];
  }
  generateLayout() {
    this.getWordsData()
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
      this.generateTableHeaderLayout(),
      this.buttonsBlock_container,
      this.tableBody_container,
    ]);
    return tableContainer
  }
  generateTableHeaderLayout() {
    const iconsContainer = new FilterFromTo();
    this.filter_name_icons_container = iconsContainer.generateLayout();
    this.filter_date_icons_container = iconsContainer.generateLayout();
    this.filter_distance_icons_container = iconsContainer.generateLayout();
    this.searchBar = new SearchBar();
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
    this.table_item_checkAllCheckbox = create("div", "table_item", [
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
        this.filter_date_icons_container,
      ]),
      create("div", "table_item table_header_item_name", [
        create("div", "table_header_item_name_container", [
          create("label", null, `${this.wordsChooseArr.title}`, null, [
            "for",
            "filter_name",
          ]),
        ]),
      ]),
      create("div", "table_item table_header_item_distance", [
        create("div", null, `${this.wordsChooseArr.distance}`),
        this.filter_distance_icons_container,
      ]),
    ]);
    return this.tableHeader;
  }
}



export default TrackListTable;
