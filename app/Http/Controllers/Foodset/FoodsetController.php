<?php

namespace App\Http\Controllers\Foodset;

use App\Foodset;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;

class FoodsetController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $foodsets = Foodset::all();
        return $this->showAll($foodsets);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rules = [
            'name'          => 'required',
        ];
        $this->validate($request, $rules);
        
       
        Foodset::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Foodset  $foodset
     * @return \Illuminate\Http\Response
     */
    public function show(Foodset $foodset)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Foodset  $foodset
     * @return \Illuminate\Http\Response
     */
    public function edit(Foodset $foodset)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Foodset  $foodset
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Foodset $foodset)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Foodset  $foodset
     * @return \Illuminate\Http\Response
     */
    public function destroy(Foodset $foodset)
    {
        //
    }
}
