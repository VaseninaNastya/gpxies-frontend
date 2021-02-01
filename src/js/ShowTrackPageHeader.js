import create from "./utils/create.utils";
// import icon_walk from "../../assets/img/icon_walk.png";
import icon_private from "../../assets/img/icons_private.png";
import ChooseLanguage from "./ChooseLanguage";
class ShowTrackPageHeader {
  getWordsData() {
    const chooseLanguageComponent = new ChooseLanguage();
    this.wordsArr = chooseLanguageComponent.generateWordsData();
    this.chooseLanguage_container = chooseLanguageComponent.generateLayout();
    this.chooseLanguage_container.classList.add("language_container_login");
    this.chooseLanguage = chooseLanguageComponent.determinationLanguage();
    this.wordsChooseArr = this.wordsArr[this.chooseLanguage];
  }
  generateLayout() {
    this.getWordsData();
    const menu = create("ul", "trackDescription_menu", [
      create(
        "li",
        "trackDescription_menu_item item_download",
        `${this.wordsChooseArr.download}`
      ),
      create(
        "li",
        "trackDescription_menu_item",
        `${this.wordsChooseArr.createVariation}`
      ),
      /*create(
        "li",
        "trackDescription_menu_item",
        `${this.wordsChooseArr.addToBookmarks}`
      ),*/
      create("li", "trackDescription_menu_item", `${this.wordsChooseArr.edit}`),
      create(
        "li",
        "trackDescription_menu_item item_delete",
        `${this.wordsChooseArr.delete}`
      ),
    ]);
    const statisticsSmall = create("ul", "trackDescription_statistic", [
      create("h5", null, `${this.wordsChooseArr.statistics}`),
      create("li", "trackDescription_statistic_item", ""),
      create("li", "trackDescription_statistic_item", ""),
      create("li", "trackDescription_statistic_item", ""),
    ]);
    const headerContainer = create("div", "showTrack_header", [
      create("div","container",[
        create("div", "trackDescription_container",[
          create("div", "trackDescription", [
            create("h2", "trackDescription_title__primary", [
              create("img", "icon_header", null, null, ["src", ""]),
              create("span", "trackDescription_trackName", ""),
              create("span", "trackDescription_trackLength", ""),
              create(
                "img",
                "icon_private0",
                null,
                null,
                ["src", icon_private],
                ["title", "Трек приватный"]
              ),
            ]),
            create("div", "trackDescription_title__secondary", [
              create("div", "trackDescription_authorName_container", [
                create("span", null, `${this.wordsChooseArr.author}: `),
                create("span", "trackDescription_authorName"),
              ]),
              create("div", "trackDescription_data_container", [
                create("span", null, `${this.wordsChooseArr.uploaded}: `),
                create("span", "trackDescription_data")]),
            ]),
          ]),
          menu
        ]),
        statisticsSmall,
      ])
    ]);
    return headerContainer;
  }
}
export default ShowTrackPageHeader;
