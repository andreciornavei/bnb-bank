<?php

namespace App\Domain\Repositories\IFindUserRepository;

use App\Domain\Entities\UserEntity;
use App\Domain\Repositories\IFindUserRepository\IFindUserDto;

interface IFindUserRepository
{
    public function handler(IFindUserDto $dto): UserEntity | null;
}
