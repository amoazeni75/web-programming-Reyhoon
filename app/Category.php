<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Product;

class Category extends Model
{
	/**
	about fillale model : this is a field of class Model
	it contains some parameter that are need for creation and edit the model
	it is better that does not include some parameter like foreign key
	because it is better user can not set it directly
	in short describe : it is the list of allowable paremeter that can change
	*/
    protected $fillable = [
    	'name',
    	'description',
    ];

    public function products(){
    	return $this->belongsToMany(Product::class);
    }
}
