<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\_Controller;

use App\Domain\Usecases\TransactionFind\TransactionFindDto;
use App\Domain\Usecases\TransactionFind\TransactionFindUseCase;
use App\Infrastructure\Repositories\EloquentFindTransactionRepository;

class TransactionFindPendingController extends _Controller
{
    private TransactionFindUseCase $transactionFindUsecase;
    public function __construct()
    {
        $this->transactionFindUsecase = new TransactionFindUseCase(
            new EloquentFindTransactionRepository()
        );
    }

    public function handler(Request $request)
    {
        try {
            // execute registration usecase
            $transactions = $this->transactionFindUsecase->handler(new TransactionFindDto([
                "filter_user_id" => null,
                "filter_id" => $request->query("id"),
                "limit" => $request->query("limit", 10),
                "cursor" => $request->query("cursor"),
                "filter_status" => ["pending"]
            ]));
            // return created user
            return response()->json($transactions);
        } catch (Exception $error) {
            // return error message if something happens
            return response()->json(json_decode($error->getMessage()), 400);
        }
    }
}
