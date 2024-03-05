<?php

namespace App\Repositories;

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
            'document' => $dto->getDocument(),
            'status' => $dto->getStatus(),
        ]);

        return new TransactionEntity($transaction->fresh()->toArray());
    }
}
