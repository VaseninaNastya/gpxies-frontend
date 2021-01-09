import create from "./create";
class СompleteStatictics {
  generateLayout() {
    const сompleteStatictics = create("div","сompleteStatictics",[
      create("div", "container",[
        create("h4", null, 'Полная статистика'),
        create("div", "сompleteStatictics_container",[
          create("span", null, "407 км"),
          create("span", null, "4000 точек"),
          create("span", null, "25 wpt"),
          create("span", null, "407 км"),
          create("span", null, "4000 точек"),
          create("span", null, "25 wpt"),
          create("span", null, "407 км"),
          create("span", null, "4000 точек"),
          create("span", null, "25 wpt")
        ])
      ])
    ])
    return сompleteStatictics;
  }
}

export default СompleteStatictics;
