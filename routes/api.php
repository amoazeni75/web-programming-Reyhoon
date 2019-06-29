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
Route::resource('buyers.transactions','Buyer\BuyerTransactionController', ['only' => ['index']]);
Route::resource('buyers.products','Buyer\BuyerProductController', ['only' => ['index']]);
Route::resource('buyers.sellers','Buyer\BuyerSellerController', ['only' => ['index']]);
Route::resource('buyers.categories','Buyer\BuyerCategoryController', ['only' => ['index']]);


Route::resource('categories','Category\CategoryController', ['except' => ['create', 'edit']]);
Route::resource('categories.products','Category\CategoryProductController', ['only' => ['index']]);
Route::resource('categories.sellers','Category\CategorySellerController', ['only' => ['index']]);
Route::resource('categories.transactions','Category\CategoryTransactionController', ['only' => ['index']]);
Route::resource('categories.buyers','Category\CategoryBuyerController', ['only' => ['index']]);

Route::resource('products','Product\ProductController', ['only' => ['index', 'show']]);

Route::resource('sellers','Seller\SellerController', ['only' => ['index', 'show']]);

Route::resource('transactions','Transaction\TransactionController', ['only' => ['index', 'show']]);

//following route means /api/transactions/transaction_id/categories  it will concate and product by it self
Route::resource('transactions.categories','Transaction\TransactionCategoryController', ['only' => ['index']]);
Route::resource('transactions.sellers','Transaction\TransactionSellerController', ['only' => ['index']]);

Route::resource('users','User\UserController', ['except' => ['create', 'edit']]);
