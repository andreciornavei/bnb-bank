<?php

namespace App\Domain\Usecases\AuthRegister;

use App\Exceptions\JsonException;
use Illuminate\Support\Facades\Validator;

use Illuminate\Http\Response;
use App\Domain\Usecases\AuthLogin\AuthLoginDto;
use App\Domain\Usecases\AuthLogin\AuthLoginUseCase;
use App\Domain\Usecases\AuthRegister\AuthRegisterDto;
use App\Domain\Repositories\IFindUserRepository\IFindUserDto;
use App\Domain\Repositories\IFindUserRepository\IFindUserRepository;
use App\Domain\Repositories\ICreateUserRepository\ICreateUserDto;
use App\Domain\Repositories\ICreateUserRepository\ICreateUserRepository;

class AuthRegisterUseCase
{
    public function __construct(
        private readonly ICreateUserRepository $createUserRepository,
        private readonly IFindUserRepository $findUserRepository,
        private readonly AuthLoginUseCase $authLoginUsecase,
    ) {
    }

    public function handler(AuthRegisterDto $dto): Response
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
            'username' => 'required|string|min:6|max:32',
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

        // check if user already exists
        $user = $this->findUserRepository->handler(new IFindUserDto([
            "filter_username" => $dto->getUsername()
        ]));

        // throw if user already exists
        if(!!$user) {
            throw new JsonException([
                "error" => [
                    "message" => "Validation failed",
                    "fields" => ["username" => ["Username already in use"]]
                ]
            ]);
        }

        // create a new user on database
        $this->createUserRepository->handler(new ICreateUserDto(
            array_merge($payload, [
                "role" => "customer",
                "balance" => 0
            ])
        ));

        // return authenticated user to response
        return $this->authLoginUsecase->handler(new AuthLoginDto([
            "username" => $dto->getUsername(),
            "password" => $dto->getPassword(),
        ]));
    }
}
