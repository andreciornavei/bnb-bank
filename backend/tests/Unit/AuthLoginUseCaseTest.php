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

class AuthLoginUseCaseTest extends TestCase
{
    public function test_auth_login_with_invalid_credentials(): void
    {
        // Mock the Auth facade
        Auth::shouldReceive('guard')->with('api')->andReturnSelf(); // Mocking the guard method
        Auth::shouldReceive('attempt')->andReturn(false); // Mocking the attempt method

        // Expects the result
        $this->expectException(JsonException::class);
        $this->expectExceptionMessage("Invalid credentials");

        // Execute usecase
        $usecase = new AuthLoginUseCase();
        $usecase->handler(new AuthLoginDto([
            "username" => "johndoe",
            "password" => "invalid"
        ]));

    }
}
