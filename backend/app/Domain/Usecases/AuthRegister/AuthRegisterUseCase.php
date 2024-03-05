<?php

namespace App\Domain\Usecases\AuthRegister;

use App\Exceptions\JsonException;
use Illuminate\Support\Facades\Validator;

use App\Domain\Entities\UserEntity;
use App\Domain\Repositories\ICreateUserRepository\ICreateUserDto;
use App\Domain\Usecases\AuthRegister\AuthRegisterDto;
use App\Domain\Repositories\ICreateUserRepository\ICreateUserRepository;


class AuthRegisterUseCase
{
    public function __construct(private readonly ICreateUserRepository $createUserRepository)
    {
    }

    public function handler(AuthRegisterDto $dto): UserEntity
    {
        // mount payload
        $payload = [
            "email" => $dto->getEmail(),
            "username" => $dto->getUsername(),
            "password" => $dto->getPassword()
        ];

        // create validate schema
        $validator = Validator::make($payload, [
            'email' => 'required|string|email|max:255',
            'password' => 'required|min:6',
            'username' => 'required|string|min:6|max:32|unique:users',
        ]);

        // validate provided data
        if ($validator->fails()) {
            throw new JsonException([
                "error" => [
                    "message" => "Validation failed",
                    "fields" => $validator->errors()
                ]
            ]);
        }

        // create a new user and return it
        return $this->createUserRepository->handler(new ICreateUserDto(
            array_merge($payload, [
                "role" => "customer",
                "balance" => 0
            ])
        ));
    }
}
