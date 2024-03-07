<?php

namespace App\Domain\Usecases\TransactionCreate;

class TransactionCreateDto
{
    private $description;
    private $factor;
    private $amount;
    private $document;
    private $userId;
    private $userUsername;
    private $userBalance;

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
        return $this->factor ?? null;
    }

    public function getAmount()
    {
        return $this->amount ?? null;
    }

    public function getDocument()
    {
        return $this->document ?? null;
    }

    public function getDescription()
    {
        return $this->description ?? null;
    }

    public function getUserBalance()
    {
        return $this->userBalance ?? null;
    }

    public function getUserId()
    {
        return $this->userId ?? null;
    }

    public function getUserUsername()
    {
        return $this->userUsername ?? null;
    }
}
