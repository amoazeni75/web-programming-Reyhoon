<?php

namespace App;

use App\Restaurant;
use Illuminate\Database\Eloquent\Model;
use App\Transformers\CommentTransformer;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    use SoftDeletes;
    public $transformer = CommentTransformer::class;
    protected $dates = ['deleted_at'];
    protected $fillable = [
        'author',
        'quality',
        'packing',
        'deliveryRate',
        'text',
        'restaurant_id',
    ];

     public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }
}
