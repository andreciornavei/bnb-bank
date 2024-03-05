<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Authenticate;
use App\Http\Controllers\AuthLoginController;
use App\Http\Controllers\AuthRegisterController;
use App\Http\Controllers\AuthUserDataController;
use App\Http\Controllers\TransactionCreateController;
use App\Http\Controllers\TransactionFindForUserController;
use App\Http\Controllers\TransactionUploadCheckController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('auth/login', [AuthLoginController::class, 'handler']);
Route::post('auth/register', [AuthRegisterController::class, 'handler']);
Route::get('auth/me', [AuthUserDataController::class, 'handler'])->middleware(Authenticate::class);


Route::group(['middleware' => 'api'], function () {
    Route::post('transactions', [TransactionCreateController::class, 'handler']);
    Route::get('transactions', [TransactionFindForUserController::class, 'handler']);
    Route::post('transactions/upload', [TransactionUploadCheckController::class, 'handler']);
});
