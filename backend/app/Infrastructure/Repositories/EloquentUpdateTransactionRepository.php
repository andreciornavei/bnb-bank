<?php

namespace App\Infrastructure\Repositories;

use App\Models\TransactionModel;
use App\Domain\Entities\TransactionEntity;
use App\Domain\Repositories\IUpdateTransactionRepository\IUpdateTransactionDto;
use App\Domain\Repositories\IUpdateTransactionRepository\IUpdateTransactionRepository;

class EloquentUpdateTransactionRepository implements IUpdateTransactionRepository
{
    public function handler(IUpdateTransactionDto $dto): TransactionEntity
    {
        $transaction = TransactionModel::find($dto->getId());
        $transaction->status = $dto->getStatus();
        $transaction->save();
        return new TransactionEntity($transaction->fresh()->toArray());
    }
}
