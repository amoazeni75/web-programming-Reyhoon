

Vue.component('star-rating', VueStarRating.default);

Vue.component('top-restaurants', {
    template: ' <div><div class="m_ranking_outer_1">\n' +
        '        <div class="m_header_1">\n' +
        '            <section class="m_ranking_outer_2">\n' +
        '                <div class="m_ranking_header_text">\n' +
        '                    <h2 class="m_ranking_header_h">رستوران‌‌ها و فست فود‌های برتر ماه بر اساس امتیاز‌دهی کاربران</h2>\n' +
        '                </div>\n' +
        '                \n' +
        '                <div class="m_ranking_inner1" v-for="item in best_3_items">\n' +
        '                    <div class="m_ranking_inner2 m_ranking_inner3 branch-card">\n' +
        '                        <a href="#" class="m_ranking_a">\n' +
        '                            <div class="m_ranking_empty"></div>\n' +
        '                            <div class="m_ranking_outter_div_1">\n' +
        '                                <div class="m_ranking_container_3box">\n' +
        '                                    <div class="m_ranking_img_con_1 m_ranking_img_con_2"><img :src="item.imgUrl" class="m_ranking_img_box_1 promoted-restaurants-img" alt="لوگو آرم رستوران شیلا (مطهری)"></div>\n' +
        '                                    <div class="m_ranking_text_describ">\n' +
        '                                        <h2 class="m_ranking_dec_header" >{{item.name}}</h2>\n' +
        '                                        <div class="m_ranking_start_outter">\n' +
        '                                            <p class="m_ranking_start_number">{{item.rate}}</p> <star-rating style="direction: ltr" :star-size="20" :rating=item.rate :read-only="true" :show-rating="false" :increment="0.01"></star-rating>\n' +
        '                                            <span class="m_ranking_start_span_1">({{item.numOfRates}})</span><span class="m_ranking_start_span_2">{{item.numOfRates}} نظر</span></div>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                                <ul class="m_ranking_food_category">\n' +
        '                                    <li class="m_ranking_food_category_item" v-for="food in item.foods">{{translateEnglishToPersian(food)}}</li>\n' +
        '                                    </ul><address :title=item.address class="m_ranking_food_category_add">{{item.address}}</address>\n' +
        '                                <button class="rey-btn m_ranking_food_order_1 m_ranking_food_order_2 m_ranking_food_order_3">\n' +
        '                                    شروع سفارش\n' +
        '                                </button>\n' +
        '                            </div>\n' +
        '                        </a>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '\n' +
        '            </section>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '<section id="promoted-restaurants" class="promoted-restaurants-group_1 promoted-restaurants-group">\n' +
        '                <div class="m_header_1">\n' +
        '                    <div class="promoted-restaurants-container" id = "restaurant_no_image">\n' +
        '                        <h2 class="promoted-restaurants-header">رستوران‌های خوب تهران در ریحون</h2>\n' +
        '                        <a href="#" class="promoted-restaurants-link" v-for="item in other_best_res">\n' +
        '\t\t\t\t\t\t\t<img class="promoted-restaurants-img" :src="item.imgUrl" :alt="item.name">\n' +
        '                            <h3 class="promoted-restaurants-res_name-">{{item.name}}</h3>\n' +
        '\t\t\t\t\t\t</a>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </section> \n' +
        '</div>  ',

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
        appendRest(restes){
            for (let i = 0; i < restes.length; i++) {
                if(i < 3)
                    this.best_3_items.push(restes[i]);
                else
                    this.other_best_res.push(restes[i]);
            }
        }
    },
    mounted(){
        let xhttp = new XMLHttpRequest();
        let cFunc = this.appendRest;
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let jsonDOM = JSON.parse(xhttp.responseText);
                let restaurants = jsonDOM.restaurants;
                cFunc(restaurants)
            }
        };
        xhttp.open("GET", "http://demo2469824.mockable.io/best-restaurants");
        xhttp.send();
    }
})


new Vue({
    el: '#top-rest',
})

