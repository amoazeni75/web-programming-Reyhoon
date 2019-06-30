<?php

namespace App;

use App\Restaurant;
use App\Transformers\FoodTransformer;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Food extends Model
{
    use SoftDeletes;
    public $transformer = FoodTransformer::class;
    protected $dates = ['deleted_at'];
    protected $fillable = [
        'name',
        'price',
        'description',
        'foodSet',
        'retaurant_id',
    ];
     public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }
}
