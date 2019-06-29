<?php

namespace App\Http\Controllers\Product;

use App\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;

class ProductBuyerTransactionController extends ApiController
{
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Product $product, User $buyer)
    {
         $rules = [
            'quantity' => 'required|integer|min:1'
        ];
        $this->validate($request, $rules);
        if ($buyer->id == $product->seller_id) {
            return $this->errorResponse('The buyer must be different from the seller', 409);
        }
        if (!$buyer->isVerified()) {
            return $this->errorResponse('The buyer must be a verified user', 409);
        }
        if (!$product->seller->isVerified()) {
            return $this->errorResponse('The seller must be a verified user', 409);
        }
        if (!$product->isAvailable()) {
            return $this->errorResponse('The product is not available', 409);   
        }
    }

}
