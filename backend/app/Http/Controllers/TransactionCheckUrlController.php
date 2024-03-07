<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\_Controller;
use App\Infrastructure\Providers\Storage\AwsS3Provider;
use App\Domain\Usecases\TransactionCheckUrl\TransactionCheckUrlDto;
use App\Domain\Usecases\TransactionCheckUrl\TransactionCheckUrlUseCase;
use App\Infrastructure\Repositories\EloquentFindTransactionRepository;

class TransactionCheckUrlController extends _Controller
{
    private TransactionCheckUrlUseCase $transactionCheckUrlUsecase;
    public function __construct()
    {
        $this->transactionCheckUrlUsecase = new TransactionCheckUrlUseCase(
            new EloquentFindTransactionRepository(),
            new AwsS3Provider()
        );
    }

    public function handler(Request $request, $id)
    {
        try {
            // execute signer url document
            $url = $this->transactionCheckUrlUsecase->handler(new TransactionCheckUrlDto([
                "transaction_id" => $id,
            ]));
            // return signer url for document
            return response()->json(["url" => $url]);
        } catch (Exception $error) {
            // return error message if something happens
            return response()->json(json_decode($error->getMessage()), 400);
        }
    }
}
