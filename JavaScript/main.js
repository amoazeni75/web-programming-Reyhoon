document.getElementById("search_region").addEventListener("input", suggestArea);
document.getElementById("select_city").addEventListener("change", suggestArea);
document.getElementById("search_region").addEventListener("focus", suggestArea);
document.getElementById("search_region").addEventListener("keyup", function(event){
    if(event.keyCode == 13){
        navigateToRestaurantsPage();
    }
});
document.getElementById("search_button").addEventListener("click",navigateToRestaurantsPage);

search_box = document.getElementById("districts");


function suggestArea() {
    let city = document.getElementById("select_city").value;
    let area = document.getElementById("search_region").value;
    getDataFromServer(
        "http://restfulapi.test/api/restaurants/search",
        showSuggestion,
        "GET",
        "?city="+city+"&search="+area
    );
}


function getDataFromServer(url, handleFunction, method, queryPart) {
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


function showSuggestion(xhttp) {

    let jsonDOM = JSON.parse(xhttp.responseText);
    search_box.innerHTML = '';

        let option = document.createElement("option");
        option.value = "جستجوی خودکار محله ی شما";
        search_box.appendChild(option);

        for (let i = 0; i < jsonDOM.length; i++) {
            let option = document.createElement("option");
            option.value = jsonDOM[i];
            search_box.appendChild(option);
        }
}


function navigateToRestaurantsPage(){
    let city = document.getElementById("select_city").value;
    let area = document.getElementById("search_region").value;
    window.open("../src/ResturantList.html?city=" + city + "&area=" + area , '_blank');

}

$(document).ready(function() {
    $('select').niceSelect();
    $('select').width = 140;
    $('.nice-select').click(function(){
        if($('.dimmer').is(":visible")){
            $('.dimmer').hide();
        }else
            $('.dimmer').show();
    });
    $('.dimmer').click(function(){
        $('.dimmer').hide();
    });
});
