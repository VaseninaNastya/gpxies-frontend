import create from "./create";
import "../css/main.css";
import Header from "./Header";
import GpxiesAPI from "./GpxiesAPI";
import Type from "./trackTypes.utils";
class LoadTrackPage {
  generateLayout() {
    this.gpxiesAPI = new GpxiesAPI();

    const loading_button = create(
      "label",
      "loading_button",
      "Выбрать файл",
      null,
      ["for", "load_track_file_input"]
    );
    this.loading_hiddenInput = create(
      "input",
      "loading_hiddenInput",
      null,
      null,
      ["type", "file"],
      ["id", "load_track_file_input"],
      ["accept", ".gpx"],
      ["name", "sampleFile"]
    );
    this.loading_trackFileName = create(
      "div",
      "loading_trackFileName loading_trackFileName__hidden"
    );
    this.button_save = create(
      "input",
      "button_save button__primary",
      "Сохранить и отправить",
      null,
      ["type", "submit"]
    );
    // this.button_upload = create(
    //   "input",
    //   "button_save button__primary",
    //   "Загрузить",
    //   null,
    //   ["type", "submit"]
    // );
    const header = new Header();
    this.button__prime = create("a", "button__primary", "Сохранить");
    this.private_checkbox = create(
      "input",
      null,
      null,
      null,
      ["type", "checkbox"],
      ["value", "1"],
      ["id", "private_checkbox"],
      ["name", "isPrivate"]
    );
    this.private_checkbox_container = create(
      "div",
      "private_checkbox_container",
      [
        this.private_checkbox,
        create("label", "private_checkbox_label", "Приватный трек", null, [
          "for",
          "private_checkbox",
        ]),
      ]
    );
    this.track_description_textarea = create(
      "textarea",
      "track_description_textarea",
      null,
      null,
      ["id", "track_description_textarea"],
      ["name", "description"]
    );
    this.sport_selector = create(
      "select",
      "sport_selector",
      [
        create("option", null, "Велосипед", null, ["value", Type.Bike], ["selected", "selected"]),
        create("option", null, "Бег", null, ["value", Type.Run]),
        create("option", null, "Ходьба", null, ["value", Type.Hike]),
      ],
      null,
      ["id", "sport_selector"],
      ["name", "type"]
    );
    this.trackName_input = create(
      "input",
      "loadTrackPage_name",
      null,
      null,
      ["placeholder", "Название трека"],
      ["type", "text"],
      ["required", "required"],
      ["id", "loadTrackPage_name"],
      ["name", "title"]
    );
    const loadTrackPage_container = create("form", "loadTrackPage_container", [
      create("h2", "loadTrackPage_title", "Загрузить новый трек"),
      create("div", "track_loading_container", [
        loading_button,
        this.loading_hiddenInput,
        this.loading_trackFileName,
      ]),
      create("div", "track_description_container", [
        this.sport_selector,
        this.trackName_input,
        this.private_checkbox_container,
      ]),
      create("div", "track_description_textarea_container", [
        create("label", "track_description_label", "Oписание трека", null, [
          "for",
          "track_description_textarea",
        ]),
        this.track_description_textarea,
      ]),
      this.button_save,
      //   this.button_upload
    ],
      null,
      // ["ref", "uploadForm"],
      ["id", "uploadForm"],
      // ["action", "http://127.0.0.1:3003/tracks/upload"],
      // ["method", "post"],
      ["encType", "multipart/form-data"]
    );

    const wraper = create("div", "loadTrackPage_wrapper", [
      header.generateLayout(),
      loadTrackPage_container,
    ]);
    this.addEventListeners();
    document.body.prepend(wraper);
  }
  addEventListeners() {
    this.loading_hiddenInput.addEventListener(
      "change",
      () => {
        console.log("this.loading_hiddenInput", this.loading_hiddenInput.value);
        const fileList = this.loading_hiddenInput.files[0];
        const fileName = fileList.name;
        this.loading_trackFileName.append(fileName);
        console.log("fileList", fileList);
        console.log("fileName", fileName);
      },
      false
    );

    this.button_save.addEventListener('click', async (event) => {
      event.preventDefault();

      const formElem = document.querySelector('.loadTrackPage_container')

      const { hashString } = await this.gpxiesAPI.uploadTrack(formElem)

      const tracksData = {
        title: this.trackName_input.value,
        type: this.sport_selector.value,
        description: this.track_description_textarea.value,
        isPrivate: this.private_checkbox.checked,
        hashString: hashString
      };

      const { result } = await this.gpxiesAPI.tracksDataUpload(tracksData);



    })

    // this.button_upload.addEventListener('click', async (event) => {
    //   event.preventDefault();


    //   // Upload file
    //   let res = await this.gpxiesAPI.uploadTrack(this.loading_hiddenInput.files[0]);
    //   console.log("res", res);

    //   let tracksData = {
    //     title: this.trackName_input.value,
    //     type: this.sport_selector.value,
    //     description: this.track_description_textarea.value,
    //     isPrivate: this.private_checkbox.checked,
    //     hashString: res.hashString
    //   };
    //   console.log(tracksData);
    //   // Add record in table
    //   // let res2 = await this.gpxiesAPI.tracksDataUpload(tracksData);
    //   // console.log("res2", res2);
    // });



  }

}

const loadTrackPage = new LoadTrackPage();
loadTrackPage.generateLayout();
export default LoadTrackPage;
