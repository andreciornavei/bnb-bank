<?php

namespace App\Domain\Usecases\TransactionCheckUrl;

use App\Exceptions\JsonException;
use Illuminate\Support\Facades\Validator;
use App\Domain\Providers\IStorageProvider;
use App\Domain\Entities\TransactionEntity;
use App\Domain\Repositories\IFindTransactionRepository\IFindTransactionDto;
use App\Domain\Repositories\IFindTransactionRepository\IFindTransactionRepository;

class TransactionCheckUrlUseCase
{
    public function __construct(
        private readonly IFindTransactionRepository $findTransactionRepository,
        private readonly IStorageProvider $storageProvider
    ) {
    }

    public function handler(TransactionCheckUrlDto $dto): string
    {
        // create validate schema
        $validator = Validator::make(
            ['transaction_id' => $dto->getTransactionId()],
            ['transaction_id' => 'required|string']
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

        // find transaction by provided transactionId
        $transactions = $this->findTransactionRepository->handler(new IFindTransactionDto([
            "filter_id" => $dto->getTransactionId()
        ]));

        // throws an error if was not possible to find transaction
        if (sizeof($transactions) === 0) {
            throw new JsonException([
                "error" => [
                    "message" => "Transaction not founded"
                ]
            ]);
        }

        // store transaction on entity variable
        $transaction = new TransactionEntity($transactions[0]);

        // retrieve document url
        $url = $this->storageProvider->generateReadableUrl("deposits" . "/" . $transaction->getDocument());

        // throw an error if was not possible to generate url
        if (!$url) {
            throw new JsonException([
                "error" => [
                    "message" => "Was not possible top generate document url"
                ]
            ]);
        }

        // return generated url
        return $url;
    }
}
