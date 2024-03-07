<?php

namespace App\Domain\Entities;


class BalanceSummaryEntity
{
    private $incomes;
    private $expenses;
    private $net;

    public function __construct(array | object $data)
    {
        foreach ($data as $key => $value) {
            if (property_exists($this, $key)) {
                $this->$key = $value;
            }
        }
    }

    public function toJson()
    {
        return get_object_vars($this);
    }

    public function getIncomes()
    {
        return $this->incomes;
    }

    public function getExpenses()
    {
        return $this->expenses;
    }

    public function getNet()
    {
        return $this->net;
    }
}
