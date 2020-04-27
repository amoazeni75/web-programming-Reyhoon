<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class FoodsetRestaurantTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('foodset_restaurant', function (Blueprint $table) {
            $table->integer('foodset_id')->unsigned();
            $table->integer('restaurant_id')->unsigned();

            $table->foreign('foodset_id')->references('id')->on('foodsets');
            $table->foreign('restaurant_id')->references('id')->on('restaurants');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('foodset_restaurant');
    }
}
