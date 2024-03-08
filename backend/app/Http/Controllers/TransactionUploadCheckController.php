<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\_Controller;
use App\Infrastructure\Providers\Storage\AwsS3Provider;
use App\Domain\Usecases\TransactionUploadCheck\TransactionUploadCheckDto;
use App\Domain\Usecases\TransactionUploadCheck\TransactionUploadCheckUseCase;

class TransactionUploadCheckController extends _Controller
{
    private readonly TransactionUploadCheckUseCase $transactionUploadCheckUsecase;

    public function __construct()
    {
        $this->transactionUploadCheckUsecase = new TransactionUploadCheckUseCase(
            new AwsS3Provider()
        );
    }

    public function handler(Request $request)
    {
        $user = auth()->user();
        $filename = $request->query(("filename"));
        $signedUrl = $this->transactionUploadCheckUsecase->handler(new TransactionUploadCheckDto([
            "user_id" => $user->_id,
            "filename" => $filename
        ]));
        return response()->json($signedUrl->toJson());
    }
}
