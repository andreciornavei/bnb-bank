<?php

namespace App\Domain\Usecases\TransactionUpdate;

class TransactionUpdateDto
{
    private $id;
    private $status;

    public function __construct(array $data)
    {
        foreach ($data as $key => $value) {
            if (property_exists($this, $key)) {
                $this->$key = $value;
            }
        }
    }

    public function getId()
    {
        return $this->id ?? null;
    }

    public function getStatus()
    {
        return $this->status ?? null;
    }
}
