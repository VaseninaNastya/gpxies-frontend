import create from "./create";
import Header from "./Header";
import Footer from "./Footer";

class Wrapper {
  generateLayout() {
    const header = new Header()
    const footer = new Footer()
    document.body.prepend(create("div", "wrapper", [header.generateLayout(), footer.generateLayout()]))
  }
}
export default Wrapper;