<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\_Controller;
use App\Infrastructure\Providers\Storage\AwsS3Provider;
use App\Domain\Usecases\TransactionCreate\TransactionCreateDto;
use App\Infrastructure\Repositories\EloquentUpdateUserRepository;
use App\Domain\Usecases\TransactionCreate\TransactionCreateUseCase;
use App\Domain\Usecases\UserUpdateBalance\UserUpdateBalanceUseCase;
use App\Infrastructure\Repositories\EloquentCreateTransactionRepository;

class TransactionCreateController extends _Controller
{
    private TransactionCreateUseCase $transactionCreateUsecase;
    public function __construct()
    {
        $this->transactionCreateUsecase = new TransactionCreateUseCase(
            new AwsS3Provider(),
            new EloquentCreateTransactionRepository(),
            new UserUpdateBalanceUseCase(new EloquentUpdateUserRepository())
        );
    }

    public function handler(Request $request)
    {
        try {
            // get authenticated user
            $user = auth()->user();
            // execute registration usecase
            $transaction = $this->transactionCreateUsecase->handler(new TransactionCreateDto([
                "description" => $request->input("description"),
                "factor" => $request->input("factor"),
                "amount" => $request->input("amount"),
                "document" => $request->input("document"),
                "userId" => $user->_id,
                "userEmail" => $user->email,
                "userUsername" => $user->username,
                "userBalance" => $user->balance,
            ]));
            // return created user
            return response()->json($transaction->toJson());
        } catch (Exception $error) {
            // return error message if something happens
            return response()->json(json_decode($error->getMessage()), 400);
        }
    }
}
