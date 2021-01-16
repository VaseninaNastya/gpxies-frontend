import create from "./create";
import "../css/main.css";
import Header from "./Header";
class LoadTrackPage {
  generateLayout() {
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
      /*["accept", "image/*,image/jpeg"]*/
      ["accept", ".gpx"]
    );
    this.loading_trackFileName = create(
      "div",
      "loading_trackFileName loading_trackFileName__hidden"
    );
    const button_save = create(
      "div",
      "button_save button__primary",
      "Сохранить"
    );
    const header = new Header();
    this.button__prime = create("a", "button__primary", "Сохранить");
    const private_checkbox_container = create(
      "div",
      "private_checkbox_container",
      [
        create(
          "input",
          null,
          null,
          null,
          ["type", "checkbox"],
          ["value", "1"],
          ["id", "private_checkbox"]
        ),
        create("label", "private_checkbox_label", "Приватный трек", null, [
          "for",
          "private_checkbox",
        ]),
      ]
    );

    const sport_selector = create(
      "select",
      "sport_selector",
      [
        create(
          "option",
          null,
          "Велосипед",
          null,
          ["value", "1"],
          ["id", "cycling"],
          ["selected", "selected"]
        ),
        create("option", null, "Бег", null, ["value", "2"], ["id", "runing"]),
        create(
          "option",
          null,
          "Ходьба",
          null,
          ["value", "3"],
          ["id", "walking"]
        ),
      ],
      null,
      ["id", "sport_selector"]
    );
    const trackName_input = create(
      "input",
      "loadTrackPage_name",
      null,
      null,
      ["placeholder", "Название трека"],
      ["type", "text"]
    );
    const loadTrackPage_container = create("div", "loadTrackPage_container", [
      create("h2", "loadTrackPage_title", "Загрузить новый трек"),
      create("div", "track_loading_container", [
        loading_button,
        this.loading_hiddenInput,
        this.loading_trackFileName,
      ]),
      create("div", "track_description_container", [
        sport_selector,
        trackName_input,
        private_checkbox_container,
      ]),
      create("div", "track_description_textarea_container", [
        create("label", "track_description_label", "Oписание трека", null, [
          "for",
          "track_description_textarea",
        ]),
        create(
          "textarea",
          "track_description_textarea",
          null,
          null,
          /*["type", "textarea"],*/
          ["id", "track_description_textarea"]
        ),
      ]),
      button_save,
    ]);
    const wraper = create("div", "loadTrackPage_wrapper", [
      header.generateLayout(),
      loadTrackPage_container,
    ]);
    this.addLoadingButtonEventListener();
    document.body.prepend(wraper);
  }
  addLoadingButtonEventListener() {
    /*<input type="file" onchange="showFile(this)">

<script>
function showFile(input) {
  let file = input.files[0];

  alert(`File name: ${file.name}`); // например, my.png
  alert(`Last modified: ${file.lastModified}`); // например, 1552830408824
}
</script>
*/
    this.loading_hiddenInput.addEventListener(
      "change",
      () => {
        const fileList = this.loading_hiddenInput.files[0];
        const fileName = fileList.name;
        this.loading_trackFileName.append(fileName);
        console.log("fileList", fileList);
        console.log("fileName", fileName);
      },
      false
    );
  }
}

const loadTrackPage = new LoadTrackPage();
loadTrackPage.generateLayout();
export default LoadTrackPage;
