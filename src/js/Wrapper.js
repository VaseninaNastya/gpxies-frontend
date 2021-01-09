import create from "./create";
import Header from "./Header";
import Footer from "./Footer";
import СompleteStatictics from "./СompleteStatictics";
class Wrapper {
  generateLayout() {
    const completeStatictics = new СompleteStatictics();
    const header = new Header();
    const footer = new Footer();
    document.body.prepend(
      create("div", "wrapper", [
        header.generateLayout(),
        completeStatictics.generateLayout(),
        footer.generateLayout(),
      ])
    );
  }
}
export default Wrapper;
