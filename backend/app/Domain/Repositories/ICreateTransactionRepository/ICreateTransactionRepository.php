<?php

namespace App\Domain\Repositories\ICreateTransactionRepository;

use App\Domain\Entities\TransactionEntity;
use App\Domain\Repositories\ICreateTransactionRepository\ICreateTransactionDto;

interface ICreateTransactionRepository
{
    public function handler(ICreateTransactionDto $dto): TransactionEntity;
}
