<?php

namespace App;

use App\Transaction;

class Buyer extends User
{
	//defining relation between models, a buyer has many transactions
	//the name of function is same as name of relation
    public function transactions(){
    	return $this->hasMany(Transaction::class);
    }
}
