import "../css/main.css";
import create from "./create.utils";
import ChooseLanguage from "./ChooseLanguage";
class TrackListPageButtonsBlock {
  getWordsData(){
    const chooseLanguageComponent = new ChooseLanguage();
    this.wordsArr = chooseLanguageComponent.generateWordsData();
    this.chooseLanguage = chooseLanguageComponent.determinationLanguage();
    this.wordsChooseArr = this.wordsArr[this.chooseLanguage]
  }
  generateLayout() {
    this.getWordsData()
    this.buttonsBlock_container = create('div',"buttonsBlock_container",[
      create('div', "track_dowload_button",`${this.wordsChooseArr.download}`),
      create('div', "track_delete_button", `${this.wordsChooseArr.delete}`),
    ])
    return  this.buttonsBlock_container
  }
  showButtonContainer() {
    this.buttonsBlock_container.classList.add(
      "buttonsBlock_container_unhidden"
    );
  }
  hideButtonContainer() {
    this.buttonsBlock_container.classList.remove(
      "buttonsBlock_container_unhidden"
    );
  }
}
export default TrackListPageButtonsBlock