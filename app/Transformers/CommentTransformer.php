<?php

namespace App\Transformers;

use App\Comment;
use League\Fractal\TransformerAbstract;

class CommentTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Comment $comment)
    {
        return [
            'identifier'    => (int)$comment->id,
            'author'        => (string)$comment->author,
            'quality'       => (double)$comment->quality,
            'packing'       => (double)$comment->packing,
            'deliveryRate'  => (double)$comment->deliveryRate,
            'text'          => (string)$comment->text,
            'restaurant_id' => (int)$comment->restaurant_id,
            'creationDate'  => (string)$comment->created_at,
            'lastChange'    => (string)$comment->updated_at,
            'deletedDate'   => (string)$comment->deleted_at,
        ];
    }

    public static function originalAttribute($index)
    {
        $attributes = [
            'identifier'    => 'id',
            'author'        => 'author',
            'quality'       => 'quality',
            'packing'       => 'packing',
            'deliveryRate'  => 'deliveryRate',
            'text'          => 'text',
            'restaurant_id' => 'restaurant_id',
            'creationDate'  => 'created_at',
            'lastChange'    => 'updated_at',
            'deletedDate'   => 'deleted_at',
        ];

        return isset($attributes[$index]) ? $attributes[$index] : null;
    }

    public static function transformedAttribute($index)
    {
        $attributes = [
            'id'            => 'identifier',
            'author'        => 'author',
            'quality'       => 'quality',
            'packing'       => 'packing',
            'deliveryRate'  => 'deliveryRate',
            'text'          => 'text',
            'retaurant_id'  => 'restaurant_id',
            'created_at'    => 'creationDate',
            'updated_at'    => 'lastChange',
            'deleted_at'    => 'deletedDate',
        ];

        return isset($attributes[$index]) ? $attributes[$index] : null;
    }

}
