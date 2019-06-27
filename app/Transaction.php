<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Product;
use App\Buyer;


class Transaction extends Model
{
   protected $fillable = [
    	'quantity',
    	'buyer_id',
    	'product_id',
    ];

    //each foreign key == belognsTo

    public function buyer(){
    	return $this->belognsTo(Buyer::class);
    }

    public function product(){
    	return $this->belognsTo(Product::class);
    }
}
