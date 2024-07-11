<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\category;
// use App\Models\product;
use App\Http\Controllers\CategoryController;
use App\Http\Resources\CategoryResource;
// use App\Http\Controllers\ProductController;
// use App\Http\Resources\ProductResource;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AdviceController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\CartController;


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

Route::get('/categories/{id}', function($id) {
    return new CategoryResource(category::findOrFail($id));
});

Route::get('/categories', function() {
    return CategoryResource::collection(category::all());
});

// Route::put('/category/{id}', [CategoryController::class, 'update']);
// Route::put('categories/{id}', [CategoryController::class, 'update']); // This line is crucial for PUT requests
Route::post('/categories/{id}', [CategoryController::class, 'update']);


Route::delete('/category/{id}', [CategoryController::class, 'destroy']);
Route::post('/categories', [CategoryController::class, 'store']);

// Route::apiResource('products' , App\Http\Controllers\Api\ProductController::class);
// Route::apiResource('products' , App\Http\Controllers\ProductController::class);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Route::post('/users', [UserController::class, 'store']);

Route::apiResource('users', UserController::class);
// Route::post('/users/{id}', [ProductController::class, 'update']);

Route::post('login', [AuthController::class, 'login']);

Route::apiResource('products', ProductController::class);
Route::get('categories/{categoryId}/products', [ProductController::class, 'getProductsByCategory']);
// Route::get('categories/{hashedCategoryId}/products', [ProductController::class, 'getProductsByCategory']);
Route::post('/products/{id}', [ProductController::class, 'update']);


Route::apiResource('advices', AdviceController::class);
Route::post('/advices/{id}', [AdviceController::class, 'update']);


Route::apiResource('exercises', ExerciseController::class);

Route::apiResource('cart', CartController::class);

// Route::post('/api/cart/add', 'CartController@addToCart');

// Route::post('/cart/add', [CartController::class, 'store']);

Route::post('/cart/add', [CartController::class, 'store']);

// Route::get('/cart', [CartController::class, 'index']);
// // Route::post('/cart/add', [CartController::class, 'store']);
// Route::get('/cart/{id}', [CartController::class, 'show']);
// Route::put('/cart/{id}', [CartController::class, 'update']);
// Route::delete('/cart/{id}', [CartController::class, 'destroy']);


