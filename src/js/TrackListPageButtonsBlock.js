import "../css/main.css";
import create from "./create";
class TrackListPageButtonsBlock {
  generateLayout() {
    this.buttonsBlock_container = create('div',"buttonsBlock_container",[
      create('div', "track_dowload_button", "скачать"),
      create('div', "track_delete_button", "удалить"),
    ])
    return  this.buttonsBlock_container
  }
  showButtonContainer() {
    this.buttonsBlock_container.classList.add(
      "buttonsBlock_container_unhidden"
    );
  }
  hideButtonContainer() {
    this.buttonsBlock_container.classList.remove(
      "buttonsBlock_container_unhidden"
    );
  }
}
export default TrackListPageButtonsBlock