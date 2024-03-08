<?php

namespace App\Domain\Repositories\ICreateTransactionRepository;


class ICreateTransactionDto
{
    private $user_id;
    private $user_email;
    private $user_username;
    private $status;
    private $document;
    private $description;
    private $factor;
    private $amount;

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

    public function getUserEmail()
    {
        return $this->user_email ?? null;
    }

    public function getUserUsername()
    {
        return $this->user_username ?? null;
    }

    public function getFactor()
    {
        return $this->factor ?? null;
    }

    public function getAmount()
    {
        return $this->amount ?? null;
    }

    public function getDescription()
    {
        return $this->description ?? null;
    }

    public function getDocument()
    {
        return $this->document ?? null;
    }

    public function getStatus()
    {
        return $this->status ?? null;
    }
}
