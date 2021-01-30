import create from "./create.utils";
import ChooseLanguage from "./ChooseLanguage";

class СompleteStatictics {
  getWordsData() {
    const chooseLanguageComponent = new ChooseLanguage();
    this.wordsArr = chooseLanguageComponent.generateWordsData();
    this.chooseLanguage_container = chooseLanguageComponent.generateLayout();
    this.chooseLanguage_container.classList.add("language_container_login");
    this.chooseLanguage = chooseLanguageComponent.determinationLanguage();
    this.wordsChooseArr = this.wordsArr[this.chooseLanguage];
  }
  generateLayout() {
    this.getWordsData();
    const сompleteStatictics = create(
      "div", "сompleteStatictics_wrapper",[
        create("div", "сompleteStatictics container", [
          create("h5", null, `${this.wordsChooseArr.fullStatistics}`),
          create("div", "сompleteStatictics_container", [
            create("span", null, "407 км"),
            create("span", null, "4000 точек"),
            create("span", null, "25 wpt"),
            create("span", null, "407 км"),
            create("span", null, "4000 точек"),
            create("span", null, "25 wpt"),
            create("span", null, "407 км"),
            create("span", null, "4000 точек"),
            create("span", null, "25 wpt"),
          ]),
        ])
      ]
    )
    return сompleteStatictics;
  }
}

export default СompleteStatictics;
