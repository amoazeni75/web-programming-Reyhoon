dictionary_e_to_p = {sandwich:"ساندویچ" ,
    burger:"برگر",
    pizza:"پیتزا",
    kebab:"کباب",
    salad:"سالاد",
    iranian : "ایرانی",
    pasta : "پاستا",
    fish : "ماهی",
    breakfast : "صبحانه" ,
    juice : "آبمیوه طبیعی" ,
    steak: "استیک" ,
    soup : "سوپ",
    fastfood : "فست فود"};

foodDivContainerWithImage = document.getElementById("food_container_image");
foodDivContainerWithOutImage = document.getElementById("food_container_no_image");

restaurantContainerWithImage = document.getElementById("top_3_rest");
restaurantContainerWithoutImage = document.getElementById("restaurant_no_image");

getDataFromServer("http://demo2469824.mockable.io/foods", loadFoods);
getDataFromServer("http://demo2469824.mockable.io/best-restaurants", loadBestRestaurant);


function getDataFromServer(url, cFunction) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cFunction(this);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function loadFoods(xhttp) {
    let xmlDOM = xhttp.responseXML;
    let foods = xmlDOM.getElementsByTagName("food");
    for (let i = 0; i < foods.length; i++) {
        let count = foods[i].getElementsByTagName("count")[0].childNodes[0].nodeValue;
        let name = foods[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
        if(i < 4) {
            let imgURL = foods[i].getElementsByTagName("imgUrl")[0].childNodes[0].nodeValue;
            createFoodWithImage(name, imgURL, count);
        }
        else
            createFoodWithoutImage(name);
    }
}

function loadBestRestaurant(xhttp) {
    let jsonDOM = JSON.parse(xhttp.responseText);
    let restaurants = jsonDOM.restaurants;
    for (let i = 0; i < restaurants.length; i++) {
        if(i < 3)
            createBestRestaurantWithImage(restaurants[i]);
        else
            createBestRestaurantWithoutImage(restaurants[i]);
    }
}

function createFoodWithImage(name, imgUrl, count) {
    let outerDiv = document.createElement("div");
    outerDiv.classList.add("m_sec6_food_1_data");

    let a_element = document.createElement("a");
    a_element.classList.add("m_sec6_food_1_a");
    a_element.style.backgroundImage = "url('" + imgUrl + "')";
    a_element.style.backgroundRepeat = "no-repeat";
    a_element.style.backgroundSize = "cover";
    a_element.style.backgroundPosition = "center";
    outerDiv.appendChild(a_element);

    let emptyDiv = document.createElement("div");
    emptyDiv.classList.add("m_sec6_food_1_empty");
    a_element.appendChild(emptyDiv);

    let detailDiv = document.createElement("div");
    detailDiv.classList.add("m_sec6_food_1_detail");
    a_element.appendChild(detailDiv);

    let foodName = document.createElement("h2");
    foodName.classList.add("m_sec6_food_1_name");
    foodName.innerHTML = dictionary_e_to_p[name];
    detailDiv.appendChild(foodName);

    let foodCount = document.createElement("p");
    foodCount.classList.add("m_sec6_food_1_active_status");
    foodCount.innerHTML = count + " رستوران فعال" ;
    detailDiv.appendChild(foodCount);

    foodDivContainerWithImage.appendChild(outerDiv);
}

function createFoodWithoutImage(name) {
    let a_link = document.createElement("a");
    a_link.classList.add("m_sec6_food_1_more_a");
    a_link.innerHTML = dictionary_e_to_p[name];
    foodDivContainerWithOutImage.appendChild(a_link);
}

function createBestRestaurantWithImage(rest) {
    let div_outer = document.createElement("div");
    div_outer.classList.add("m_ranking_inner1");

    let inner_div = document.createElement("div");
    inner_div.classList.add("m_ranking_inner2");
    inner_div.classList.add("m_ranking_inner3");
    inner_div.classList.add("branch-card");
    div_outer.appendChild(inner_div);


    let a_link = document.createElement("a");
    a_link.classList.add("m_ranking_a");
    inner_div.appendChild(a_link);

    let empty_div = document.createElement("div");
    empty_div.classList.add("m_ranking_empty");
    a_link.appendChild(empty_div);

    let detail_div = document.createElement("div");
    detail_div.classList.add("m_ranking_outter_div_1");
    a_link.appendChild(detail_div);

    let res_detail = document.createElement("div");
    res_detail.classList.add("m_ranking_container_3box");
    detail_div.appendChild(res_detail);

    let div_img = document.createElement("div");
    div_img.classList.add("m_ranking_img_con_1");
    div_img.classList.add("m_ranking_img_con_2");
    res_detail.appendChild(div_img);

    let img_tag = document.createElement("img");
    img_tag.classList.add("m_ranking_img_box_1");
    img_tag.classList.add("promoted-restaurants-img");
    img_tag.src = rest.imgUrl;
    div_img.appendChild(img_tag);

    let div_rank = document.createElement("div");
    div_rank.classList.add("m_ranking_text_describ");
    res_detail.appendChild(div_rank);

    let res_name = document.createElement("h2");
    res_name.classList.add("m_ranking_dec_header");
    res_name.innerHTML = rest.name;
    div_rank.appendChild(res_name);

    let div_start = document.createElement("div");
    div_start.classList.add("m_ranking_start_outter");
    div_rank.appendChild(div_start);

    let rate_p = document.createElement("p");
    rate_p.classList.add("m_ranking_start_number");
    rate_p.innerHTML = rest.rate;
    div_start.appendChild(rate_p);

    ////star here
    var nat = parseFloat(rest.rate);

    var diff = nat - Math.floor(nat);
    if(diff < 0.25){
        let empty_star = document.createElement("img");
        empty_star.src = "../mocks/empty_star.png";
        div_start.appendChild(empty_star);
    }else if(diff >= 0.25 && diff < 0.5){
        let empty_star = document.createElement("img");
        empty_star.src = "../mocks/1_2_star.png";
        div_start.appendChild(empty_star);
    }else if(diff >= 0.5 && diff < 0.75){
        let empty_star = document.createElement("img");
        empty_star.src = "../mocks/half_star.png";
        div_start.appendChild(empty_star);
    }
    else if(diff >= 0.75 && diff <= 0.8){
        let empty_star = document.createElement("img");
        empty_star.src = "../mocks/3_4_star.png";
        div_start.appendChild(empty_star);
    }else{
        let span_full = document.createElement("img");
        empty_star.src = "../mocks/full_star.png";
        div_start.appendChild(empty_star);
    }
    for (let i = 0; i < Math.floor(nat); i++) {
        let span_full = document.createElement("img");
        span_full.src = "../mocks/full_star.png";
        div_start.appendChild(span_full);
    }
    let numRate = document.createElement("span");
    numRate.classList.add("m_ranking_start_span_1");
    numRate.innerHTML = "(" + rest.numOfRates + ")";
    div_start.appendChild(numRate);


    let foodList = document.createElement("ul");
    foodList.classList.add("m_ranking_food_category");
    detail_div.appendChild(foodList);

    for (let i = 0; i < rest.foods.length; i++) {
        let foodItem = document.createElement("li");
        foodItem.classList.add("m_ranking_food_category_item");
        foodItem.innerHTML = dictionary_e_to_p[rest.foods[i]];
        foodList.appendChild(foodItem);
    }

    let res_address = document.createElement("address");
    res_address.classList.add("m_ranking_food_category_add");
    res_address.title = rest.address;
    res_address.innerHTML = rest.address;
    detail_div.appendChild(res_address);

    let order_button = document.createElement("button");
    order_button.classList.add("rey-btn");
    order_button.classList.add("m_ranking_food_order_1");
    order_button.classList.add("m_ranking_food_order_2");
    order_button.classList.add("m_ranking_food_order_3");
    order_button.innerHTML = "شروع سفارش";
    detail_div.appendChild(order_button);

    restaurantContainerWithImage.appendChild(div_outer);
}

function createBestRestaurantWithoutImage(rest) {
    let a_link = document.createElement("a");
    a_link.classList.add("promoted-restaurants-link");

    let image_back = document.createElement("img");
    image_back.classList.add("promoted-restaurants-img");
    a_link.appendChild(image_back);
    image_back.src = rest.imgUrl;

    let h_name = document.createElement("h3");
    h_name.classList.add("promoted-restaurants-res_name-");
    h_name.innerHTML = rest.name;
    a_link.appendChild(h_name);

    restaurantContainerWithoutImage.appendChild(a_link);
}
