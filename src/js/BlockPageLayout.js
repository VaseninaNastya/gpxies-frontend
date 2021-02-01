import create from "./utils/create.utils";

class BlockPageLayout {
  generateMessageLayout(){
    const loadingSpinner_wrapper = create(
      "div",
      "loadingSpinner_wrapper loadingSpinner_wrapper__hidden"
    );
    return loadingSpinner_wrapper
  }
}
export default BlockPageLayout;

