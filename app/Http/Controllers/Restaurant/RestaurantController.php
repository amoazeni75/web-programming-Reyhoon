<?php

namespace App\Http\Controllers\Restaurant;

use App\Address;
use App\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\ApiController;

class RestaurantController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {   

        $restaurants = array();
        if($request->has('area') && $request->has('city')){
            $cate = 'empty';
            if( $request->has('categories')){
                $cate = $request->get('categories');
            }
            $restaurants = $this->filterRestaurants(
                $request->get('city'),
                $request->get('area'), 
                $cate);

        }
        else{
            $restaurants = Restaurant::all();
            foreach ($restaurants as $rest) {
                $this->buildDetailsOfRestaurant($rest);
            }   
        }
        return response()->json($restaurants, 200);
    }

    /**
    in this method we try to suggest area to user
    */
    public function search(Request $request){
        if(!($request->has('search') && $request->has('city'))){
         return response()->json("empty", 404);
     }
     $areas = $this->suggestArea($request->get('city'), $request->get('search'));
     return response()->json($areas, 200);
 }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Restaurant  $restaurant
     * @return \Illuminate\Http\Response
     */
    public function show(Restaurant $restaurant)
    {
        $this->buildDetailsOfRestaurant($restaurant);
        return response()->json($restaurant, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Restaurant  $restaurant
     * @return \Illuminate\Http\Response
     */
    public function edit(Restaurant $restaurant)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Restaurant  $restaurant
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Restaurant $restaurant)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Restaurant  $restaurant
     * @return \Illuminate\Http\Response
     */
    public function destroy(Restaurant $restaurant)
    {
        //
    }

    /**
    append address,foods and categories of a restaurant into it
    */
    private function buildDetailsOfRestaurant(Restaurant $restaurant){
        //append address
        $this->appendAddressToRestaurant($restaurant);
        
        //append category
        $this->appendCategoryToRestaurant($restaurant);

        //append foods
        $this->appendFoodsToRestaurant($restaurant);

        //append average rating
        $this->appendAverageRatingToRestaurant($restaurant);
    }

    /**
    suggest area to user depends on it's input
    */
    private function suggestArea($city, $searchInput){
        $addresses = Address::where('city', $city)->get();
        $areas = array();
        foreach ($addresses as $address) {

            if(strlen($address->area) >= strlen($searchInput)){

                $sub = substr($address->area, 0, strlen($searchInput));
                
                if(strcasecmp($sub, $searchInput) == 0){
                    array_push($areas, $address->area); 
                }
            }
        }
        //remove duplicates elements
        $areas = array_unique($areas);
        return $areas;
    }

    private function filterRestaurants($city, $area, $categories){

        $result_temp = array();
        $result = array();
        $categories = str_replace('[','',$categories);
        $categories = str_replace(']','',$categories);
        $categories = explode("/",$categories);
        
        //get list of restaurant in specified city and area      
        $resturantsInCity = DB::table('restaurants')
        ->join('addresses','restaurants.id', '=', 'addresses.restaurant_id')
        ->where('addresses.city', '=', $city)
        ->where('addresses.area' , '=', $area)
        ->get();

        $addAll = false;
        //check category
        if($categories[0] == 'empty'){
         $addAll = true;
     }

     foreach ($resturantsInCity as $restaurant) {
        $acceptable = false;
        $foods = DB::table('foods')
        ->where('foods.restaurant_id', '=', $restaurant->restaurant_id)
        ->get();
        $rest_foods = array();
        foreach($foods as $foo){
            if(in_array($foo->foodSet, $categories)){
                $acceptable = true;
            }
            array_push($rest_foods, $foo->foodSet);
        }
        if($acceptable == true || $addAll){
            $rest_foods = array_unique($rest_foods);
            array_push($result_temp, $restaurant);
        }
    }


        //adding category
    foreach ($result_temp as $res_tmp) {
        $rest = Restaurant::find($res_tmp->id);
        $this->appendAddressToRestaurant($rest);
        $this->appendCategoryToRestaurant($rest);
        $this->appendAverageRatingToRestaurant($rest);
        array_push($result, $rest);
    }
    return $result;
}

private function appendAddressToRestaurant(Restaurant $restaurant){
    $restaurant['city'] = $restaurant->address['city'];
    $restaurant['area'] = $restaurant->address['area'];
    $restaurant['addressLine'] = $restaurant->address['addressLine'];
}

private function appendCategoryToRestaurant(Restaurant $restaurant){
   $rest_foodset = array();
   $categories = $restaurant->foodsets;
   foreach($categories as $category){
    $temp_category = array("id"=>$category->id, "name"=>$category->name);
    array_push($rest_foodset, $temp_category);
}
$restaurant['categories'] = $rest_foodset;
}

private function appendFoodsToRestaurant(Restaurant $restaurant){
    $rest_foods = array();
    $foods = $restaurant->foods;
    foreach($foods as $foo){
        $temp_category = array(
            "id"=>$foo->id,
            "name"=>$foo->name,
            "category" => $foo->foodSet,
            "description" => $foo->description,
            "price" => $foo->price,
        );
        array_push($rest_foods, $temp_category);
    }
    $restaurant['foods'] = $rest_foods;
}

private function appendAverageRatingToRestaurant(Restaurant $restaurant){
    $comments = $restaurant->comments;
    $average_rating = 0.0;
    if(sizeof($comments) != 0){
        foreach($comments as $com){
            $average_rating += $com->quality; 
        }
        $average_rating /= sizeof($comments);
    }
    $restaurant['average_rating'] = $average_rating;
}

}
