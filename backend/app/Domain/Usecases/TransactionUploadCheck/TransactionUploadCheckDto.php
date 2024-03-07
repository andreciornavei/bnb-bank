<?php

namespace App\Domain\Usecases\TransactionUploadCheck;

class TransactionUploadCheckDto
{

    private $user_id;

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
}
