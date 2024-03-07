<?php

namespace App\Infrastructure\Repositories;

use DateTime;
use App\Models\TransactionModel;
use App\Domain\Entities\BalanceSummaryEntity;
use App\Domain\Repositories\IBalanceSummaryRepository\IBalanceSummaryDto;
use App\Domain\Repositories\IBalanceSummaryRepository\IBalanceSummaryRepository;

class EloquentBalanceSummaryRepository implements IBalanceSummaryRepository
{

    public function handler(IBalanceSummaryDto $dto): BalanceSummaryEntity
    {
        // initialize query
        $query = TransactionModel::where('user_id', "=", $dto->getUserId());

        // optional filter from date
        if ($dto->getPeriodFrom()) {
            $from = DateTime::createFromFormat('Y-m-d', $dto->getPeriodFrom());
            $from->setTime(0, 0, 0);
            $query->where("created_at", ">=", $from);
        }

        // optional filter to date
        if ($dto->getPeriodTo()) {
            $to = DateTime::createFromFormat('Y-m-d', $dto->getPeriodTo());
            $to->setTime(23, 59, 59);
            $query->where("created_at", "<=", $to);
        }

        // adjust query for expenses
        $queryExpenses = clone $query;
        $queryExpenses->where("factor", "=", -1);
        $amountExpenses = $queryExpenses->sum("amount");

        // adjust query for incomes
        $queryIncomes = clone $query;
        $queryIncomes->where("factor", "=", 1);
        $amountIncomes = $queryIncomes->sum("amount");

        // return built balance summary
        return new BalanceSummaryEntity([
            "net" => $amountIncomes - $amountExpenses,
            "expenses" => $amountExpenses,
            "incomes" => $amountIncomes
        ]);
    }
}
