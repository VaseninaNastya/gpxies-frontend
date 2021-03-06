import create from "./utils/create.utils";
// import icon_walk from "../../assets/img/icon_walk.png";
import icon_private from "../../assets/img/icons_private.png";
import icon_like from "../../assets/img/icon_like.svg";
import icon_unlike from "../../assets/img/icon_unlike.svg";
import ChooseLanguage from "./ChooseLanguage";
import ButtonsBlock from "./ButtonsBlock";
class ShowTrackPageHeader {
  getWordsData() {
    const chooseLanguageComponent = new ChooseLanguage();
    this.wordsArr = chooseLanguageComponent.generateWordsData();
    this.chooseLanguage_container = chooseLanguageComponent.generateLayout();
    this.chooseLanguage_container.classList.add("language_container_login");
    this.chooseLanguage = chooseLanguageComponent.determinationLanguage();
    this.wordsChooseArr = this.wordsArr[this.chooseLanguage];
  }
  generateLayout(mode = "view") {
    this.getWordsData();
    let showTrackPageButtonsArr = [];
    if (mode === "view") {
      showTrackPageButtonsArr = [
        ["trackDescription_menu_item item_download", `${this.wordsChooseArr.download}`],
        ["trackDescription_menu_item", `${this.wordsChooseArr.createVariation}`],
        //["trackDescription_menu_item", `${this.wordsChooseArr.addToBookmarks}`],
        ["trackDescription_menu_item item_edit", `${this.wordsChooseArr.edit}`],
        ["trackDescription_menu_item item_delete", `${this.wordsChooseArr.delete}`],
      ];
    } else if (mode === "edit") {
      showTrackPageButtonsArr = [
        ["trackDescription_menu_item item_save", `${this.wordsChooseArr.save}`],
        ["trackDescription_menu_item item_revert", `${this.wordsChooseArr.revert}`],
        ["trackDescription_menu_item item_saveAs", `${this.wordsChooseArr.saveAs}`],
      ];
    }

    this.showTrackPageButtonsBlock = new ButtonsBlock(showTrackPageButtonsArr, "trackDescription_menu");
    this.buttonsBlock_container = this.showTrackPageButtonsBlock.generateLayout();
    console.log("this.buttonsBlock_container", this.buttonsBlock_container);
    const statisticsSmall = create("ul", "trackDescription_statistic", [
      create("h5", null, `${this.wordsChooseArr.statistics}`),
      create("li", "trackDescription_statistic_item stat_distance", ""),
      create("li", "trackDescription_statistic_item stat_points", ""),
    ]);

    const headerContainer = create("div", "showTrack_header", [
      create("div", "container", [
        create("div", "trackDescription_container", [
          create("div", "trackDescription", [
            create("h2", "trackDescription_title__primary", [
              create("img", "icon_header", null, null, ["src", ""]),
              create("span", "trackDescription_trackName", ""),
              create("span", "trackDescription_trackLength", ""),
              create("img", "icon_private0", null, null, ["src", icon_private], ["title", "Приватный"]),
              create("div", "icon_like_container", [
                /* create(
                    "img",
                    "icon_like",
                    null,
                    null,
                    ["src", icon_like],
                    ["title", "В 'избранном'"]
                  ),*/
                create("img", "icon_like", null, null, ["src", icon_unlike], ["title", `${this.wordsChooseArr.addToFavorites}`]),
              ]),
            ]),
            create("div", "trackDescription_title__secondary", [
              create("div", "trackDescription_authorName_container", [
                create("span", null, `${this.wordsChooseArr.author}: `),
                create("span", "trackDescription_authorName"),
              ]),
              create("div", "trackDescription_data_container", [
                create("span", null, `${this.wordsChooseArr.uploaded}: `),
                create("span", "trackDescription_data"),
              ]),
            ]),
          ]),
          this.buttonsBlock_container,
        ]),
        statisticsSmall,
      ]),
    ]);
    return headerContainer;
  }
}
export default ShowTrackPageHeader;
