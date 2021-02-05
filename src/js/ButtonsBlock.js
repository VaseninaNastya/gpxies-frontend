import "../css/main.css";
import create from "./utils/create.utils";
import ChooseLanguage from "./ChooseLanguage";
class ButtonsBlock {
  constructor(buttonsArr,containerClass){
    this.containerClass = containerClass
    this.buttonsArr = buttonsArr
  }
  getWordsData(){
    const chooseLanguageComponent = new ChooseLanguage();
    this.wordsArr = chooseLanguageComponent.generateWordsData();
    this.chooseLanguage = chooseLanguageComponent.determinationLanguage();
    this.wordsChooseArr = this.wordsArr[this.chooseLanguage]
  }
  generateLayout() {
    this.getWordsData()
    this.buttonsBlock_container = create('div',this.containerClass)
    this.buttonsArr.map((item)=>{
      let buttonNode = create('div', item[0],item[1])
      this.buttonsBlock_container.append(buttonNode)
    })
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
export default ButtonsBlock