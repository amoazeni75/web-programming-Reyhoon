<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

/*
Register a route for buyers, if you go to terminal and type php artisan route:list then
you see a table that shows all work we can do in our request
for example /api/buyers.index will return list of all buyer
third paremeter is for saying to laravel that resterict this route just to show all buyer
or specific buyer because we do not want that people can dirceltly create,delete or update buyers from this api and in next we provide these action for user route, because it's user duty to do these
*/
Route::resource('buyers','Buyer\BuyerController', ['only' => ['index', 'show']]);

Route::resource('categories','Category\CategoryController', ['except' => ['create', 'edit']]);

Route::resource('products','Product\ProductController', ['only' => ['index', 'show']]);

Route::resource('sellers','Seller\SellerController', ['only' => ['index', 'show']]);

Route::resource('transactions','Transaction\TransactionController', ['only' => ['index', 'show']]);

Route::resource('users','User\UserController', ['except' => ['create', 'edit']]);
