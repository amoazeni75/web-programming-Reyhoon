Vue.component('star-rating', VueStarRating.default);

new Vue({
    el: '#app',
    data: {
        restaurant_object: "",
        allFoods : [],
        categories : [],
        comments : [],
        avg_ratings : [],
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
        translateEnglishToPersian(word) {
            console.log(word);
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
        handleListOfComments(xhttp){
            jsonDOM = JSON.parse(xhttp.responseText);
            temp_rate = jsonDOM.pop();
            for(rates_name in temp_rate){
                this.avg_ratings.push({key: rates_name, value: temp_rate[rates_name]});
            }

            for (comment in jsonDOM){
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
            "http://restfulapi.test/api/restaurants/" + this.restaurant_id+"/",
            this.handleListOfFoods,
            "GET",
            '');
        this.getDataFromServer(
            "http://restfulapi.test/api/restaurants/" + this.restaurant_id+"/" + "comments",
            this.handleListOfComments,
            "GET",
            ''
        );
    }
})
