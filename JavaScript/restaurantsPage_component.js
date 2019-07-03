Vue.component('star-rating', VueStarRating.default);

new Vue({
    el: '#app',
    data: {
        city: "",
        area: "",
        allRestaurants : [],
        activeRestaurants: [],
        deactivateRestaurants: [],
        categories: [],
        dictionaryArr: [
            {key: "sandwich", value: 'ساندویچ'},
            {key: "berger", value: 'برگر'},
            {key: "khoresht", value: 'خورشت'},
            {key: "kabab", value: 'کباب'},
            {key: "pasta", value: 'پاستا'},
            {key: "irani", value: 'غذای ایرانی'},
            {key: "khourak", value: 'خوراک'},
        ],
        processCategory: true,
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
            this.city = page_url[0].slice(5);
            this.area = page_url[1].slice(5);
        },
        isThereAnayDeactive(){
            if(this.deactivateRestaurants.length == 0)
                return false;
            else
                return true;
        },
        prepareCategories(categories_server) {
            for (cat in categories_server) {
                this.categories.push(
                    {
                        "name": this.translateEnglishToPersian(cat),
                        "quantity": categories_server[cat]
                    });
            }
        },
        prepareRestaurants(restaurants){
            var hour = new Date().getHours();
            for(rest in restaurants){
                restaurants[rest].display = true;
                if(restaurants[rest].openingTime <= hour && hour <= restaurants[rest].closingTime)
                    this.activeRestaurants.push(restaurants[rest]);
                else
                    this.deactivateRestaurants.push(restaurants[rest]);
                this.allRestaurants.push(restaurants[rest]);
            }
        },
        handleListOfRestaurants(xhttp) {
            jsonDOM = JSON.parse(xhttp.responseText);
            restaurants_count = jsonDOM.length - 1;
            document.getElementById("text_count_rest").innerHTML = restaurants_count + " رستوران امکان سرویس دهی به";
            document.getElementById("text_address_rest").innerHTML = this.city + "،" + this.area;
            if (this.processCategory) {
                this.prepareCategories(jsonDOM[jsonDOM.length - 1]);
                this.processCategory = false;
            }
            jsonDOM.pop();
            this.prepareRestaurants(jsonDOM);
        },
        getDataFromServer(url, handleFunction, method, queryPart) {
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    handleFunction(this);
                }
            };
            if (method == "GET") {
                url += queryPart;
            }
            xhttp.open(method, url);
            xhttp.send();
        }
    },
    mounted() {
        this.parseQueryPart();
        this.getDataFromServer(
            "http://restfulapi.test/api/restaurants",
            this.handleListOfRestaurants,
            "GET",
            "?city=" + this.city + "&area=" + this.area);
    }
})
