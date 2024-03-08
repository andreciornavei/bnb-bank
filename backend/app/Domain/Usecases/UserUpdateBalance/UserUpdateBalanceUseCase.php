<?php

namespace App\Domain\Usecases\UserUpdateBalance;

use App\Exceptions\JsonException;
use Illuminate\Support\Facades\Validator;

use App\Domain\Entities\UserEntity;
use App\Domain\Repositories\IUpdateUserRepository\IUpdateUserDto;
use App\Domain\Repositories\IUpdateUserRepository\IUpdateUserRepository;

class UserUpdateBalanceUseCase
{
    public function __construct(private readonly IUpdateUserRepository $updateUserRepository)
    {
    }

    public function handler(UserUpdateBalanceDto $dto): UserEntity
    {

        // mount payload
        $payload = [
            'id' => $dto->getUserId(),
            'increment_balance' => $dto->getIncrementBalance()
        ];

        // create validate schema
        $validator = Validator::make(
            $payload,
            [
                'id' => 'required|string',
                'increment_balance' => 'required|numeric'
            ]
        );

        // validate provided data
        if ($validator->fails()) {
            throw new JsonException([
                "error" => [
                    "message" => "Validation failed",
                    "fields" => $validator->errors()
                ]
            ]);
        }

        // update user data
        return $this->updateUserRepository->handler(new IUpdateUserDto($payload));
    }
}
