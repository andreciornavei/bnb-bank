<?php

namespace App\Infrastructure\Repositories;

use App\Models\UserModel;
use App\Domain\Entities\UserEntity;
use App\Domain\Repositories\IFindUserRepository\IFindUserDto;
use App\Domain\Repositories\IFindUserRepository\IFindUserRepository;

class EloquentFindUserRepository implements IFindUserRepository
{
    public function handler(IFindUserDto $dto): UserEntity | null
    {
        // initialize query
        $query = UserModel::orderBy('_id', 'ASC');
        // add optional filters
        if ($dto->getFilterId()) $query->where('_id', '=', $dto->getFilterId());
        if ($dto->getFilterUsername()) $query->where("username", "=", $dto->getFilterUsername());
        // return result
        $user = $query->get()->first();
        if(!$user) return null;
        return new UserEntity($user->toArray());
    }
}
