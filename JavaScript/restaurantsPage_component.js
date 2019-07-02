new Vue({
    el: '#app',
    data: {
        city: "",
        area: "",
        activeRestaurants : [],
        deactivateRestaurants : [],

    },
    methods: {
        parseQueryPart() {
            page_url = decodeURIComponent(window.location.search);
            page_url = page_url.slice(1)
            page_url = page_url.split('&')
            this.city = page_url[0].slice(5);
            this.area = page_url[1].slice(5);
        },
        handleListOfRestaurants(xhttp) {
            jsonDOM = JSON.parse(xhttp.responseText);
            restaurants_count = jsonDOM.length;
            document.getElementById("text_count_rest").innerHTML = restaurants_count + " رستوران امکان سرویس دهی به" ;
            document.getElementById("text_address_rest").innerHTML = this.city + "،" + this.area;
        },
        getDataFromServer(url, handleFunction, method, queryPart) {
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    handleFunction(this);
                }
            };
            if(method == "GET"){
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
