<?php

namespace App\Domain\Usecases\UserBalanceSummary;


class UserBalanceSummaryDto
{
    private $user_id;
    private $period_from;
    private $period_to;

    public function __construct(array $data)
    {
        foreach ($data as $key => $value) {
            if (property_exists($this, $key)) {
                $this->$key = $value;
            }
        }
    }

    public function getUserId()
    {
        return $this->user_id ?? null;
    }

    public function getPeriodFrom()
    {
        return $this->period_from ?? null;
    }

    public function getPeriodTo()
    {
        return $this->period_to ?? null;
    }
}
