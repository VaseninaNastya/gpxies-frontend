import '../css/main.css';
import create from './create';
import GpxiesAPI from './GpxiesAPI';
import Header from './Header';
import Type from './trackTypes.utils';
import Mounth from './mounth.utils';
import Sports from './sportTypes.utils';
import icon_private from '../../assets/img/icons_private.png';
import SearchBar from './SearchBar';
import FilterFromTo from './FilterFromTo';
import TrackListPageButtonsBlock from './TrackListPageButtonsBlock';
import MessagePopap from './MessagePopap';
import SportsNames from './sportsTypesNames.utils.js';
import Footer from "./Footer";
import ChooseLanguage from "./ChooseLanguage";

class TrackListPage {
  constructor() {
    this.trackHashForDelete = [];
  }
  getWordsData(){
    const chooseLanguageComponent = new ChooseLanguage();
    this.wordsArr = chooseLanguageComponent.denerateWordsData();
    //this.chooseLanguage_container = chooseLanguageComponent.generateLayout();
   // this.chooseLanguage_container.classList.add("language_container_login");
    this.chooseLanguage = chooseLanguageComponent.determinationLanguage();
    this.wordsChooseArr = this.wordsArr[this.chooseLanguage]
  }
  generateLayout() {
    this.getWordsData()
    const footer = new Footer();
    this.popup = new MessagePopap(
      `${this.wordsChooseArr[0].success_trackDelete_message}`,
      [['button_returnToTrackList', `${this.wordsChooseArr[0].button_returnToTrackList}`]],
      `${this.wordsChooseArr[0].error_trackDelete_message}`,
      [['button_returnToTrackList', `${this.wordsChooseArr[0].button_returnToTrackList}`]]
    );
    this.popap_container = this.popup.generateMessageLayout();
    document.body.prepend(this.popap_container);
    this.trackListPageButtonsBlock = new TrackListPageButtonsBlock();
    this.buttonsBlock_container = this.trackListPageButtonsBlock.generateLayout();
    this.addTracksData();
    const header = new Header();
    this.tableBody_container = create('div', 'table_body_container');
    this.tableBody = create('div', 'table_body', [this.tableBody_container]);
    const tableContainer = create('div', 'table_container', [
      this.generateTableHeaderLayout(),
      this.buttonsBlock_container,
      this.tableBody,
    ]);
    document.body.prepend(
      create('div', 'table_wrapper', [header.generateLayout(), tableContainer, footer.generateLayout()])
    );
    this.addEventListeners();
  }
  generatePopapLayout() {
    this.popap_container.classList.remove('loadingSpinner_wrapper__hidden');
  }
  generateTableHeaderLayout() {
    const iconsContainer = new FilterFromTo();
    this.filter_name_icons_container = iconsContainer.generateLayout();
    this.filter_date_icons_container = iconsContainer.generateLayout();
    this.filter_distance_icons_container = iconsContainer.generateLayout();
    this.searchBar = new SearchBar();
    this.checkAllCheckbox = create('input', null, null, null, [
      'type',
      'checkbox',
    ]);
    this.sportChoce_select = create(
      'select',
      'sport-choce',
      [
        create('option', null,  `${this.wordsChooseArr[0].all}`, null, ['value', '']),
        create('option', null,  `${this.wordsChooseArr[0].bike}`, null, ['value', Type.Bike]),
        create('option', null,  `${this.wordsChooseArr[0].run}`, null, ['value', Type.Run]),
        create('option', null,  `${this.wordsChooseArr[0].hike}`, null, ['value', Type.Hike]),
        create('option', null,  `${this.wordsChooseArr[0].other}`, null, ['value', Type.Other]),
      ],
      null,
      ['id', 'sport-choce']
    );
    this.table_item_checkAllCheckbox = create('div', 'table_item', [
      create('div', null, `${this.wordsChooseArr[0].allTracks}`),
      this.checkAllCheckbox,
    ]);
    this.tableHeader = create('div', 'table_header_container', [
      this.table_item_checkAllCheckbox,
      create('div', 'table_item table_header_item_sport-choce', [
        create('span', null, `${this.wordsChooseArr[0].typeOfSport}`),
        this.sportChoce_select,
      ]),
      create('div', 'table_item table_header_item_date', [
        create('span', null, `${this.wordsChooseArr[0].date}`),
        this.filter_date_icons_container,
      ]),
      create('div', 'table_item table_header_item_name', [
        create('div', 'table_header_item_name_container', [
          create('label', null, `${this.wordsChooseArr[0].title}`, null, ['for', 'filter_name']),
        ]),
      ]),
      create('div', 'table_item table_header_item_distance', [
        
        create('div', null, `${this.wordsChooseArr[0].distance}`),
        this.filter_distance_icons_container,
      ]),
    ]);
    return this.tableHeader;
  }
  refreshLayout() {
    document.body.innerHTML = "";
    this.chooseLanguage = localStorage.getItem("gpxiesChoosen_language");
    this.generateLayout();
  }
  choiseAll() {
    document
      .querySelectorAll('.checkbox_item')
      .forEach((item) => (item.checked = true));
  }
  unchoiseAll() {
    document
      .querySelectorAll('.checkbox_item')
      .forEach((item) => (item.checked = false));
  }
  async addTracksData() {
    this.gpxiesAPI = new GpxiesAPI();
    this.userTracks = await this.gpxiesAPI.getUserTracksById(
      localStorage.getItem('gpxiesUserId')
    );
    if (this.userTracks) {
      this.searchBar_input = this.searchBar.generateLayout();
      document
        .querySelector('.table_header_item_name_container')
        .append(this.searchBar_input);
      document
        .querySelector('.table_header_item_name')
        .append(this.filter_name_icons_container);
      // TODO: Copying of arrays!
      this.tracksToShow = this.userTracks.map((x) => x);
      console.log('this.tracksToShow111', this.tracksToShow);
      // this.addTracksDistanseData();
      this.generateTableBodyLayout(this.tracksToShow);
    }
  }
  getDate(date) {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const mounth = Mounth[dateObj.getMonth()];
    const dateRes = day + '.' + mounth + '.' + year;
    return dateRes;
  }
  generateTableBodyLayout(arr) {
    arr.map((item) => {
      const itemPrivateHidden = `icon_private${item.isPrivate}`;
      const date = this.getDate(item.created);
      const tableBodyString = create(
        'div',
        'table_body_row',
        [
          create('div', 'table_item table_item_checkbox', [
            create(
              'input',
              'checkbox_item',
              null,
              null,
              ['type', 'checkbox'],
              ['data_checkboxhash', item.hashString]
            ),
          ]),
          create('div', 'table_item', [
            create(
              'img',
              'icon_sports_table',
              null,
              null,
              ['src', Sports[item.type]],
              ['alt', SportsNames[item.type]]
            ),
          ]),
          create('div', 'table_item', [create('span', null, date)]),
          create('div', 'table_item table_item_name', [
            create(
              'div',
              'track_name_tableItem',
              create('a', null, item.title, null, [
                'href',
                '/track/' + item.hashString,
              ])
            ),
            create(
              'img',
              `${itemPrivateHidden}`,
              null,
              null,
              ['src', icon_private],
              ['alt', 'приватный']
            ),
          ]),
          /*create("div", "table_item", [
          create("span", null, item.isPrivate.toString()),
        ]),*/
          create('div', 'table_item', [
            create('span', null, item.distance.toString()),
          ]),
          /* create("div", "table_item table_body_item_action-list", [
          create("a", null, "Редактировать"),
          create("a", null, "Удалить"),
          create("a", null, "Cкачать GPX"),
        ]),*/
        ],
        null,
        ['data_rowhash', item.hashString]
      );
      this.tableBody_container.append(tableBodyString);

    });
  }
  addEventListeners() {
    document
      .querySelector(".language_container")
      .addEventListener("click", () => {
        this.refreshLayout();
      });
    document
      .querySelector('.loadingSpinner_wrapper')
      .addEventListener('click', (e) => {
        if (
          Array.from(e.target.classList).includes('loadingSpinner_wrapper') ||
          Array.from(e.target.classList).includes('button_returnToTrackList')
        ) {
          this.unchoiseAll();
          this.checkAllCheckbox.checked = false;
          this.popup.hideMessages();
        }
      });
    document
      .querySelector('.track_delete_button')
      .addEventListener('click', () => {
        this.popap_container.classList.remove('loadingSpinner_wrapper__hidden');
        Array.from(document.querySelectorAll('.checkbox_item')).map(
          async (item) => {
            if (item.checked) {
              document
                .querySelector(
                  `[data_rowhash='${item.getAttribute('data_checkboxhash')}']`
                )
                .classList.add('table_body_row__hidden');
              console.log(
                'botv',
                this.tracksToShow.find((item1) => {
                  return (
                    item1.hashString == item.getAttribute('data_checkboxhash')
                  );
                }).id
              );
              const deleteId = this.tracksToShow.find((item1) => {
                return (
                  item1.hashString == item.getAttribute('data_checkboxhash')
                );
              }).id;
              let result = await this.gpxiesAPI.deleteTrackById(deleteId);
              if (result.ok) {
                this.popup.showSuccessMessage();
              } else {
                this.popup.showErrorMessage();
              }
            }
          }
        );
        this.trackListPageButtonsBlock.hideButtonContainer();
      });
    //Show and Hide Button Container
    this.tableBody_container.addEventListener('click', (e) => {
      if (Array.from(e.target.classList).includes('table_item_checkbox')) {
        //console.log("e.target", e.target.querySelector(".checkbox_item").checked);
        e.target.querySelector(
          '.checkbox_item'
        ).checked = !e.target.querySelector('.checkbox_item').checked;
      }
      // if (e.target.className == "checkbox_item") {
      if (
        Array.from(document.querySelectorAll('.checkbox_item')).every(
          (item) => !item.checked
        )
      ) {
        this.trackListPageButtonsBlock.hideButtonContainer();
      }
      if (
        Array.from(document.querySelectorAll('.checkbox_item')).some(
          (item) => item.checked
        )
      ) {
        this.trackListPageButtonsBlock.showButtonContainer();
      }
      //}
    });
    //Chose and unchose all.
    this.table_item_checkAllCheckbox.addEventListener('click', (e) => {
      if (e.target.tagName == 'INPUT') {
        this.checkAllCheckbox.checked = !this.checkAllCheckbox.checked;
      }
      if (this.checkAllCheckbox.checked) {
        this.checkAllCheckbox.checked = false;
        this.unchoiseAll();
        this.trackListPageButtonsBlock.hideButtonContainer();
      } else {
        this.checkAllCheckbox.checked = true;
        this.choiseAll();
        this.trackListPageButtonsBlock.showButtonContainer();
      }
    });
    this.sportChoce_select.addEventListener('change', () => {
      this.searchBar_input.value = '';
      this.unchoiseAll();
      this.checkAllCheckbox.checked = false;
      this.sportType_choisen = this.sportChoce_select.value;
      if (this.sportType_choisen) {
        this.filterBySportType();
      } else {
        this.tableBody_container.innerHTML = '';
        this.tracksToShow = this.userTracks.map((x) => x);
        this.generateTableBodyLayout(this.tracksToShow);
      }
    });
    this.filter_name_icons_container.addEventListener('click', (e) => {
      if (e.target.className == 'icon_triangle_fromHight') {
        this.filterFromHight('title');
      }
      if (e.target.className == 'icon_triangle_fromLow') {
        this.filterFromLow('title');
      }
    });
    this.filter_date_icons_container.addEventListener('click', (e) => {
      if (e.target.className == 'icon_triangle_fromHight') {
        this.filterFromHight('created');
      }
      if (e.target.className == 'icon_triangle_fromLow') {
        this.filterFromLow('created');
      }
    });
    this.filter_distance_icons_container.addEventListener('click', (e) => {
      if (e.target.className == 'icon_triangle_fromHight') {
        this.filterFromHight('distance');
      }
      if (e.target.className == 'icon_triangle_fromLow') {
        this.filterFromLow('distance');
      }
    });
  }
  filterBySportType() {
    this.tracksToShow = [];
    this.userTracks.map((item) => {
      if (item.type == this.sportType_choisen) {
        this.tracksToShow.push(item);
      }
    });
    this.tableBody_container.innerHTML = '';
    this.generateTableBodyLayout(this.tracksToShow);
  }
  filterFromHight(parametr) {
    this.tracksToShow = this.tracksToShow
      .concat()
      .sort((a, b) => (a[parametr] > b[parametr] ? 1 : -1));
    this.tableBody_container.innerHTML = '';
    this.generateTableBodyLayout(this.tracksToShow);
  }
  filterFromLow(parametr) {
    this.tracksToShow = this.tracksToShow
      .concat()
      .sort((a, b) => (b[parametr] > a[parametr] ? 1 : -1));
    console.log('sss', this.tracksToShow[0].created);
    this.tableBody_container.innerHTML = '';
    this.generateTableBodyLayout(this.tracksToShow);
    //this.tracksToShow = this.userTracks.map((x) => x);
  }
}

const trackListPage = new TrackListPage();
trackListPage.generateLayout();

export default TrackListPage;
