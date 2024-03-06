<?php

namespace App\Domain\Usecases\UserUpdateBalance;

class UserUpdateBalanceDto
{
    private string $user_id;
    private string $increment_balance;

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
        return $this->user_id;
    }

    public function getIncrementBalance()
    {
        return $this->increment_balance;
    }
}
