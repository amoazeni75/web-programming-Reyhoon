Vue.component('star-rating', VueStarRating.default);

new Vue({
    el: '#app',
    data: {
        city: "",
        area: "",
        searchRest: "",
        allRestaurants: [],
        activeRestaurants: [],
        deactivateRestaurants: [],
        categories: [],
        unChecked_categories: [],
        checked_categories: [],
        selectedCategory_query: [],
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
        prepareQueryPart() {
            q_part = '';
            if (this.area == '') {
                q_part = "?city=" + this.city + "&area";
            } else {
                q_part = "?city=" + this.city + "&area=" + this.area;
            }
            if (this.selectedCategory_query.length != 0) {
                q_part += "&categories=[";
                for (let i = 0; i < this.selectedCategory_query.length; i++) {
                    q_part += this.selectedCategory_query[i] + "|";
                }
                q_part += "]";
            }
            return q_part;
        },
        handleSelectionOfCategory(event) {
            this.changeCheckBoxSelection(event);
            this.sortFilters();
            this.getDataFromServer(
                "http://restfulapi.test/api/restaurants",
                this.handleListOfRestaurants,
                "GET",
                this.prepareQueryPart());
        },
        changeCheckBoxSelection(event) {
            if (event.currentTarget.checked) {
                this.removeAndAddCheckBox(event.target,
                    document.getElementById("container_unchecked_filters"),
                    document.getElementById("container_checked_filters"),
                    this.unChecked_categories,
                    this.checked_categories);
                this.selectedCategory_query.push(event.target.value);
            } else {
                this.removeAndAddCheckBox(event.target,
                    document.getElementById("container_checked_filters"),
                    document.getElementById("container_unchecked_filters"),
                    this.checked_categories,
                    this.unChecked_categories);
                tmp = [];
                for (let i = 0; i < this.selectedCategory_query.length; i++) {
                    if (this.selectedCategory_query[i] != event.target.value) {
                        tmp.push(this.selectedCategory_query[i]);
                    }
                }
                this.selectedCategory_query = tmp;
            }
        },
        removeAndAddCheckBox(check_box, should_remove, should_add, should_remove_e, should_add_e) {
            for (let i = 0; i < should_remove.childNodes.length; i++) {
                if (should_remove.childNodes[i] == check_box.parentNode.parentNode) {
                    should_add.appendChild(should_remove.childNodes[i]);
                    break;
                }
            }
            // for (let i = 0; i < should_remove_e.length; i++) {
            //     if(should_remove_e[i].name == check_box.value){
            //         etemp = should_remove_e[i];
            //         should_remove_e.splice(i, 1);
            //         should_add_e.push(etemp);
            //         break;
            //     }
            // }
        },
        sortFiltersList(childNodes) {
            for (let i = 0; i < childNodes.length - 1; i++) {
                for (let j = 0; j < childNodes.length - 1 - i; j++) {
                    if (childNodes[j].getAttribute('quantity') < childNodes[j + 1].getAttribute('quantity')) {
                        childNodes[j + 1].parentNode.insertBefore(childNodes[j + 1], childNodes[j]);
                    }
                }
            }
        },
        sortFilters() {
            checked_box = document.getElementById("container_checked_filters").childNodes;
            unchecked_box = document.getElementById("container_unchecked_filters").childNodes;


            for (let i = 0; i < checked_box.length - 1; i++)
                checked_box[i].classList.remove("lastSelected");

            for (let i = 0; i < unchecked_box.length - 1; i++)
                unchecked_box[i].classList.remove("lastSelected");

            this.sortFiltersList(checked_box);
            this.sortFiltersList(unchecked_box);
            if (checked_box.length != 0) {
                checked_box[checked_box.length - 1].className += " lastSelected";
            }
        },
        searchRestaurantByName() {
            var search_text = document.getElementById("search_rest_name_input").value;
            if (search_text == '') {
                for (rest in this.allRestaurants) {
                    this.allRestaurants[rest].display = true;
                }
                return;
            }

            for (rest in this.allRestaurants) {
                if (this.allRestaurants[rest].name.includes(search_text))
                    this.allRestaurants[rest].display = true;
                else
                    this.allRestaurants[rest].display = false;
            }
        },
        searchFilterByName() {
            var search_text = document.getElementById("branchNameSearch").value;

            for (cat in this.unChecked_categories) {
                if (this.unChecked_categories[cat].name.includes(search_text) || search_text == '')
                    this.unChecked_categories[cat].display = true;
                else
                    this.unChecked_categories[cat].display = false;
            }
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
            this.city = page_url[0].slice(5);
            this.area = page_url[1].slice(5);
        },
        isThereAnayDeactive() {
            if (this.deactivateRestaurants.length == 0)
                return false;
            else
                return true;
        },
        prepareCategories(categories_server) {
            for (cat in categories_server) {
                this.categories.push(
                    {
                        "name": this.translateEnglishToPersian(cat),
                        "quantity": categories_server[cat],
                        "display": true,
                    });
                this.unChecked_categories.push(
                    {
                        "name": this.translateEnglishToPersian(cat),
                        "quantity": categories_server[cat],
                        "display": true,
                    });

            }
        },
        prepareRestaurants(restaurants) {
            var hour = new Date().getHours();
            this.allRestaurants = [];
            this.activeRestaurants = [];
            this.deactivateRestaurants = [];
            for (rest in restaurants) {
                restaurants[rest].display = true;
                if (restaurants[rest].openingTime <= hour && hour <= restaurants[rest].closingTime)
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

            setTimeout(this.sortFilters, 50);
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
            this.prepareQueryPart());
    }
})

