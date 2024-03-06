<?php

namespace App\Domain\Usecases\TransactionUpdate;

use App\Exceptions\JsonException;
use Illuminate\Support\Facades\Validator;

use App\Domain\Entities\TransactionEntity;
use App\Domain\Repositories\IFindTransactionRepository\IFindTransactionDto;
use App\Domain\Repositories\IFindTransactionRepository\IFindTransactionRepository;
use App\Domain\Usecases\TransactionUpdate\TransactionUpdateDto;
use App\Domain\Repositories\IUpdateTransactionRepository\IUpdateTransactionDto;
use App\Domain\Repositories\IUpdateTransactionRepository\IUpdateTransactionRepository;
use App\Domain\Usecases\UserUpdateBalance\UserUpdateBalanceDto;
use App\Domain\Usecases\UserUpdateBalance\UserUpdateBalanceUseCase;

class TransactionUpdateUseCase
{
    public function __construct(
        private readonly IUpdateTransactionRepository $updateTransactionRepository,
        private readonly IFindTransactionRepository $findTransactionRepository,
        private readonly UserUpdateBalanceUseCase $userUpdateBalanceUsecase
    ) {
    }

    public function handler(TransactionUpdateDto $dto): TransactionEntity
    {
        // mount payload
        $payload = [
            'id' => $dto->getId(),
            'status' => $dto->getStatus()
        ];

        // create validate schema
        $validator = Validator::make(
            $payload,
            [
                'id' => 'required|string',
                'status' => 'required|in:approved,rejected'
            ]
        );

        // validate provided data
        if ($validator->fails()) {
            throw new JsonException([
                "error" => [
                    "message" => "Validation failed",
                    "fields" => $validator->errors()
                ]
            ]);
        }

        // find transaction by id
        $transactions = $this->findTransactionRepository->handler(new IFindTransactionDto([
            "filter_id" =>  $dto->getId()
        ]));

        // throw an error if no transactions returns
        if (sizeof($transactions) == 0) {
            throw new JsonException([
                "error" => [
                    "message" => "Transaction not founded"
                ]
            ]);
        }

        // throws an error if transaction already approved/reproved
        $transaction = new TransactionEntity($transactions[0]);
        if ($transaction->getStatus() != "pending") {
            throw new JsonException([
                "error" => [
                    "message" => "Transaction must to be pending to perform this action."
                ]
            ]);
        }

        // update transaction status
        $updatedTransaction = $this->updateTransactionRepository->handler(new IUpdateTransactionDto(
            $payload
        ));

        // call usecase to increment user balance if approved
        if ($updatedTransaction->getStatus() === "approved") {
            $this->userUpdateBalanceUsecase->handler(new UserUpdateBalanceDto([
                "user_id" => $updatedTransaction->getUserId(),
                "increment_balance" => $updatedTransaction->getAmount() * $updatedTransaction->getFactor()
            ]));
        }

        // return updated transaction
        return $updatedTransaction;
    }
}
