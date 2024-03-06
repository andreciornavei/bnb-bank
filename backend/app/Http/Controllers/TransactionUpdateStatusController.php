<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\_Controller;
use App\Domain\Usecases\TransactionUpdate\TransactionUpdateDto;
use App\Domain\Usecases\TransactionUpdate\TransactionUpdateUseCase;
use App\Domain\Usecases\UserUpdateBalance\UserUpdateBalanceUseCase;
use App\Infrastructure\Repositories\EloquentFindTransactionRepository;
use App\Infrastructure\Repositories\EloquentUpdateTransactionRepository;
use App\Infrastructure\Repositories\EloquentUpdateUserRepository;

class TransactionUpdateStatusController extends _Controller
{

    private readonly TransactionUpdateUseCase $transactionUpdateUseCase;

    public function __construct()
    {
        $this->transactionUpdateUseCase = new TransactionUpdateUseCase(
            new EloquentUpdateTransactionRepository(),
            new EloquentFindTransactionRepository(),
            new UserUpdateBalanceUseCase(new EloquentUpdateUserRepository())
        );
    }

    public function handler(Request $request, $id, $status)
    {
        try {
            // execute registration usecase
            $transaction = $this->transactionUpdateUseCase->handler(new TransactionUpdateDto([
                "id" => $id,
                "status" => $status,
            ]));
            // return created user
            return response()->json($transaction->toJson());
        } catch (Exception $error) {
            // return error message if something happens
            return response()->json(json_decode($error->getMessage()), 400);
        }
    }
}
