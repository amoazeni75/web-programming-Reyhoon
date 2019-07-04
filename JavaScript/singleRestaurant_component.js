Vue.component('star-rating', VueStarRating.default);

new Vue({
    el: '#app',
    data: {
        restaurant_object: "",
        categories: [],
        comments: [],
        avg_ratings: [],
        dictionaryArr: [
            {key: "sandwich", value: 'ساندویچ'},
            {key: "berger", value: 'برگر'},
            {key: "khoresht", value: 'خورشت'},
            {key: "kabab", value: 'کباب'},
            {key: "pasta", value: 'پاستا'},
            {key: "irani", value: 'غذای ایرانی'},
            {key: "khourak", value: 'خوراک'},
            {key: "quality", value: 'کیفیت غذا'},
            {key: "packing", value: 'کیفیت بسته بندی'},
            {key: "deliveryRate", value: 'سرعت ارسال پیک'},
        ],
    },

    methods: {
        addRedLineSelectionQuick(event){
            event.target.className += " selected_menu_section";
            selection_list = document.getElementById("quick_access_list").childNodes;
            for (let i = 0; i < selection_list.length; i+=2) {
                if(event.target.parentNode != selection_list[i]){
                    selection_list[i].childNodes[0].classList.remove("selected_menu_section");
                }
            }
        },
        clearContent(event){
            event.target.value = '';
            this.searchRestaurantByName();
        },
        searchRestaurantByName() {
            var search_text = document.getElementById("search_rest_name_input").value;
            for (let i = 0; i < this.categories.length; i++) {
                for (let j = 0; j < this.categories[i].foods.length; j++) {
                    if (this.categories[i].foods[j].name.includes(search_text) || search_text == '')
                        this.categories[i].foods[j].display = true;
                    else
                        this.categories[i].foods[j].display = false;
                }
            }
        },
        daysBetween(date2) {
            date1 = new Date();
            //Get 1 day in milliseconds
            var one_day = 1000 * 60 * 60 * 24;

            // Convert both dates to milliseconds
            var date1_ms = date1.getTime();
            var date2_ms = Date.parse(date2);

            // Calculate the difference in milliseconds
            var difference_ms = date1_ms - date2_ms;

            // Convert back to days and return
            return Math.round(difference_ms / one_day);
        },
        translateEnglishToPersian(word) {
            for (let i = 0; i < this.dictionaryArr.length; i++) {
                if (this.dictionaryArr[i].key == word)
                    return this.dictionaryArr[i].value
            }
        },
        parseQueryPart() {
            page_url = decodeURIComponent(window.location.search);
            page_url = page_url.slice(1)
            page_url = page_url.split('&')
            this.restaurant_id = page_url[0].slice(14);
        },
        prepareCategories(categories_server) {
            for (cat in categories_server) {
                this.categories.push(
                    {
                        "name": this.translateEnglishToPersian(categories_server[cat].name),
                        "foods": [],
                    });
            }
        },
        prepareFood(foods) {
            for (food in foods) {
                for (cat in this.categories) {
                    if (this.categories[cat].name == foods[food].foodSet) {
                        foods[food].display = true;
                        this.categories[cat].foods.push(foods[food]);
                    }
                }
            }
        },
        handleListOfFoods(xhttp) {
            jsonDOM = JSON.parse(xhttp.responseText);
            this.prepareCategories(jsonDOM.categories);
            this.prepareFood(jsonDOM.foods)
            this.restaurant_object = jsonDOM;
            window.document.title = this.restaurant_object.name + " | مشاهده ی منو و سفارش";
        },
        handleListOfComments(xhttp) {
            jsonDOM = JSON.parse(xhttp.responseText);
            temp_rate = jsonDOM.pop();
            for (rates_name in temp_rate) {
                this.avg_ratings.push({key: rates_name, value: temp_rate[rates_name]});
            }

            for (comment in jsonDOM) {
                this.comments.push(jsonDOM[comment]);
            }
        },
        getDataFromServer(url, handleFunction, method, queryPart) {
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    handleFunction(this);
                }
            };
            if (method == "GET" && queryPart != '') {
                url += queryPart;
            }

            xhttp.open(method, url);
            xhttp.send();
        }
    },
    mounted() {
        this.parseQueryPart();
        this.getDataFromServer(
            "http://restfulapi.test/api/restaurants/" + this.restaurant_id + "/",
            this.handleListOfFoods,
            "GET",
            '');
        this.getDataFromServer(
            "http://restfulapi.test/api/restaurants/" + this.restaurant_id + "/" + "comments",
            this.handleListOfComments,
            "GET",
            ''
        );
    }
})


$("#link_menu_restaurant").click(function() {
    $('html, body').animate({
        scrollTop: $("#Restaurant-quick-category-div").offset().top - 70
    }, 800);
});

$("#link_information_restaurant").click(function() {
    $('html, body').animate({
        scrollTop: $("#branch-info").offset().top - 70
    }, 800);
});

$("#link_comments_restaurant").click(function() {
    $('html, body').animate({
        scrollTop: $("#branch-comment").offset().top - 70
    }, 800);
});

$(document).ready(function(){
    $("#link_menu_restaurant").addClass("selected_menu_section")
});
