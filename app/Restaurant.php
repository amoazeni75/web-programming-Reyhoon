<?php

namespace App;

use App\Food;
use App\Address;
use App\Comment;
use App\Foodset;
use Illuminate\Database\Eloquent\Model;
use App\Transformers\RestaurantTransformer;
use Illuminate\Database\Eloquent\SoftDeletes;

class Restaurant extends Model
{
    use SoftDeletes;
    public $transformer = RestaurantTransformer::class;
    protected $dates = ['deleted_at'];
    protected $fillable = [
        'name',
        'logo',
        'openingTime',
        'closingTime',
        'city',
        'area',
        'addressLine',
        'categories',
        'foods',
    ];
	protected $hidden = [
        'address',
        'foodsets',
        'comments',
    ];
    public function comments()
    {
    	return $this->hasMany(Comment::class);
    }

    public function foods()
    {
    	return $this->hasMany(Food::class);
    }

    public function address()
    {
    	return $this->hasOne(Address::class);
    }

    public function foodsets()
    {
        return $this->belongsToMany(Foodset::class);
    }

}
