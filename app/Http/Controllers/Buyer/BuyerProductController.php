<?php

namespace App\Http\Controllers\Buyer;

use App\Buyer;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;

class BuyerProductController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Buyer $buyer)
    {
        // all of names bellow are names of functions in each model
        // here transactions return an array so we can not access product as noraml way
        // so next line will not work
        // we will use Eager  
        //$products = $buyer->transactions->product;
        $products = $buyer->transactions()->with('product')
            ->get()
            ->pluck('product');
        //pluck will get from an array specific target
        // now first we get all transactions of a buyer then join result to
        // product table inaccorance to get products name    
        return $this->showAll($products);
    }

   
}
