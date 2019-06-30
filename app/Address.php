<?php

namespace App;

use App\Restaurant;
use Illuminate\Database\Eloquent\Model;
use App\Transformers\AddressTransformer;
use Illuminate\Database\Eloquent\SoftDeletes;

class Address extends Model
{
    use SoftDeletes;
    public $transformer = AddressTransformer::class;
    protected $dates = ['deleted_at'];
    protected $fillable = [
        'city',
        'area',
        'addressLine',
        'retaurant_id',
    ];

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }
}
