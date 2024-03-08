<?php

namespace App\Domain\Usecases\TransactionCreate;

use App\Exceptions\JsonException;
use Illuminate\Support\Facades\Validator;

use App\Domain\Entities\TransactionEntity;
use App\Domain\Entities\UserEntity;
use App\Domain\Providers\IStorageProvider;
use App\Domain\Usecases\TransactionCreate\TransactionCreateDto;
use App\Domain\Usecases\UserUpdateBalance\UserUpdateBalanceDto;
use App\Domain\Usecases\UserUpdateBalance\UserUpdateBalanceUseCase;
use App\Domain\Repositories\ICreateTransactionRepository\ICreateTransactionDto;
use App\Domain\Repositories\ICreateTransactionRepository\ICreateTransactionRepository;

class TransactionCreateUseCase
{
    public function __construct(
        private readonly IStorageProvider $storageProvider,
        private readonly ICreateTransactionRepository $createTransactionRepository,
        private readonly UserUpdateBalanceUseCase $userUpdateBalanceUsecase
    ) {
    }

    public function handler(TransactionCreateDto $dto): UserEntity | TransactionEntity
    {
        // mount payload
        $payload = [
            'factor' => $dto->getFactor(),
            'description' => $dto->getDescription(),
            'document' => $dto->getDocument(),
            'amount' => $dto->getAmount(),
            'user_id' => $dto->getUserId(),
            'user_email' => $dto->getUserEmail(),
            'user_username' => $dto->getUserUsername(),
        ];

        // create validate schema
        $validator = Validator::make(
            array_merge($payload, [
                'balance' => $dto->getUserBalance()
            ]),
            [
                'user_id' => 'required|string',
                'user_email' => 'required|string|email',
                'user_username' => 'required|string',
                'balance' => 'required|numeric',
                'factor' => 'required|numeric|in:-1,1',
                'description' => 'required|string|min:2',
                'document' => 'required_if:factor,1',
                'amount' => [
                    'required',
                    'numeric',
                    'min:0.01',
                    $payload['factor'] == -1 ? 'lte:balance' : '',
                ]
            ],
            [
                'amount.lte' => 'You do not have enough funds in your account to make this transfer.',
                'document.required_if' => 'The document is required to create a deposit.',
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

        // check if was provided a document, then try to retrieve it from storage
        if ($dto->getDocument()) {

            // split document name to get the user_id from document key
            $documentUserId = explode("_", $dto->getDocument())[0];
            if ($documentUserId != $dto->getUserId()) {
                throw new JsonException([
                    "error" => [
                        "message" => "Failed to access document",
                        "fields" => [
                            "document" => ["The provided document does not belongs to your user."]
                        ]
                    ]
                ]);
            }

            // check if provided document exists on provider
            $file = $this->storageProvider->checkTmpDocument($dto->getDocument());

            // throw error message if document wasnot uploaded
            if (!$file) {
                throw new JsonException([
                    "error" => [
                        "message" => "Failed to find document",
                        "fields" => [
                            "document" => ["The provided document was not founded."]
                        ]
                    ]
                ]);
            }

            // Move document to deposits folder
            $moved = $this->storageProvider->moveDocument(
                "tmp/" . $dto->getDocument(),
                "deposits/" . $dto->getDocument()
            );

            // If not moved, throw an error to avoid to create transaction
            if (!$moved) {
                throw new JsonException([
                    "error" => [
                        "message" => "Failed to create document",
                        "fields" => [
                            "document" => "Was not possible to store document with transaction."
                        ]
                    ]
                ]);
            }
        }

        // create a new transaction 
        $createdTransaction = $this->createTransactionRepository->handler(new ICreateTransactionDto(
            array_merge($payload, [
                // if is a deposit, starts with "pending" else it is approved
                "status" => $dto->getFactor() == 1 ? "pending" : "approved"
            ])
        ));

        // decrese user balance if factor is a purchase
        if ($createdTransaction->getFactor() == -1) {
            return $this->userUpdateBalanceUsecase->handler(new UserUpdateBalanceDto([
                "user_id" => $createdTransaction->getUserId(),
                "increment_balance" => $createdTransaction->getAmount() * $createdTransaction->getFactor()
            ]));
        }

        // return created transaction
        return $createdTransaction;
    }
}
