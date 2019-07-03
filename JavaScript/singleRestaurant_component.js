Vue.component('star-rating', VueStarRating.default);

new Vue({
    el: '#app',
    data: {
        restaurant_object: "",
        allFoods : [],
        categories : [],
        dictionaryArr: [
            {key: "sandwich", value: 'ساندویچ'},
            {key: "berger", value: 'برگر'},
            {key: "khoresht", value: 'خورشت'},
            {key: "kabab", value: 'کباب'},
            {key: "pasta", value: 'پاستا'},
            {key: "irani", value: 'غذای ایرانی'},
            {key: "khourak", value: 'خوراک'},
        ],
    },

    methods: {
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
                        "name": this.translateEnglishToPersian(categories_server[cat]),
                        "foods" : [],
                    });
            }
        },
        prepareFood(foods){
            for(food in foods){
                for (cat in this.categories){
                    if(cat.name == foods[food].foodSet){
                        cat.foods.push(foods[food]);
                    }
                }
            }
        },
        handleListOfFoods(xhttp) {
            jsonDOM = JSON.parse(xhttp.responseText);
            this.prepareCategories(jsonDOM.categories);
            this.prepareFood(jsonDOM.foods)
            this.restaurant_object = jsonDOM;
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
            "http://restfulapi.test/api/restaurants/" + this.restaurant_id+"/",
            this.handleListOfFoods,
            "GET",
            '');
    }
})
