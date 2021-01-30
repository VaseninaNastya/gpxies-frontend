import ChooseLanguage from "./ChooseLanguage";
import create from "./create.utils";


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
      create("div","headerMenu_item downloadTrack",`${this.wordsChooseArr.downloadTrack}`),
      create("div", "headerMenu_item trackList", `${this.wordsChooseArr.trackList}`),
      create("div", "headerMenu_item logout", `${this.wordsChooseArr.logout}`),
      this.chooseLanguage_container,
    ]);
    return headerMenu_container;
  }
}
export default HeaderMenu;
