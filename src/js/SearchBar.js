import create from "./create.utils"

class SearchBar {

    generateLayout() {
        this.searchBar = create(
            "input",
            "searchBar_input",
            null,
            null,
            ["id", "filter_name"],
            ["type", "text"]
          )
          this.addSearchBarEventListener()
          return this.searchBar
    }
    addSearchBarEventListener(){
        this.searchBar.addEventListener('input', () => {
            let searchPhrase = document.querySelector('.searchBar_input').value
            Array.from(document.querySelectorAll('.table_body_container')).map((item) => {
                console.log("item",item);
                item.classList.remove('hidden_by_search');
            });
            Array.from(document.querySelectorAll('.table_body_container')).map((item) => {
                if (!item.childNodes[3].childNodes[0].textContent.toLowerCase().includes(searchPhrase.toLowerCase())) {
                    item.classList.add('hidden_by_search');
                }
            })
        })
    }
}
export default SearchBar;