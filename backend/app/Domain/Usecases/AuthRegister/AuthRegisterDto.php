<?php

namespace App\Domain\Usecases\AuthRegister;


class AuthRegisterDto
{
    private $email;
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

    public function getEmail()
    {
        return $this->email ?? null;
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
