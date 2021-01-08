import create from "./create";
class Header {
  generateLayout() {
    const menu = create("ul","trackDescription_menu",[
      create("li", "trackDescription_menu_item", "Скачать"),
      create("li", "trackDescription_menu_item", "Создать вариант"),
      create("li", "trackDescription_menu_item", "Добавить в закладки"),
      create("li", "trackDescription_menu_item", "Редактировать"),
      create("li", "trackDescription_menu_item", "Удалить")
    ])
    const statisticsSmall = create('ul',"trackDescription_statistic",[
      create("h3", null, "статистика"),
      create("li", "trackDescription_statistic_item", "407 км"),
      create("li", "trackDescription_statistic_item", "4000 точек"),
      create("li", "trackDescription_statistic_item", "25 wpt")
    ])
    const headerContainer = create("div", "container",[
      create("div","trackDescription",[
        create("h1", "trackDescription_title__primary",[
          create('span', "trackDescription_trackName","Название трека, "),
          create("span", "trackDescription_trackLength","407 км")
        ]),
        create('h3', "trackDescription_title__secondary", [
          create("span", "trackDescription_authorName",[
            "aвтор: ",
            "authorName. "
          ]),
          create("span", "trackDescription_data",[
            "дата: ",
            "2005.01.25"
          ])
        ])
      ]),
      menu,
      statisticsSmall
    ]);
    const header = create("header",null,headerContainer);
    return header
  }
}
export default Header;
