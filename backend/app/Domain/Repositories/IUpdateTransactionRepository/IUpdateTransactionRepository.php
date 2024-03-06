<?php

namespace App\Domain\Repositories\IUpdateTransactionRepository;

use App\Domain\Entities\TransactionEntity;
use App\Domain\Repositories\IUpdateTransactionRepository\IUpdateTransactionDto;

interface IUpdateTransactionRepository
{
    public function handler(IUpdateTransactionDto $dto): TransactionEntity;
}
