<?php

namespace App\Transformers;

use App\Address;
use League\Fractal\TransformerAbstract;

class AddressTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Address $address)
    {

        return [
            'identifier'    => (int)$address->id,
            'city'          => (string)$address->city,
            'area'          => (string)$address->area,
            'addressLine'   => (string)$address->addressLine,
            'restaurant_id' => (int)$address->restaurant_id,
            'creationDate'  => (string)$address->created_at,
            'lastChange'    => (string)$address->updated_at,
            'deletedDate'   => (string)$address->deleted_at,
        ];
    }

    public static function originalAttribute($index)
    {
        $attributes = [
            'identifier'    => 'id',
            'city'          => 'city',
            'area'          => 'area',
            'addressLine'   => 'addressLine',
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
            'city'          => 'city',
            'area'          => 'area',
            'addressLine'   => 'addressLine',
            'restaurant_id' => 'restaurant_id',
            'created_at'    => 'creationDate',
            'updated_at'    => 'lastChange',
            'deleted_at'    => 'deletedDate',
        ];

        return isset($attributes[$index]) ? $attributes[$index] : null;
    }

}
