<?php

namespace Tests\Mocks;

use App\Domain\Entities\UserEntity;

class UserEntityMock
{
    public static function build(): UserEntity
    {
        return new UserEntity([
            "_id" => "65eb12ed6eac18f201090212",
            "email" => "johndoe@gmail.com",
            "username" => "johndoe",
            "password" => "123456789",
            "balance" => 0,
            "role" => "customer",
            "updated_at" => "2024-01-01 00:00:00",
            "created_at" => "2024-01-01 00:00:00",
        ]);
    }
}