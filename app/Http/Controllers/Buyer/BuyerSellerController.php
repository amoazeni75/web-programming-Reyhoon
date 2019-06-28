<?php

namespace App\Http\Controllers\Buyer;

use App\Buyer;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;

class BuyerSellerController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Buyer $buyer)
    {
        // bellow command first get aLL transactions of a buyer
        // then join the to product table and next join the last result to 
        // seller table, in the final stage we hava array of tansactions that each of  // them contains product, inside product we have sellers 
        // we can have repeated sellers, so we should remove them
        // but unique('id') method just return whoes that are just one time in result
        // so if we have two same seller(ali, ali) then unique method will remove both // of them, for solving this problem we use values() method to recreat result  // without repeatation
        $sellers = $buyer->transactions()->with('product.seller')
        ->get()
        ->pluck('product.seller')
        ->unique('id')
        ->values();
        return $this->showAll($sellers);
    }

   
}
