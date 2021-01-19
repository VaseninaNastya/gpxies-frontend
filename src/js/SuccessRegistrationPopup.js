import create from "./create";

class SuccessRegistrationPopup {
    constructor(callbackFunction){
this.callbackFunction = callbackFunction
    }
    generateLayout() {
        const successRegistrationContainer = create("div","successRegistration_container", [
            create("span",null, "Вы успешно зарегистрировались!")
        ])
        return successRegistrationContainer
    }
}
export default SuccessRegistrationPopup