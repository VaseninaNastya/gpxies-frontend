import create from "./create";
class ChooseLanguage{
    generateLayout() {
        this.language_rus =  create("div","language_item","рус.",null,["id","rus"])
        this.language_eng =  create("div","language_item","англ.",null,["id","eng"])
        this.language_container = create("div","language_container",[this.language_rus,this.language_eng])
        this.choiseLanguage()
        this.addEventListeners()
        return this.language_container
    }
    choiseLanguage(){
        if(localStorage.getItem("gpxiesChoosen_language")=="eng"){
            console.log(localStorage.getItem("gpxiesChoosen_language"));
            console.log("document.querySelector(`eng`)",  document.querySelector('.eng'));
            this.language_eng.classList.add("choosen_language")
        }else{
            this.language_rus.classList.add("choosen_language")
        }
    }
    addEventListeners(){
        this.language_container.addEventListener("click",(e)=>{
            document.querySelector(".choosen_language").classList.remove("choosen_language")
            localStorage.setItem("gpxiesChoosen_language",e.target.getAttribute("id"))
            e.target.classList.add("choosen_language")
        })
    }
}
export default ChooseLanguage