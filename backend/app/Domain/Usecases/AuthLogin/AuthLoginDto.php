<?php

namespace App\Domain\Usecases\AuthLogin;

class AuthLoginDto
{
    private $username;
    private $password;

    public function __construct(array $data)
    {
        foreach ($data as $key => $value) {
            if (property_exists($this, $key)) {
                $this->$key = $value;
            }
        }
    }

    public function getUsername()
    {
        return $this->username ?? null;
    }

    public function getPassword()
    {
        return $this->password ?? null;
    }
}
