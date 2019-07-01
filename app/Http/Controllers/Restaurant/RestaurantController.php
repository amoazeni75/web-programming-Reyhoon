<?php

namespace App\Http\Controllers\Restaurant;

use App\Address;
use App\Restaurant;
use Illuminate\Http\Request;
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

        if($request->has('category')){
            echo $request->get("category");
        }

        $restaurants = Restaurant::all();
        
        foreach ($restaurants as $rest) {
            $this->buildDetailsOfRestaurant($rest);
        }   
        return response()->json($restaurants, 200);
    }

    /**
    in this method we try to suggest area to user
    */
    public function search(Request $request){
        if(!($request->has('search') && $request->has('city'))){
         return response()->json("there is not suitable input", 404);
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
        $restaurant['city'] = $restaurant->address['city'];
        $restaurant['area'] = $restaurant->address['area'];
        $restaurant['addressLine'] = $restaurant->address['addressLine'];

        //adding category
        $rest_foodset = array();
        $categories = $restaurant->foodsets;
        foreach($categories as $category){
            $temp_category = array("id"=>$category->id, "name"=>$category->name);
            array_push($rest_foodset, $temp_category);
        }
        $restaurant['categories'] = $rest_foodset;

        //adding foods
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

        //calculating average rating
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

    /**
    
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
}
