import create from "./create";

class Header {
  generateLayout() {
    this.logout_button = create("a", "logout_button", "Выйти");
    this.logoutButtonAddEventListener()
    const logo = create("div", "logo", "gpXies");
    const userName = create("div", "header_userName", localStorage.getItem('gpxiesUserName'))
    const header = create("header", null, 
      create("div", "container header_container", [logo,userName,this.logout_button]),
    );
    return header;
  }
  logoutButtonAddEventListener(){
    this.logout_button.addEventListener("click", ()=>{
        localStorage.removeItem("gpxiesUserName")
        localStorage.removeItem('gpxiesToken')
        this.redirectLogout()
    });
  }
  redirectLogout(){
    window.location = "loginPage.html";
  }
}
export default Header;
