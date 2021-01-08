import create from "./create";
import rslogo from "../../assets/img/logo-rs.png";
class Footer {
  generateLayout() {
    const fullStatistics = create("div","statistics__full",[
      create("div", "container",[
        "407 км",
        "4000 точек",
        "25 wpt",
        "407 км",
        "4000 точек",
        "25 wpt",
        "407 км",
        "4000 точек",
        "25 wpt",
        "407 км",
        "4000 точек",
        "25 wpt"
      ])
    ])
    const img = create(
      "a",
      null,
      create("img", "footer_img", null, null, ["src", rslogo]),
      null,
      [
        "href",
        "https://rs.school/js/",
      ]
    );

    const footer = create(
      "footer",
      null,
      create("div", "container", [
        create("a", null, "Vasenina Nastya", null, [
          "href",
          "https://github.com/VaseninaNastya",
        ]),
        create("a", null, "Nikolai Minkevich", null, [
          "href",
          "https://github.com/nikolai-minkevich",
        ]),
        img,
      ])
    );
    return footer;
  }
}

export default Footer;
