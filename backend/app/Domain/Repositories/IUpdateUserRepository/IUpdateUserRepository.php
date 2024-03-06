<?php

namespace App\Domain\Repositories\IUpdateUserRepository;

use App\Domain\Entities\UserEntity;
use App\Domain\Repositories\IUpdateUserRepository\IUpdateUserDto;

interface IUpdateUserRepository
{
    public function handler(IUpdateUserDto $dto): UserEntity;
}
