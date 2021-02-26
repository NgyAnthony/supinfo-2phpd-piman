<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FriendController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\WaitingFriendController;
use App\Http\Controllers\WaitingSharedTodolistController;
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

// Authentication
Route::post('/auth/token', [AuthController::class, 'requestToken']);
Route::post('/auth/register', [AuthController::class, 'store']);

// Todolists
Route::middleware('auth:sanctum')->get('/todolist/show', [TodolistController::class, 'index']);
Route::middleware('auth:sanctum')->post('/todolist/create', [TodolistController::class, 'store']);

// Tasks
Route::middleware('auth:sanctum')->post('/task/deactivate', [TaskController::class, 'deactivateTask']);
Route::middleware('auth:sanctum')->post('/task/create', [TaskController::class, 'create']);

// Friends
// Requests
Route::middleware('auth:sanctum')->post('/friend-request/find', [WaitingFriendController::class, 'findUserByEmail']);
Route::middleware('auth:sanctum')->post('/friend-request/send', [WaitingFriendController::class, 'sendFriendRequest']);
Route::middleware('auth:sanctum')->get('/friend-request/show-sent', [WaitingFriendController::class, 'showSentFriendRequests']);
Route::middleware('auth:sanctum')->get('/friend-request/show-received', [WaitingFriendController::class, 'showReceivedFriendRequests']);
Route::middleware('auth:sanctum')->post('/friend-request/accept', [WaitingFriendController::class, 'acceptFriendRequest']);
Route::middleware('auth:sanctum')->post('/friend-request/refuse', [WaitingFriendController::class, 'refuseFriendRequest']);
// Current
Route::middleware('auth:sanctum')->get('/friends/show', [FriendController::class, 'showFriends']);
Route::middleware('auth:sanctum')->post('/friends/remove', [FriendController::class, 'removeFriend']);

// Sharing
Route::middleware('auth:sanctum')->post('/share/send', [WaitingSharedTodolistController::class, 'sendAuthorization']);
Route::middleware('auth:sanctum')->get('/share/show', [WaitingSharedTodolistController::class, 'showAwaiting']);
Route::middleware('auth:sanctum')->post('/share/accept', [WaitingSharedTodolistController::class, 'acceptAuthorization']);
Route::middleware('auth:sanctum')->post('/share/refuse', [WaitingSharedTodolistController::class, 'refuseAuthorization']);

