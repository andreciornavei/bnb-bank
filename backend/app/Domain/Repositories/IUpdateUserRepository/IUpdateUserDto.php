<?php

namespace App\Domain\Repositories\IUpdateUserRepository;


class IUpdateUserDto
{
    private string $id;
    private string $increment_balance;

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
        return $this->id;
    }

    public function getIncrementBalance()
    {
        return $this->increment_balance ?? null;
    }
}
