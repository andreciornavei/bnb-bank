<?php

namespace App\Http\Controllers;

use App\Http\Controllers\_Controller;
use App\Infrastructure\Providers\Storage\AwsS3Provider;
use App\Domain\Usecases\TransactionUploadCheck\TransactionUploadCheckDto;
use App\Domain\Usecases\TransactionUploadCheck\TransactionUploadCheckUseCase;

class TransactionUploadCheckController extends _Controller
{
    private readonly TransactionUploadCheckUseCase $transactionUploadCheckUsecase;

    public function __construct()
    {
        $this->middleware('auth:api');
        $this->transactionUploadCheckUsecase = new TransactionUploadCheckUseCase(
            new AwsS3Provider()
        );
    }

    public function handler()
    {
        $user = auth()->user();
        $signedUrl = $this->transactionUploadCheckUsecase->handler(new TransactionUploadCheckDto([
            "user_id" => $user->_id
        ]));
        return response()->json(["url" => $signedUrl]);
    }
}
