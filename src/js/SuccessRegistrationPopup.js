import create from "./create";

class SuccessRegistrationPopup {
    generateLayout() {
        const successRegistrationContainer = create("div","successRegistration_container", [
            create("span",null, "Вы успешно зарегистрировались!")
        ])

        return successRegistrationContainer
    }
}
export default SuccessRegistrationPopup