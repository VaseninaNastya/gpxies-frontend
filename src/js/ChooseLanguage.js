import create from "./create.utils";
import wordsEn from "./wordsEn.utils";
import wordsRu from "./wordsRu.utils";
class ChooseLanguage{
    generateLayout() {
        const wordsArr = this.generateWordsData()
        const chooseLanguage = this.determinationLanguage()
        const wordsChooseArr = wordsArr[chooseLanguage];
        this.language_ru =  create("div","language_item",`${wordsChooseArr.ru}`,null,["id","0"])
        this.language_en =  create("div","language_item",`${wordsChooseArr.en}`,null,["id","1"])
        this.language_container = create("div","language_container",[this.language_ru,this.language_en])
        if(localStorage.getItem("gpxiesChoosen_language")==1){
            this.language_en.classList.add("choosen_language")
        }else{
            this.language_ru.classList.add("choosen_language")
        }
        this.addEventListeners()
        return this.language_container
    }
    determinationLanguage() {
        if(localStorage.getItem("gpxiesChoosen_language")){
          this.choosen_language = localStorage.getItem("gpxiesChoosen_language")
        }else{
          localStorage.setItem("gpxiesChoosen_language", 0)
          this.choosen_language = 0
        }
        return this.choosen_language
      }
    addEventListeners(){
        this.language_container.addEventListener("click",(e)=>{
            document.querySelector(".choosen_language").classList.remove("choosen_language")
            localStorage.setItem("gpxiesChoosen_language",e.target.getAttribute("id"))
            e.target.classList.add("choosen_language")
        })
    }
    generateWordsData(){
        return [wordsRu,wordsEn]
    }
}
export default ChooseLanguage