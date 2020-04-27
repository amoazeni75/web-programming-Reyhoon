<?php

namespace App\Http\Controllers\Buyer;

use App\Buyer;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;

class BuyerCategoryController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Buyer $buyer)
    {
        // because each byer has some transactions, and each transactios contains a 
        // product and each product belongs to some category, so we get
        // array of array that has repeated categories inside them
        // to solve this problem use collapse() method, this method create unique
        // list from listes inside it
        $categories = $buyer->transactions('prduct.categories')
        ->get()
        ->pluck('product.categories')
        ->collapse();
        
        return $this->showAll($categories);
    }

   
}
