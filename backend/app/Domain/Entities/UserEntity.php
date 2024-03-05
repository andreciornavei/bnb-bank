<?php

namespace App\Domain\Entities;

class UserEntity
{
    private string $_id;
    private string $email;
    private string $username;
    private string $password;
    private float $balance;
    private string $role;
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

    public function getBalance()
    {
        return $this->balance;
    }

    public function getRole()
    {
        return $this->role;
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
