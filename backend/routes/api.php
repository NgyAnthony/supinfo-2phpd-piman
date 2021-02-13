<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodolistController;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/token', [AuthController::class, 'requestToken']);
Route::post('/register', [AuthController::class, 'store']);
Route::middleware('auth:sanctum')->post('/add-todolist', [TodolistController::class, 'store']);
Route::middleware('auth:sanctum')->get('/get-todolists', [TodolistController::class, 'index']);
