import "../css/main.css";
import create from "./create";
import GpxiesAPI from "./GpxiesAPI";
import Header from "./Header";
import Type from "./trackTypes.utils";
import Mounth from "./mounth.utils";
import Sports from "./sportTypes.utils";
import icon_private from "../../assets/img/icons_private.png";
import SearchBar from "./SearchBar";
import FilterFromTo from "./FilterFromTo";
import TrackListPageButtonsBlock from "./TrackListPageButtonsBlock";




class TrackListPage {
  generateLayout() {
    const trackListPageButtonsBlock = new TrackListPageButtonsBlock();
    this.buttonsBlock_container = trackListPageButtonsBlock.generateLayout()
    this.addTracksData();
    const header = new Header();
    this.tableBody_container = create('div',"table_body_container")
    this.tableBody = create("div", "table_body",[this.tableBody_container]);
    const tableContainer = create("div", "table_container", [
      this.generateTableHeaderLayout(),
      this.buttonsBlock_container,
      this.tableBody,
    ]);
    document.body.prepend(
      create("div", "table_wrapper", [header.generateLayout(), tableContainer ])
    );
    this.addEventListeners();
  }
  generateTableHeaderLayout() {
    const iconsContainer = new FilterFromTo()
    /*const iconsContainerData = new FilterFromTo(this.filterFromHight,this.filterFromLow,"created")
    const iconsContainerDistance = new FilterFromTo(this.filterFromHight,this.filterFromLow,"distance")*/
    this.filter_name_icons_container = iconsContainer.generateLayout()
    this.filter_date_icons_container = iconsContainer.generateLayout()
    this.filter_distance_icons_container = iconsContainer.generateLayout()
    
    this.searchBar = new SearchBar()
    this.checkAllCheckbox = create("input", null, null, null, [
      "type",
      "checkbox",
    ]);
    this.sportChoce_select = create(
      "select",
      "sport-choce",
      [
        create("option", null, "Все", null, ["value", ""]),
        create("option", null, "Велосипед", null, ["value", Type.Bike]),
        create("option", null, "Бег", null, ["value", Type.Run]),
        create("option", null, "Ходьба", null, ["value", Type.Hike]),
        create("option", null, "Другой", null, ["value", Type.Other]),
      ],
      null,
      ["id", "sport-choce"]
    );
    this.tableHeader = create("div", "table_header_container", [
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
        this.filter_date_icons_container,
      ]),
      create("div", "table_item table_header_item_name", [
        create("div","table_header_item_name_container",[create("label", null, "Название", null, ["for", "filter_name"])])
        ,
      ]),
      create("div", "table_item table_header_item_distance", [
        create("div", null, "Дистанция, км"),
        this.filter_distance_icons_container,
      ]),
    ]);
    return this.tableHeader;
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
      this.searchBar_input = this.searchBar.generateLayout()
      document.querySelector(".table_header_item_name_container").append(this.searchBar_input)
      document.querySelector(".table_header_item_name").append( this.filter_name_icons_container)
      // TODO: Copying of arrays!
      this.tracksToShow = this.userTracks.map((x) => x);
      console.log("this.tracksToShow111", this.tracksToShow);
      // this.addTracksDistanseData();
      this.generateTableBodyLayout(this.tracksToShow);
    }
  }
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
      console.log();
      const itemPrivateHidden = `icon_private${item.isPrivate}`
      const date = this.getDate(item.created);
      const tableBodyString = create("div", "table_body_row", [
        create("div", "table_item", [
          create("input", "checkbox_item", null, null, ["type", "checkbox"],['data_checkboxhash',item.hashString]),
        ]),
        create("div", "table_item", [create("img", "icon_sports_table", null, null, ["src", Sports[item.type]])]),
        create("div", "table_item", [create("span", null, date)]),
        create(
          "div",
          "table_item table_item_name",
          [create("div", "track_name_tableItem", item.title),
          create("img", `${itemPrivateHidden}`, null, null, ["src", icon_private])],
        ),
        /*create("div", "table_item", [
          create("span", null, item.isPrivate.toString()),
        ]),*/
        create("div", "table_item", [
          create("span", null, item.distance.toString()),
        ]),
        /* create("div", "table_item table_body_item_action-list", [
          create("a", null, "Редактировать"),
          create("a", null, "Удалить"),
          create("a", null, "Cкачать GPX"),
        ]),*/
      ],null,['data_rowhash',item.hashString]);
      this.tableBody_container.append(tableBodyString);
    });
  }
  addEventListeners() {
    
    //Delete track
    document.querySelector(".track_delete_button").addEventListener("click",()=>{
      Array.from(document.querySelectorAll('.checkbox_item')).map((item)=>{
        if(item.checked){
          document.querySelector(`[data_rowhash='${item.getAttribute("data_checkboxhash")}']`).classList.add("table_body_row__hidden")
          console.log("botv", this.tracksToShow.find((item1)=>{return item1.hashString ==item.getAttribute("data_checkboxhash")}).id);
          const deleteId = this.tracksToShow.find((item1)=>{return item1.hashString ==item.getAttribute("data_checkboxhash")}).id
          this.gpxiesAPI.deleteTrackById(deleteId)
        }

      })

    })
    //Show and Hide Button Container
    this.tableBody_container.addEventListener("click",(e)=>{
      if((e.target.className == "checkbox_item")){
        console.log("работает");
        if(Array.from(document.querySelectorAll('.checkbox_item')).every(item=>!item.checked)){
          console.log("работает2");
          this.hideButtonContainer()
        }
        if(Array.from(document.querySelectorAll('.checkbox_item')).some(item=>item.checked)){
          console.log("работает1");
          this.showButtonContainer()
        }
      }
    })

    this.checkAllCheckbox.addEventListener("change", () => {
      if (this.checkAllCheckbox.checked) {
        this.choiseAll();
        this.showButtonContainer()
      } else {
        this.unchoiseAll();
        this.hideButtonContainer()
      }
    });
    this.sportChoce_select.addEventListener("change", () => {
      this.searchBar_input.value = ""
      this.unchoiseAll();
      this.checkAllCheckbox.checked = false;
      this.sportType_choisen = this.sportChoce_select.value;
      if (this.sportType_choisen) {
        this.filterBySportType();
      } else {
        this.tableBody_container.innerHTML = "";
        this.tracksToShow = this.userTracks.map((x) => x);
        this.generateTableBodyLayout(this.tracksToShow);
      }
    });

    this.filter_name_icons_container.addEventListener("click",(e)=>{
      if(e.target.className=="icon_triangle_fromHight"){
        this.filterFromHight("title") 
      }
      if(e.target.className=="icon_triangle_fromLow"){
        this.filterFromLow("title") 
      }
    })
    this.filter_date_icons_container.addEventListener("click",(e)=>{
      if(e.target.className=="icon_triangle_fromHight"){
        this.filterFromHight("created") 
      }
      if(e.target.className=="icon_triangle_fromLow"){
        this.filterFromLow("created") 
      }
    })
    this.filter_distance_icons_container.addEventListener("click",(e)=>{
      if(e.target.className=="icon_triangle_fromHight"){
        this.filterFromHight("distance") 
      }
      if(e.target.className=="icon_triangle_fromLow"){
        this.filterFromLow("distance") 
      }
    })
  }
  showButtonContainer(){
    this.buttonsBlock_container.classList.add("buttonsBlock_container_unhidden")
  }
  hideButtonContainer(){
    this.buttonsBlock_container.classList.remove("buttonsBlock_container_unhidden")
  }
  filterBySportType() {
    this.tracksToShow = [];
    this.userTracks.map((item) => {
      if (item.type == this.sportType_choisen) {
        this.tracksToShow.push(item);
      }
    });
    this.tableBody_container.innerHTML = "";
    this.generateTableBodyLayout(this.tracksToShow);
    console.log("this.userTracks", this.userTracks);
  }
  filterFromHight(parametr) {
    console.log(this.tracksToShow[0].created);

    this.tracksToShow = this.tracksToShow
      .concat()
      .sort((a, b) => (a[parametr] > b[parametr] ? 1 : -1));
      console.log("sss",this.tracksToShow[0].created);
      this.tableBody_container.innerHTML = "";
    this.generateTableBodyLayout(this.tracksToShow);
  }
  filterFromLow(parametr) {
    console.log(this.tracksToShow[0].created);
    this.tracksToShow= this.tracksToShow
      .concat()
      .sort((a, b) => (b[parametr] > a[parametr] ? 1 : -1));
      console.log("sss",this.tracksToShow[0].created);
      this.tableBody_container.innerHTML = "";
    this.generateTableBodyLayout(this.tracksToShow);
    //this.tracksToShow = this.userTracks.map((x) => x);
  }
  /*deleteChoisen(){
    const arr = []
      document
        .querySelectorAll(".checkbox_item")
        .forEach((item) =>{
          if(item.checked){

          }
        }

  }*/
}

const trackListPage = new TrackListPage();
trackListPage.generateLayout();

export default TrackListPage;
