<?php

namespace App\Domain\Repositories\ICreateUserRepository;

use App\Domain\Entities\UserEntity;
use App\Domain\Repositories\ICreateUserRepository\ICreateUserDto;

interface ICreateUserRepository
{
    public function handler(ICreateUserDto $dto): UserEntity;
}
