<?php

namespace App;

use App\Restaurant;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Food extends Model
{
    use SoftDeletes;
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
