<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    use SoftDeletes;
    protected $dates = ['deleted_at'];
    protected $fillable = [
        'author',
        'quality',
        'packing',
        'deliveryRate',
        'text',
        'retaurant_id',
    ];

     public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }
}
