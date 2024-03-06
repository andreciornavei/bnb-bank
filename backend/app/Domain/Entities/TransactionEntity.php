<?php

namespace App\Domain\Entities;


class TransactionEntity
{
    private string $_id;
    private string $user_id;
    private string $user_username;
    private int $factor;
    private float $amount;
    private string $status;
    private string $description;
    private string | null $document;
    private string $updated_at;
    private string $created_at;

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

    public function getId()
    {
        return $this->_id;
    }

    public function getUserId()
    {
        return $this->user_id;
    }

    public function getUserUsername()
    {
        return $this->user_username;
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

    public function getCreatedAt()
    {
        return $this->created_at;
    }

    public function getUpdatedAt()
    {
        return $this->updated_at;
    }
}
