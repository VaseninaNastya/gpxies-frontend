import ChooseLanguage from "./ChooseLanguage";
import create from "./utils/create.utils";


class HeaderMenu {
  getWordsData(){
    const chooseLanguageComponent = new ChooseLanguage();
    this.wordsArr = chooseLanguageComponent.generateWordsData();
    this.chooseLanguage_container = chooseLanguageComponent.generateLayout();
    this.chooseLanguage_container.classList.add("headerMenu_item")
    this.chooseLanguage = chooseLanguageComponent.determinationLanguage();
    this.wordsChooseArr = this.wordsArr[this.chooseLanguage]
  }
  generateLayout() {
    this.getWordsData()
    const headerMenu_container = create("div", "headerMenu_container", [
      create("div","headerMenu_item myPage",`${this.wordsChooseArr.myPage}`),
      create("div","headerMenu_item uploadTrack",`${this.wordsChooseArr.uploadTrack}`),
      create("div", "headerMenu_item trackList", `${this.wordsChooseArr.trackList}`),
      create("div", "headerMenu_item favoritesTracks", `${this.wordsChooseArr.favorites}`),
      create("div", "headerMenu_item logout", `${this.wordsChooseArr.logout}`),
      //this.chooseLanguage_container,
    ]);
    return headerMenu_container;
  }
}
export default HeaderMenu;
