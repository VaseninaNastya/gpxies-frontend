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
}
export default TrackListPageButtonsBlock