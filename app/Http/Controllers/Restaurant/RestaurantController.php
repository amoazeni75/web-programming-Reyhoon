<?php

namespace App\Http\Controllers\Restaurant;

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
    public function index()
    {
        $restaurants = Restaurant::all();
        
        foreach ($restaurants as $rest) {
            $this->buildDetailsOfRestaurant($rest);
        }   
        return response()->json($restaurants, 200);
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
}
