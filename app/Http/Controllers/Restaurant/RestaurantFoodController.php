<?php

namespace App\Http\Controllers\Restaurant;

use App\Food;
use App\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\ApiController;

class RestaurantFoodController extends ApiController
{

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Restaurant $restaurant)
    {
        $rules = [
            'name'          => 'required',
            'foodSet'       => 'required',
            'description'   => 'required',
            'price'         => 'required|numeric',
        ];
        $this->validate($request, $rules);

        DB::table('foods')->insert(
            [
                'name'          => $request->name,
                'foodSet'       => $request->foodSet,
                'description'   => $request->description,   
                'price'         => $request->price,
                'restaurant_id' => $restaurant->id, 
            ]
        );
        
    }

}
