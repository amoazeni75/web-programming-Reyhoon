<?php

namespace App;

use App\Restaurant;
use Illuminate\Database\Eloquent\Model;
use App\Transformers\FoodsetTransformer;
use Illuminate\Database\Eloquent\SoftDeletes;

class Foodset extends Model
{
    use SoftDeletes;
 	public $transformer = FoodsetTransformer::class;
    protected $dates = ['deleted_at'];
    protected $fillable = [
        'name',
    ];
    public function restaurants()
    {
        return $this->belongsToMany(Restaurant::class);
    }
}
