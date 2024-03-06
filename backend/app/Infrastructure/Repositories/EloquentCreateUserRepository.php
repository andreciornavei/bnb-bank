<?php

namespace App\Infrastructure\Repositories;

use App\Models\UserModel;
use App\Domain\Entities\UserEntity;
use App\Domain\Repositories\ICreateUserRepository\ICreateUserDto;
use App\Domain\Repositories\ICreateUserRepository\ICreateUserRepository;

class EloquentCreateUserRepository implements ICreateUserRepository
{
    public function handler(ICreateUserDto $dto): UserEntity
    {
        $user = UserModel::create([
            'username' => $dto->getUsername(),
            'password' => $dto->getPassword(),
            'email' => $dto->getEmail(),
            'role' => $dto->getRole() ?? "customer",
            'balance' => $dto->getBalance() ?? 0
        ]);

        return new UserEntity($user->fresh()->toArray());
    }
}
