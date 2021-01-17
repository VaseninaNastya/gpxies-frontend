import create from "./create";
import icon_success from "../../assets/img/icon_success.png";
class SuccessRegistrationPopup {
    generateLayout() {
        const successRegistrationContainer = create("div","successRegistration_container", [
            create("span",null, "Вы успешно зарегистрировались!")
        ])
        return successRegistrationContainer
    }
}
export default SuccessRegistrationPopup