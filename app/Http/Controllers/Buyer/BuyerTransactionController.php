<?php

namespace App\Http\Controllers\Buyer;

use App\Buyer;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;

class BuyerTransactionController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Buyer $buyer)
    {
        //this will call transactions function in buyer model, so we get all transaction // beacuse there is a direct relation between buyer and transaction(two tables // are connected with foreign key directly)
        $transactions = $buyer->transactions; 
        return $this->showAll($transactions);
    }

 
}
