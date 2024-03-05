<?php

namespace App\Domain\Repositories\IFindTransactionRepository;

use App\Domain\Repositories\IFindTransactionRepository\IFindTransactionDto;

interface IFindTransactionRepository
{
    public function handler(IFindTransactionDto $dto): array;
}
