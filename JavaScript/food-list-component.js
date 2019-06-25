Vue.component('food-list-component', {
    template: '<div class="m_sec6_outer1 m_sec6_outer2 m_sec6_outer3">\n' +
        '        <div class="m_header_1 cuisine-cards">\n' +
        '            <div class="m_ranking_header_text">\n' +
        '                <h2 class="m_sec6_header">غذا چی میل دارید؟</h2>\n' +
        '                <h3 class="m_sec6_header_2">صبحانه، ناهار، شام یا هر چیزی که میل دارید را انتخاب کنید</h3></div>\n' +
        '            <div class="m_sec6_food_1">\n' +
        '\t\t\t\t <div class="m_sec6_food_1_data" v-for="item in best_3_items">\n' +
        '                            <a href="#" class="m_sec6_food_1_a image_scale" :style="{ backgroundImage: \'url(\' + item.url + \')\' }" >\n' +
        '                                <div class="m_sec6_food_1_empty"></div>\n' +
        '                                <div class="m_sec6_food_1_detail">\n' +
        '                                    <h2 class="m_sec6_food_1_name">{{translateEnglishToPersian(item.name)}}</h2>\n' +
        '                                    <p class="m_sec6_food_1_active_status">{{item.count}} رستوران فعال</p>\n' +
        '                                </div>\n' +
        '                            </a>\n' +
        '                        </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="m_header_1 m_sec6_food_1_more tags" id="food_container_no_image">\n' +
        '            <h2 class="m_sec6_food_1_more_h">انتخاب غذا‌های بیشتر</h2>\n' +
        '            <a href="" class="m_sec6_food_1_more_a" v-for="it in other_best_res">{{translateEnglishToPersian(it.name)}}</a>\n' +
        '        </div>\n' +
        '    </div>',

    data() {
        return {
            best_3_items: [],
            other_best_res : [],
            dictionaryArr : [
                { key: "sandwich", value: 'ساندویچ'},
                { key: "burger", value: 'برگر'},
                { key: "pizza", value: 'پیتزا'},
                { key: "kebab", value: 'کباب'},
                { key: "salad", value: 'سالاد'},
                { key: "iranian", value: 'ایرانی'},
                { key: "pasta", value: 'پاستا'},
                { key: "fish", value: 'ماهی'},
                { key: "breakfast", value: 'صبحانه'},
                { key: "juice", value: 'آبمیوه طبیعی'},
                { key: "steak", value: 'استیک'},
                { key: "soup", value: 'سوپ'},
                { key: "fastfood", value: 'فست فود'},
            ]
        }
    },
    methods:{
        translateEnglishToPersian(word){
            for (let i = 0; i < this.dictionaryArr.length ; i++) {
                if (this.dictionaryArr[i].key == word )
                    return this.dictionaryArr[i].value
            }
        },
        appendTopRest(name, imgURL, count){
            this.best_3_items.push({
                name: name,
                url: imgURL,
                count:count
            })
        },
        appendRest(name){
            this.other_best_res.push({
                name: name
            })
        }
    },
    mounted(){
        let xhttp = new XMLHttpRequest();
        let aFunc = this.appendTopRest;
        let bFunc = this.appendRest;
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let xmlDOM = xhttp.responseXML;
                let foods = xmlDOM.getElementsByTagName("food");
                for (let i = 0; i < foods.length; i++) {
                    let count = foods[i].getElementsByTagName("count")[0].childNodes[0].nodeValue;
                    let name = foods[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
                    if(i < 4) {
                        let imgURL = foods[i].getElementsByTagName("imgUrl")[0].childNodes[0].nodeValue;
                        aFunc(name, imgURL, count);
                    }
                    else
                        bFunc(name);
                }
            }

        };
        xhttp.open("GET", "http://demo2469824.mockable.io/foods");
        xhttp.send();
    }
})



new Vue({
    el: '#cuisines-and-tags',
})

