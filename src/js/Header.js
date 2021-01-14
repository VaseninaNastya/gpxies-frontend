import create from "./create";

class Header {
  generateLayout() {
    this.logout_button = create("a", "logout_button", "Выйти");
    const logo = create("div", "logo", "gpXies");
    const userName = create("div", "header_userName", localStorage.getItem('userName'))
    const header = create("header", null, 
      create("div", "container header_container", [logo,userName,this.logout_button]),
    );
    return header;
  }
}
export default Header;
