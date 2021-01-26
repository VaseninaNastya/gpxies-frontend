import create from "./create";
import icon_walk from "../../assets/img/icon_walk.png";
import icon_run from "../../assets/img/icon_run.png";
import icon_bike from "../../assets/img/icon_bike.png";
class ShowTrackPageHeader {
  generateLayout() {
    const menu = create("ul","trackDescription_menu",[
      create("li", "trackDescription_menu_item", "Скачать"),
      create("li", "trackDescription_menu_item", "Создать вариант"),
      create("li", "trackDescription_menu_item", "Добавить в закладки"),
      create("li", "trackDescription_menu_item", "Редактировать"),
      create("li", "trackDescription_menu_item", "Удалить")
    ])
    const statisticsSmall = create('ul',"trackDescription_statistic",[
      create("h4", null, "статистика"),
      create("li", "trackDescription_statistic_item", "407 км"),
      create("li", "trackDescription_statistic_item", "4000 точек"),
      create("li", "trackDescription_statistic_item", "25 wpt")
    ])
    const headerContainer = create("div", "container",[
      create("div","trackDescription",[
        create("h2", "trackDescription_title__primary",[
          create('img',"icon_header",null,null,["src", icon_walk]),
          create('span', "trackDescription_trackName","Название трека, "),
          create("span", "trackDescription_trackLength","407 км"),
          
        ]),
        create('h4', "trackDescription_title__secondary", [
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
    const header = create("div","showTrack_header",headerContainer);
    return header
  }
}
export default ShowTrackPageHeader;
