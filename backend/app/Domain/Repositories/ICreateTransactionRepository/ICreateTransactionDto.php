<?php

namespace App\Domain\Repositories\ICreateTransactionRepository;


class ICreateTransactionDto
{
    private string $user_id;
    private string $status;
    private string $document;
    private string $description;
    private int $factor;
    private float $amount;

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

    public function getFactor()
    {
        return $this->factor;
    }

    public function getAmount()
    {
        return $this->amount;
    }

    public function getDescription()
    {
        return $this->description;
    }

    public function getDocument()
    {
        return $this->document;
    }

    public function getStatus()
    {
        return $this->status;
    }
}
