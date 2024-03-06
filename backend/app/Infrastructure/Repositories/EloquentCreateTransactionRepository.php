<?php

namespace App\Infrastructure\Repositories;

use App\Models\TransactionModel;
use App\Domain\Entities\TransactionEntity;
use App\Domain\Repositories\ICreateTransactionRepository\ICreateTransactionDto;
use App\Domain\Repositories\ICreateTransactionRepository\ICreateTransactionRepository;

class EloquentCreateTransactionRepository implements ICreateTransactionRepository
{
    public function handler(ICreateTransactionDto $dto): TransactionEntity
    {
        $transaction = TransactionModel::create([
            'factor' => $dto->getFactor(),
            'amount' => $dto->getAmount(),
            'description' => $dto->getDescription(),
            'user_id' => $dto->getUserId(),
            'user_username' => $dto->getUserUsername(),
            'document' => $dto->getDocument(),
            'status' => $dto->getStatus(),
        ]);

        return new TransactionEntity($transaction->fresh()->toArray());
    }
}
