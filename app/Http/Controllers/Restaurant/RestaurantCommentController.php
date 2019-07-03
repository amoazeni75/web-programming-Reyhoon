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
        return response()->json($comments, 200);
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
         );
         
        $comment = Comment::create($data);
        return response()->json($comment, 200);
    }

}
