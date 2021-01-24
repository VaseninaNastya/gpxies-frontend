import create from "./create";
import tree from "../../assets/img/tree.png";

class LoadingTrackMessagePopap {
  generateMessageLayout(){
    const loadingSpinner_container = create("div", "loadingSpinner_container", [
      create("img", "loadingSpinner_img", null, null, ["src", tree]),
      this.generateSuccessLayout(),
      this.generateErrorLayout()
    ]);
    const loadingSpinner_wrapper = create(
      "div",
      "loadingSpinner_wrapper loadingSpinner_wrapper__hidden",
      loadingSpinner_container,
    );
    return loadingSpinner_wrapper
  }
  generateSuccessLayout() {
    const successMessage = create(
      "div",
      "successMessage_container successMessage_container__hidden",
      [
        create("h3", "successMessage_title", "Вы успешно загрузили трек!"),
        create(
          "div",
          "button__primary button_editTrack",
          "Редактировать загруженный трек"
        ),
        create(
          "div",
          "button__primary button_newTrack",
          "Загрузить новый трек"
        ),
      ]
    );
    return successMessage;
  }
  generateErrorLayout() {
    const errorMessage = create(
      "div",
      "errorMessage_container errorMessage_container__hidden",
      [
        create("h3", "errorMessage_title", "Во время загрузки произошла ошибка."),
        create(
          "div",
          "button__primary button_newTrack",
          "Загрузить новый трек"
        ),
      ]
    );

    return errorMessage;
  }
}
export default LoadingTrackMessagePopap;

