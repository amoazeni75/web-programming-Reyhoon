<?php

namespace App\Transformers;

use App\Food;
use League\Fractal\TransformerAbstract;

class FoodTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Food $food)
    {
        return [
            'identifier'    => (int)$food->id,
            'name'          => (string)$food->name,
            'price'         => (double)$food->price,
            'description'   => (string)$food->description,
            'foodSet'       => (string)$food->foodSet,
            'restaurant_id' => (int)$food->restaurant_id,
            'creationDate'  => (string)$food->created_at,
            'lastChange'    => (string)$food->updated_at,
            'deletedDate'   => (string)$food->deleted_at,
        ];
    }

     public static function originalAttribute($index)
    {
        $attributes = [
            'identifier'    => 'id',
            'name'          => 'name',
            'price'         => 'price',
            'description'   => 'description',
            'foodSet'       => 'foodSet',
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
            'id'            =>  'identifier',   
            'name'          =>  'name',  
            'price'         =>  'price',    
            'description'   =>  'description', 
            'foodSet'       =>  'foodSet',     
            'restaurant_id' =>  'restaurant_id',
            'created_at'    =>  'creationDate',
            'updated_at'    =>  'lastChange', 
            'deleted_at'    =>  'deletedDate',  
        ];

        return isset($attributes[$index]) ? $attributes[$index] : null;
    }
}

