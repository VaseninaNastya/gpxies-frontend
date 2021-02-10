import create from "./utils/create.utils";
import icon_triangle from "../../assets/img/icon_triangle.png";
class FilterFromTo {
 constructor(containerClass){
    this.containerClass = containerClass
  }
  generateLayout() {
    this.filter_fromHight = create(
      "img",
      "icon_triangle_fromHight",
      null,
      null,
      ["src", icon_triangle]
    );
    this.filter_fromLow = create("img", 
      "icon_triangle_fromLow", 
      null, 
      null, 
      ["src",
      icon_triangle,
    ]);
    const filter_icons_container = create("div", `filter_icons_container ${this.containerClass}`, [
      this.filter_fromHight,
      this.filter_fromLow,
    ])
    //this.addListeners()
    return filter_icons_container
  }
  /*addListeners(){
    this.filter_fromHight.addEventListener("click",() => {this.callbackFunctionFromHight(this.param)})
    this.filter_fromLow.addEventListener("click",() => {this.callbackFunctionFromLow(this.param)})
  }*/
}
export default FilterFromTo;
