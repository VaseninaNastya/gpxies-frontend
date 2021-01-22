import create from "./create";
import tree from "../../assets/img/tree";

class LoadingSpinner {
  generateLayout() {
    const loadingSpinner_container = create("div", "loadingSpinner_container", [
      create("img", "loadingSpinner_img", null, null, ["src", tree]),
      create("img", "loadingSpinner_img", null, null, ["src", tree]),
      create("img", "loadingSpinner_img", null, null, ["src", tree])
    ]);
    const loadingSpinner_wrapper = create(
      "div",
      "loadingSpinner_wrapper",
      loadingSpinner_container
    );
    return loadingSpinner_wrapper;
  }
}
export default LoadingSpinner;

/*

<div class="modal_main">
<div class="modal_container">
    <div class="modal_content">
        <div class="modal_content_name">
            <h3 id="pet_name">Jennifer</h3>
            <div class="modal_type__prime"><div id="modal_type">Dog</div> - <div id="modal_breed">Labrador</div></div>
        </div>
        <P class="modal_content_description">Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home.
        This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm
        in the house if she has all of her favorite toys.</P>
      <ul>
        <li>
          <h5>Age: <span id="modal_age" class="modal_details_data">2 months</span></h5>
        </li>
        <li>
          <h5>Inoculations: <span id="modal_inoculations" class="modal_details_data">none</span></h5>
        </li>
        <li>
          <h5>Diseases: <span id="modal_diseases" class="modal_details_data">none</span></h5>
        </li>
        <li>
          <h5>Parasites: <span id="modal_parasites" class="modal_details_data">none</span></h5>
        </li>
      </ul>
    </div>

  </div>

  <div class="modal_close">
    <img src="../../assets/icons/close.svg">
  </div>

</div>*/
