<?php

namespace App\Domain\Repositories\IBalanceSummaryRepository;

use App\Domain\Entities\BalanceSummaryEntity;

interface IBalanceSummaryRepository
{
    public function handler(IBalanceSummaryDto $dto): BalanceSummaryEntity;
}
