<?php

namespace App\Http\Controllers\Restaurant;

use App\Comment;
use App\Restaurant;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;

class RestaurantCommentController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Restaurant $restaurant)
    {
        $comments = $restaurant->comments;
        //sort by creation date
        //here we must use the name of parameter that exist in database
        //because here we do not have Transformer object 
        $comments = $comments->sortBy->{'created_at'};

        $average_quality = 0.0;
        $average_packing = 0.0;
        $average_delivery = 0.0;

        $result = array();
        
        foreach ($comments as $com) {
            $average_quality += $com->quality;
            $average_packing += $com->packing;
            $average_delivery += $com->deliveryRate;
            array_push($result, $com);
        }

        $average_quality  /= sizeof($comments); 
        $average_packing  /= sizeof($comments);
        $average_delivery /= sizeof($comments);


        $average_quality  =  intval( $average_quality  * ($p = pow(10, 2))) / $p;
        $average_packing  =  intval( $average_packing  * ($p = pow(10, 2))) / $p;
        $average_delivery =  intval( $average_delivery * ($p = pow(10, 2))) / $p;

        $ratings = array(
            "quality"=> $average_quality,
            "packing" => $average_packing,
            "deliveryRate" => $average_delivery);


        array_push($result, $ratings);

        return response()->json($result, 200)
        ->header('Access-Control-Allow-Credentials', true)
        ->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Headers', 'application/json');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Restaurant $restaurant, Request $request)
    {
        $rules = [
            'author'        => 'required',
            'quality'       => 'required|numeric|min:0|max:5',
            'packing'       => 'required|numeric|min:0|max:5',
            'deliveryRate'  => 'required|numeric|min:0|max:5',
        ];
        $this->validate($request, $rules);
        
        $data = array(
            'restaurant_id' => $restaurant->id,
            'author'        => $request->author,
            'quality'       => $request->quality,
            'packing'       => $request->packing,
            'deliveryRate'  => $request->deliveryRate,
            'text'          => $request->text, 
            'created_at'    => date("Y-m-d H:i:s"),           
         );
         
        $comment = Comment::create($data);
        return response()->json($comment, 200);
    }

}
