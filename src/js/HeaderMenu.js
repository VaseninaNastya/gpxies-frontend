import ChooseLanguage from "./ChooseLanguage";
import create from "./create";

class HeaderMenu {
  generateLayout() {
    const chooseLanguage = new ChooseLanguage()
    const chooseLanguage_container = chooseLanguage.generateLayout()
   // chooseLanguage.choiseLanguage()
    chooseLanguage_container.classList.add("headerMenu_item")
    const headerMenu_container = create("div", "headerMenu_container", [
      create("div","headerMenu_item","Загрузить трек"),
      create("div", "headerMenu_item", "Cписок моих треков"),
      create("div", "headerMenu_item logout", "Выйти"),
      chooseLanguage_container,
    ]);
    return headerMenu_container;
  }

}
export default HeaderMenu;
