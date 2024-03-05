<?php

namespace App\Domain\Usecases\TransactionCreate;

class TransactionCreateDto
{
    private string $description;
    private float $factor;
    private int $amount;
    private string | null $document;
    private string $userId;
    private float $userBalance;

    public function __construct(array $data)
    {
        foreach ($data as $key => $value) {
            if (property_exists($this, $key)) {
                $this->$key = $value;
            }
        }
    }

    public function getFactor()
    {
        return $this->factor;
    }

    public function getAmount()
    {
        return $this->amount;
    }

    public function getDocument()
    {
        return $this->document;
    }

    public function getDescription()
    {
        return $this->description;
    }

    public function getUserBalance()
    {
        return $this->userBalance;
    }

    public function getUserId()
    {
        return $this->userId;
    }
}
