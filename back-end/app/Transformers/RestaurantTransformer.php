<?php

namespace App\Transformers;

use App\Restaurant;
use League\Fractal\TransformerAbstract;

class RestaurantTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Restaurant $restaurant)
    {
        return [
            'identifier'    => (int)$restaurant->id,
            'name'          => (string)$restaurant->name,
            'logoAddress'   => (string)$restaurant->logo,
            'city'          => (string)$restaurant->city,
            'area'          => (string)$restaurant->area,
            'addressLine'   => (string)$restaurant->addressLine,
            'categories'    => (array)$restaurant->foodsets,
            'openingTime'   => (int)$restaurant->openingTime,
            'closingTime'   => (int)$restaurant->closingTime,
            'creationDate'  => (string)$restaurant->created_at,
            'lastChange'    => (string)$restaurant->updated_at,
            'deletedDate'   => (string)$restaurant->deleted_at,
        ];
    }

    public static function originalAttribute($index)
    {
        $attributes = [
            'identifier'    => 'id',
            'name'          => 'name',
            'logoAddress'   => 'logo',
            'city'          => 'city',
            'area'          => 'area',
            'categories'    => 'categories',
            'addressLine'   => 'addressLine',
            'openingTime'   => 'openingTime',
            'closingTime'   => 'closingTime',
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
            'name'          => 'name',
            'logo'          => 'logoAddress',
            'city'          => 'city',
            'area'          => 'area',
            'categories'    => 'categories',
            'addressLine'   => 'addressLine',
            'openingTime'   => 'openingTime',
            'closingTime'   => 'closingTime',
            'created_at'    => 'creationDate',
            'updated_at'    => 'lastChange',
            'deleted_at'    => 'deletedDate',
        ];

        return isset($attributes[$index]) ? $attributes[$index] : null;
    }

}
