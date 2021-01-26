import create from "./create";
import "../css/main.css";
import Header from "./Header";
import GpxiesAPI from "./GpxiesAPI";
import Type from "./trackTypes.utils";
import MessagePopap from "./MessagePopap";
import icon_spinner from "../../assets/img/icons_spinner.png";



class LoadTrackPage {
  generateLayout() {
    this.gpxiesAPI = new GpxiesAPI();
    this.popup = new MessagePopap( "Вы успешно загрузили трек!", [["button_newTrack","Загрузить новый трек"],["button_editTrack","Редактировать трек"]], "Во время загрузки произошла ошибка.",[["button_newTrack","Загрузить новый трек"]]);
    this.popap_container = this.popup.generateMessageLayout();
    document.body.prepend(this.popap_container);
    this.spinner = create("img", "icon_spinner", null, null, ["src", icon_spinner])
    this.loading_button = create(
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
      ["name", "gpxFile"]
    );
    this.loading_trackFileName = create("div", "loading_trackFileName");
    this.button_save = create(
      "input",
      "button_save button__primary",
      "Отправить",
      null,
      ["type", "submit"],
      ["disabled", "disabled"]
    );
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
        create(
          "option",
          null,
          "Велосипед",
          null,
          ["value", Type.Bike],
          ["selected", "selected"]
        ),
        create("option", null, "Бег", null, ["value", Type.Run]),
        create("option", null, "Ходьба", null, ["value", Type.Hike]),
        create("option", null, "Другое", null, ["value", Type.Other]),
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
    this.loadTrackPage_title_container = create(
      "div",
      "loadTrackPage_title_container",
      [create("h2", "loadTrackPage_title", "Загрузить новый трек")]
    );
    this.loadTrackPage_form = create(
      "form",
      "loadTrackPage_form",
      [
        this.loadTrackPage_title_container,
        create("div", "track_loading_container", [
          this.loading_button,
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
      ],
      null,
      ["id", "uploadForm"],
      ["encType", "multipart/form-data"]
    );
    this.loadTrackPage_container = create("div", "loadTrackPage_container", [
      this.loadTrackPage_form,
    ]);
    const wraper = create("div", "loadTrackPage_wrapper", [
      header.generateLayout(),
      this.loadTrackPage_container,
    ]);
    this.addEventListeners();
    document.body.prepend(wraper);
  }
  addEventListeners() {
    this.loading_button.addEventListener("click",()=>{
      this.addDisabledButtonAttribute();
      this.loading_hiddenInput.value = null
      this.loading_trackFileName.innerHTML = ""
      this.loading_trackFileName.append(this.spinner);
    })
    document
      .querySelector(".loadingSpinner_wrapper")
      .addEventListener("click", (e) => {
        if (
          Array.from(e.target.classList).includes("loadingSpinner_wrapper") ||
          Array.from(e.target.classList).includes("button_newTrack")
        ) {
          this.addDisabledButtonAttribute();
          this.resetForm();
        }
      });
    this.loading_hiddenInput.addEventListener(
      "change",
      () => {
console.log("skksksksЮЮЮЮЮЮЮЮЮЮЮ>>>>>>>");
        const fileList = this.loading_hiddenInput.files[0];
        const fileName = fileList.name;
        this.loading_trackFileName.innerHTML = ""
        this.loading_trackFileName.append(create("span",null,fileName));
      },
      false
    );
    let loading_trackFileNameObserver = new MutationObserver(
      (mutationRecords) => {
        if(mutationRecords[1]){
          if(mutationRecords[1].addedNodes[0].tagName == "SPAN"){
            this.removeDisabledButtonAttribute();
          }
        }
      }
    );
    loading_trackFileNameObserver.observe(this.loading_trackFileName, {
      
      childList: true,
      addedNodes: true,
    });
    this.button_save.addEventListener("click", async (event) => {
      event.preventDefault();
      this.popap_container.classList.remove("loadingSpinner_wrapper__hidden");
      const formElem = document.querySelector(".loadTrackPage_form");
      const { hashString } = await this.gpxiesAPI.uploadTrack(formElem);
      const tracksData = {
        title: this.trackName_input.value,
        type: this.sport_selector.value,
        description: this.track_description_textarea.value,
        isPrivate: this.private_checkbox.checked,
        hashString: hashString,
      };
      const result = await this.gpxiesAPI.tracksDataUpload(tracksData);
      if (result.hashString) {
        setTimeout(this.popup.showSuccessMessage(), 300);
      } else {
        setTimeout(this.popup.showErrorMessage(), 300);
      }
    });
  }
  resetForm() {
    console.log("document.forms[0]",document.forms[0]);
    document.forms[0].reset();
    this.popup.hideMessages()
    this.loading_trackFileName.innerHTML = null;
  }
  removeDisabledButtonAttribute() {
    this.button_save.removeAttribute("disabled");
  }
  addDisabledButtonAttribute() {
    this.button_save.setAttribute("disabled","disabled");
  }
}

const loadTrackPage = new LoadTrackPage();
loadTrackPage.generateLayout();
export default LoadTrackPage;
