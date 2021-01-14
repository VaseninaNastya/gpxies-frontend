import  '../css/main.css';
import create from './create';
import Header from './Header';
class TrackListPage {
    generateLayout() {
        const header = new Header();
        const tableHeader = create("div", 'table_header_container',[
            create("div",'table_item'),
            create("div",'table_item table_header_item_sport-choce',[
                create("span", null, "Вид спорта"),
                create("select", "sport-choce",[
                    create('option', null, "Велосипед", null,['value', 1],['id', "bicycle"]),
                    create('option', null, 'Бег', null,['value', 2],['id', "run"]),
                    create('option', null, 'Ходьба', null,['value', 3],['id', "hiking"]),
                ],null, ['id', "sport-choce"])
            ]),
            create("div",'table_item',[
                create('span', null, "Дата")
            ]),
            create("div",'table_item table_header_item_name',[
                create("label", null, "Название", null, ["for", "filter_name"]),
                create("input", null, null, null, ["id", "filter_name"], ["type", "text"])
            ]),
            create("div",'table_item table_header_item_distance',[
                create("label", null, "Дистанция", null, ["for", "filter_distance"]),
                create("input", null, null, null, ["id", "filter_distance"], ["type", "text"])
            ]),
            create("div",'table_item')
        ])
        const tableBody = create('ul', 'table_body',[
            create('li',"table_body_container",[
                create("div", "table_item",[
                    create("input", null, null, null,['type', "checkbox"])
                ]),
                create("div", "table_item",[
                    create("span", null, "Бег")
                ]),
                create("div", "table_item",[
                    create("span", null, "20.12.20")
                ]),
                create("div", "table_item",[
                    create("span", null, "Беееегаю")
                ]),
                create("div", "table_item",[
                    create("span", null, "2 км")
                ]),
                create("div", "table_item table_body_item_action-list",[
                    create("a", null, "Редактировать"),
                    create("a", null, "Удалить"),
                    create("a", null, "Cкачать GPX")
                ]),
            ])
        ])
        const tableContainer = create('div', "table_container", [tableHeader,tableBody])
        document.body.prepend(create("div", "table_wraper",[header.generateLayout(),tableContainer]))
    }
}


const trackListPage = new TrackListPage();
trackListPage.generateLayout();


export default TrackListPage;