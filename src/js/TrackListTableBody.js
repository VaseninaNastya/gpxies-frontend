import "../css/main.css";
import create from "./utils/create.utils";
import Type from "./utils/trackTypes.utils";
import Sports from "./utils/sportTypes.utils";
import icon_private from "../../assets/img/icons_private.png";
import SearchBar from "./SearchBar";
import FilterFromTo from "./FilterFromTo";
import SportsNames from "./utils/sportsTypesNames.utils.js";
import ChooseLanguage from "./ChooseLanguage";
import GetDate from "./utils/getDate.utils";

class TrackListPage {
  constructor(arr) {
    this.arr = arr
  }

  getWordsData() {
    this.chooseLanguageComponent = new ChooseLanguage();
    this.wordsArr = this.chooseLanguageComponent.generateWordsData();
    this.chooseLanguage = this.chooseLanguageComponent.determinationLanguage();
    this.wordsChooseArr = this.wordsArr[this.chooseLanguage];
  }
  async generateLayout() {
    this.trackHashForDelete = [];
    this.getWordsData();
    this.addTracksData();
    this.tableBody_container = create("div", "table_body_container");
    const tableContainer = create("div", "table_container", [
      this.generateTableHeaderLayout(),
      this.tableBody_container,
    ]);
    this.generateTableBodyLayout()
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
  generateTableBodyLayout() {
    if ( this.arr.length == 0) {
      document.querySelector(
        ".table_body_container"
      ).textContent = `${this.wordsChooseArr.noTracks}`;
      document.querySelector(".table_body_container").classList.add("notracks");
    } else {
      document.querySelector(".table_body_container").textContent = "";
      document
        .querySelector(".table_body_container")
        .classList.remove("notracks");
    }
    this.arr.map((item) => {
      console.log(item);
      const itemPrivateHidden = `icon_private${item.isPrivate}`;
      const date = GetDate(item.created);
      const tableBodyString = create(
        "div",
        "table_body_row",
        [
          create("div", "table_item table_item_checkbox", [
            create(
              "input",
              "checkbox_item",
              null,
              null,
              ["type", "checkbox"],
              ["data_checkboxhash", item.hashString]
            ),
          ]),
          create("div", "table_item", [
            create(
              "img",
              "icon_sports_table",
              null,
              null,
              ["src", Sports[item.type]],
              ["alt", SportsNames[item.type]]
            ),
          ]),
          create("div", "table_item", [create("span", null, date)]),
          create("div", "table_item table_item_name", [
            create(
              "div",
              "track_name_tableItem",
              create("a", null, item.title, null, [
                "href",
                "/track/" + item.hashString,
              ])
            ),
            create(
              "img",
              `${itemPrivateHidden}`,
              null,
              null,
              ["src", icon_private],
              ["alt", "приватный"]
            ),
          ]),
          create("div", "table_item", [
            create(
              "span",
              null,
              (item.distance / 1000).toFixed(1).toString() +
                ` ${this.wordsChooseArr.km}`
            ),
          ]),
        ],
        null,
        ["data_rowhash", item.hashString]
      );
      this.tableBody_container.append(tableBodyString);
    });
  }
}



export default TrackListPage;
