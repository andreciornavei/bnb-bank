<?php

namespace App\Infrastructure\Repositories;

use App\Models\TransactionModel;
use App\Domain\Entities\TransactionEntity;
use App\Domain\Repositories\IFindTransactionRepository\IFindTransactionDto;
use App\Domain\Repositories\IFindTransactionRepository\IFindTransactionRepository;

class EloquentFindTransactionRepository implements IFindTransactionRepository
{

    /**
     * Get entities.
     *
     * @return TransactionEntity[] Returns an array of Entity objects.
     */
    public function handler(IFindTransactionDto $dto): array
    {
        // initialize query
        $query = TransactionModel::orderBy('_id', 'DESC');

        // add optional filters
        if ($dto->getLimit()) $query->limit($dto->getLimit());
        if ($dto->getCursor()) $query->where('_id', '<', $dto->getCursor());
        if ($dto->getFilterId()) $query->where("_id", "=", $dto->getFilterId());
        if ($dto->getFilterUserId()) $query->where("user_id", "=", $dto->getFilterUserId());
        if ($dto->getFilterFactor()) $query->where("factor", "=", $dto->getFilterFactor());
        if ($dto->getFilterStatus()) $query->whereIn("status", $dto->getFilterStatus());

        // return result
        return $query->get()->map(fn ($record) => (new TransactionEntity($record->toArray()))->toJson())->all();
    }
}
