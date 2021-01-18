import '../css/main.css';
import create from "./create";
import ShowTrackPageHeader from "./ShowTrackPageHeader";
import Footer from "./Footer";
import СompleteStatictics from "./СompleteStatictics";
import Header from './Header';
import WorldMap from './WorldMap';

class ShowTrackPage {
  generateLayout() {
    const completeStatictics = new СompleteStatictics();
    const showTrackPageHeader = new ShowTrackPageHeader();
    const header = new Header();
    const footer = new Footer();
    const map = create("div", "map", null, null, ["id", "mapid"])
    document.body.prepend(
      create("div", "showTrackPage_wrapper", [
        header.generateLayout(),
        showTrackPageHeader.generateLayout(),
        map,
        completeStatictics.generateLayout(),
        footer.generateLayout(),
      ])
    );
    this.worldMap = new WorldMap();
    this.worldMap.generateLayout();
  }
}

const showTrackPage = new ShowTrackPage();
showTrackPage.generateLayout();

export default ShowTrackPage;