<?php

namespace App\Domain\Usecases\TransactionCheckUrl;

class TransactionCheckUrlDto
{

    private $transaction_id;

    public function __construct(array $data)
    {
        foreach ($data as $key => $value) {
            if (property_exists($this, $key)) {
                $this->$key = $value;
            }
        }
    }

    public function getTransactionId()
    {
        return $this->transaction_id ?? null;
    }
}
