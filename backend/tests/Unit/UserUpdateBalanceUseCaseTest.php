<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use App\Exceptions\JsonException;
use App\Domain\Entities\UserEntity;
use Illuminate\Support\Facades\Auth;
use App\Domain\Usecases\AuthLogin\AuthLoginDto;
use App\Domain\Usecases\AuthLogin\AuthLoginUseCase;
use App\Domain\Usecases\UserUpdateBalance\UserUpdateBalanceDto;
use App\Domain\Usecases\UserUpdateBalance\UserUpdateBalanceUseCase;
use App\Domain\Repositories\IUpdateUserRepository\IUpdateUserRepository;

class UserUpdateBalanceUseCaseTest extends TestCase
{
    public function test_user_update_balance_with_missing_user_id(): void
    {
        // Mock the interface
        $mockUpdateUserRepository = $this->getMockBuilder(IUpdateUserRepository::class)->getMock();
        // $mockUpdateUserRepository->expects($this->once())->method('handler')->willReturn(new UserEntity([]));
        
        // expect results
        $this->expectException(JsonException::class);
        
        // execute testcase
        $usecase = new UserUpdateBalanceUseCase($mockUpdateUserRepository);
        $result = $usecase->handler(new UserUpdateBalanceDto([
            "user_id" => null,
            "increment_balance" => "not numeric"
        ]));

    }
}
