<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Authenticate;
use App\Http\Middleware\PolicyOnlyAdmin;
use App\Http\Middleware\PolicyOnlyCustomer;
use App\Http\Controllers\AuthLoginController;
use App\Http\Controllers\AuthLogoutController;
use App\Http\Controllers\AuthRegisterController;
use App\Http\Controllers\AuthUserDataController;
use App\Http\Controllers\TransactionCreateController;
use App\Http\Controllers\UserBalanceSummaryController;
use App\Http\Controllers\TransactionCheckUrlController;
use App\Http\Controllers\TransactionFindForUserController;
use App\Http\Controllers\TransactionFindPendingController;
use App\Http\Controllers\TransactionUploadCheckController;
use App\Http\Controllers\TransactionUpdateStatusController;

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
    Route::post('auth/logout', [AuthLogoutController::class, 'handler']);
    Route::get('auth/me', [AuthUserDataController::class, 'handler']);
    Route::group(['middleware' => PolicyOnlyAdmin::class], function () {
        Route::get('transactions/pendings', [TransactionFindPendingController::class, 'handler']);
        Route::get("transactions/{id}/document", [TransactionCheckUrlController::class, "handler"]);
        Route::put('transactions/{id}/{status}', [TransactionUpdateStatusController::class, 'handler']);
    });
    Route::group(['middleware' => PolicyOnlyCustomer::class], function () {
        Route::get("balance/summary", [UserBalanceSummaryController::class, 'handler']);
        Route::post('transactions', [TransactionCreateController::class, 'handler']);
        Route::get('transactions', [TransactionFindForUserController::class, 'handler']);
        Route::get('transactions/upload', [TransactionUploadCheckController::class, 'handler']);
    });
});
