<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Authenticate;
use App\Http\Middleware\PolicyOnlyAdmin;
use App\Http\Middleware\PolicyOnlyCustomer;
use App\Http\Controllers\AuthLoginController;
use App\Http\Controllers\AuthRegisterController;
use App\Http\Controllers\AuthUserDataController;
use App\Http\Controllers\TransactionCreateController;
use App\Http\Controllers\TransactionFindForUserController;
use App\Http\Controllers\TransactionFindPendingController;
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

Route::group(['middleware' => Authenticate::class], function () {
    Route::get('auth/me', [AuthUserDataController::class, 'handler']);
    Route::group(['middleware' => PolicyOnlyAdmin::class], function () {
        Route::get('transactions/pendings', [TransactionFindPendingController::class, 'handler']);
    });
    Route::group(['middleware' => PolicyOnlyCustomer::class], function () {
        Route::post('transactions', [TransactionCreateController::class, 'handler']);
        Route::get('transactions', [TransactionFindForUserController::class, 'handler']);
        Route::post('transactions/upload', [TransactionUploadCheckController::class, 'handler']);
    });
});
