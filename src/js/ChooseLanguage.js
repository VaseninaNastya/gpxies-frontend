import create from "./utils/create.utils";
import wordsEn from "./utils/wordsEn.utils";
import wordsRu from "./utils/wordsRu.utils";
class ChooseLanguage{
    generateLayout() {
        const wordsArr = this.generateWordsData()
        const chooseLanguage = this.determinationLanguage()
        const wordsChooseArr = wordsArr[chooseLanguage];
        this.language_ru =  create("div","language_item",`${wordsChooseArr.ru}`,null,["id","0"])
        this.language_en =  create("div","language_item",`${wordsChooseArr.en}`,null,["id","1"])
        this.language_container = create("div","language_container",[this.language_ru,this.language_en])
        if(localStorage.getItem("gpxiesChosen_language")==1){
            this.language_en.classList.add("chosen_language")
        }else{
            this.language_ru.classList.add("chosen_language")
        }
        this.addEventListeners()
        return this.language_container
    }
    determinationLanguage() {
        if(localStorage.getItem("gpxiesChosen_language")){
          this.chosen_language = localStorage.getItem("gpxiesChosen_language")
        }else{
          localStorage.setItem("gpxiesChosen_language", 0)
          this.chosen_language = 0
        }
        return this.chosen_language
      }
    addEventListeners(){
        this.language_container.addEventListener("click",(e)=>{
            document.querySelector(".chosen_language").classList.remove("chosen_language")
            localStorage.setItem("gpxiesChosen_language",e.target.getAttribute("id"))
            e.target.classList.add("chosen_language")
        })
    }
    generateWordsData(){
        return [wordsRu,wordsEn]
    }
}
export default ChooseLanguage