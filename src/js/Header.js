import create from "./utils/create.utils";
import icon_triangle from "../../assets/img/icon_triangle.png";
import HeaderMenu from "./HeaderMenu";
class Header {
  generateLayout() {
    const headerMenu = new HeaderMenu();
    this.headerMenu_node = headerMenu.generateLayout()
    const logo = create("div", "logo", "gpXies");
    this.userName = create("div", "header_userName", [
      create("span", null, localStorage.getItem("gpxiesUserName")),
      create("img", "icon_triangle", null, null, ["src", icon_triangle]),
    ]);
    this.header = create(
      "header",
      null,
      create("div", "container header_container", [
        logo,
        this.userName,
        this.headerMenu_node
      ])
    );
    this.addUserNameButtonEventListener()
    this.addHeaderEventListener()
    this.logoutButtonAddEventListener();
    return this.header;
  }
  logoutButtonAddEventListener() {
    this.headerMenu_node.addEventListener("click", (e) => {
      //uploadTrack
      console.log("e.target",Array.from(e.target.classList));
      if(Array.from(e.target.classList).includes("logout")){
        this.redirectLogout();
        localStorage.removeItem("gpxiesToken");
      }
      if(Array.from(e.target.classList).includes("trackList")){
        this.redirectTrackListPage()
      }
      if(Array.from(e.target.classList).includes("uploadTrack")){
        this.redirectLoadTrackPage()
      }
    }); }
  redirectLogout() {
    window.location = "/login";
  }
  redirectTrackListPage() {
    window.location = "/mytracks";
  }
  redirectLoadTrackPage() {
    window.location = "/upload";
  }
  addUserNameButtonEventListener(){
    this.userName.addEventListener("click",()=>{
      this.showMenu()
    })
  }
  addHeaderEventListener(){
    this.header.addEventListener("mouseleave",()=>{
      this.showOutMenu()
    })
  }
  showMenu(){
    document.querySelector(".headerMenu_container").classList.toggle("headerMenu_container_opened")
  }
  showOutMenu(){
    if(document.querySelector(".headerMenu_container_opened")){
      console.log("smsjs");
      document.querySelector(".headerMenu_container").classList.remove("headerMenu_container_opened")
    }
  }
}
export default Header;
