<?php

namespace App\Infrastructure\Repositories;

use App\Models\UserModel;
use App\Domain\Entities\UserEntity;
use App\Domain\Repositories\IUpdateUserRepository\IUpdateUserDto;
use App\Domain\Repositories\IUpdateUserRepository\IUpdateUserRepository;

class EloquentUpdateUserRepository implements IUpdateUserRepository
{
    public function handler(IUpdateUserDto $dto): UserEntity
    {
        $user = UserModel::find($dto->getId());
        $user->balance += $dto->getIncrementBalance();
        $user->save();
        return new UserEntity($user->fresh()->toArray());
    }
}
