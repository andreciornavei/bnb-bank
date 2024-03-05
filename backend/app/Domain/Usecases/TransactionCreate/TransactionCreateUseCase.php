<?php

namespace App\Domain\Usecases\TransactionCreate;

use App\Exceptions\JsonException;
use Illuminate\Support\Facades\Validator;

use App\Domain\Entities\TransactionEntity;
use App\Domain\Usecases\TransactionCreate\TransactionCreateDto;
use App\Domain\Repositories\ICreateTransactionRepository\ICreateTransactionDto;
use App\Domain\Repositories\ICreateTransactionRepository\ICreateTransactionRepository;


class TransactionCreateUseCase
{
    public function __construct(private readonly ICreateTransactionRepository $createTransactionRepository)
    {
    }

    public function handler(TransactionCreateDto $dto): TransactionEntity
    {
        // mount payload
        $payload = [
            'factor' => $dto->getFactor(),
            'description' => $dto->getDescription(),
            'document' => $dto->getDocument(),
            'amount' => $dto->getAmount(),
        ];

        // create validate schema
        $validator = Validator::make(
            array_merge($payload, [
                'user_id' => $dto->getUserId(),
                'balance' => $dto->getUserBalance()
            ]),
            [
                'user_id' => 'required|string',
                'balance' => 'required|numeric',
                'factor' => 'required|numeric|in:-1,1',
                'description' => 'required|string|min:6',
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

        // create a new transaction and return it
        return $this->createTransactionRepository->handler(new ICreateTransactionDto(
            array_merge($payload, ["status" => "pending"])
        ));
    }
}
