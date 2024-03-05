<?php

namespace App\Domain\Repositories\ICreateUserRepository;


class ICreateUserDto
{
    private string $email;
    private string $username;
    private string $password;
    private string $role;
    private float $balance;

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
        return $this->email;
    }

    public function getUsername()
    {
        return $this->username;
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function getRole()
    {
        return $this->role;
    }

    public function getBalance()
    {
        return $this->balance;
    }
}
