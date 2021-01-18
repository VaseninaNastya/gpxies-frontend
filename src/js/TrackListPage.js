import "../css/main.css";
import create from "./create";
import GpxiesAPI from "./GpxiesAPI";
import Header from "./Header";
import Type from "./trackTypes.utils";
import Mounth from "./mounth.utils";
import icon_triangle from "../../assets/img/icon_triangle.png";

class TrackListPage {
  generateLayout() {
    this.addTracksData();
    const header = new Header();
    this.tableBody = create("div", "table_body");
    const tableContainer = create("div", "table_container", [
      this.generateTableHeaderLayout(),
      this.tableBody,
    ]);
    document.body.prepend(
      create("div", "table_wrapper", [header.generateLayout(), tableContainer])
    );
    this.addEventListeners();
  }
  generateTableHeaderLayout() {
    this.checkAllCheckbox = create("input", null, null, null, [
      "type",
      "checkbox",
    ]);
    this.sportChoce_select = create(
      "select",
      "sport-choce",
      [
        create("option", null, "Все виды спорта", null, ["value", ""]),
        create("option", null, "Велосипед", null, ["value", Type.Bike]),
        create("option", null, "Бег", null, ["value", Type.Run]),
        create("option", null, "Ходьба", null, ["value", Type.Hike]),
        create("option", null, "Другой", null, ["value", Type.Other]),
      ],
      null,
      ["id", "sport-choce"]
    );
    this.filter_distance_fromHight = create(
      "img",
      "icon_triangle_fromHight",
      null,
      null,
      ["src", icon_triangle]
    );
    this.filter_distance_fromLow = create(
      "img",
      "icon_triangle_fromLow",
      null,
      null,
      ["src", icon_triangle]
    );
    this.filter_data_fromHight = create(
      "img",
      "icon_triangle_fromHight",
      null,
      null,
      ["src", icon_triangle]
    );
    this.filter_data_fromLow = create(
      "img",
      "icon_triangle_fromLow",
      null,
      null,
      ["src", icon_triangle]
    );
    const tableHeader = create("div", "table_header_container", [
      create("div", "table_item", [
        create("div", null, "Всe треки"),
        this.checkAllCheckbox,
      ]),
      create("div", "table_item table_header_item_sport-choce", [
        create("span", null, "Вид спорта"),
        this.sportChoce_select,
      ]),
      create("div", "table_item table_header_item_date", [
        create("span", null, "Дата"),
        create("div", "filter_date_icons_container", [
          this.filter_data_fromHight,
          this.filter_data_fromLow,
        ]),
      ]),
      create("div", "table_item table_header_item_name", [
        create("label", null, "Название", null, ["for", "filter_name"]),
        create(
          "input",
          null,
          null,
          null,
          ["id", "filter_name"],
          ["type", "text"]
        ),
      ]),
      create("div", "table_item", "Приватный"),
      create("div", "table_item table_header_item_distance", [
        create("div", null, "Дистанция, км"),
        create("div", "filter_distance_icons_container", [
          this.filter_distance_fromHight,
          this.filter_distance_fromLow,
        ]),
      ]),
      /* create("div", "table_item"),*/
    ]);
    return tableHeader;
  }

  choiseAll() {
    document
      .querySelectorAll(".checkbox_item")
      .forEach((item) => (item.checked = true));
  }
  unchoiseAll() {
    document
      .querySelectorAll(".checkbox_item")
      .forEach((item) => (item.checked = false));
  }
  async addTracksData() {
    this.gpxiesAPI = new GpxiesAPI();
    this.userTracks = await this.gpxiesAPI.getUserTracksById(
      localStorage.getItem("gpxiesUserId")
    );
    if (this.userTracks) {
      console.log("this.userTracks",this.userTracks);
     // this.addTracksDistanseData();
      this.generateTableBodyLayout(this.userTracks);
    }
  }
  /*addTracksDistanseData() {
    //this is a temperary method, for sorting test
    /*let distanseArr =[];
    for(let i =0; i<this.userTracks.length; i++){
      distanseArr.push(Math.ceil(Math.random()*100))
    }
    this.userTracks.map((item) => {
      return (item.distance = Math.ceil(Math.random() * 100));
    });
    console.log("distanseArr", this.userTracks);
  }*/
  getDate(date) {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const mounth = Mounth[dateObj.getMonth()];
    const dateRes = day + "." + mounth + "." + year;
    return dateRes;
  }
  generateTableBodyLayout(arr) {
    arr.map((item) => {
      console.log("item", item.distance);
      const date = this.getDate(item.created);
      const tableBodyString = create("div", "table_body_container", [
        create("div", "table_item", [
          create("input", "checkbox_item", null, null, ["type", "checkbox"]),
        ]),
        create("div", "table_item", [create("span", null, Type[item.type])]),
        create("div", "table_item", [create("span", null, date)]),
        create("div", "table_item", [create("span", null, item.title)]),
        create("div", "table_item", [
          create("span", null, item.isPrivate.toString()),
        ]),
        create("div", "table_item", [
          create("span", null, item.distance.toString()),
        ]),
        /* create("div", "table_item table_body_item_action-list", [
          create("a", null, "Редактировать"),
          create("a", null, "Удалить"),
          create("a", null, "Cкачать GPX"),
        ]),*/
      ]);
      this.tableBody.append(tableBodyString);
    });
  }
  addEventListeners() {
    document.querySelectorAll(".checkbox_item").forEach(
      (item) => {
        item.addEventListener("change", (e) => {
          e.preventDefault();
          if (e.target.checked) {
            e.target.checked = true;
          } else {
            e.target.checked = false;
          }
          //console.log(e.target);
        });
      }
    );
    this.checkAllCheckbox.addEventListener("change", () => {
      if (this.checkAllCheckbox.checked) {
        this.choiseAll();
      } else {
        this.unchoiseAll();
      }
    });

    this.sportChoce_select.addEventListener("change", () => {
      this.unchoiseAll();
      this.checkAllCheckbox.checked = false;
      this.sportType_choisen = this.sportChoce_select.value;
      if (this.sportType_choisen) {
        this.filterBySportType();
      } else {
        this.tableBody.innerHTML = "";
        this.generateTableBodyLayout(this.userTracks);
      }
    });
    this.filter_data_fromHight.addEventListener("click", () => {this.filterFromHight("created")})
    this.filter_data_fromLow.addEventListener("click", () => {this.filterFromLow("created")})
    this.filter_distance_fromHight.addEventListener("click", () => {this.filterFromHight("distance")})
    this.filter_distance_fromLow.addEventListener("click", () => {this.filterFromLow("distance")})
  }
  filterBySportType() {
    this.userChoisenSportTracks = [];
    this.userTracks.map((item) => {
      if (item.type == this.sportType_choisen) {
        this.userChoisenSportTracks.push(item);
      }
    });
    this.tableBody.innerHTML = "";
    this.generateTableBodyLayout(this.userChoisenSportTracks);
    console.log("this.userTracks", this.userTracks);
  }
  filterFromHight(parametr) {
    //this.userfilterByDistanseTracks =[]
    this.userTracks = this.userTracks.concat().sort((a, b) => (a[parametr] > b[parametr] ? 1 : -1));
    console.log("s",this.userTracks);
    this.tableBody.innerHTML = "";
    this.generateTableBodyLayout(this.userTracks);
  }
  filterFromLow(parametr) {
    this.userTracks = this.userTracks.concat().sort((a, b) => (b[parametr] > a[parametr] ? 1 : -1));
    console.log("s",this.userTracks);
    this.tableBody.innerHTML = "";
        this.generateTableBodyLayout(this.userTracks);
  }
}

const trackListPage = new TrackListPage();
trackListPage.generateLayout();

export default TrackListPage;
