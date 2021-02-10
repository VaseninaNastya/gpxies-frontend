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

class TrackListTableBody {
  constructor(arr) {
    this.arr = arr
  }

  getWordsData() {
    this.chooseLanguageComponent = new ChooseLanguage();
    this.wordsArr = this.chooseLanguageComponent.generateWordsData();
    this.chooseLanguage = this.chooseLanguageComponent.determinationLanguage();
    this.wordsChooseArr = this.wordsArr[this.chooseLanguage];
  }
  generateTableBodyLayout() {
    this.getWordsData() 
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
      document.querySelector(".table_body_container").append(tableBodyString);
    });
  }

}



export default TrackListTableBody;
