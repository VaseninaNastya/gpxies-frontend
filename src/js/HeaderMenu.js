import create from "./create";

class HeaderMenu {
  generateLayout() {
    const headerMenu_container = create("div", "headerMenu_container", [
      create("div","headerMenu_item","Загрузить трек"),
      create("div", "headerMenu_item", "Показать список моих треков"),
      create("div", "headerMenu_item logout", "Выйти"),
    ]);
    return headerMenu_container;
  }
}
export default HeaderMenu;
