<?php

namespace Tests\Unit;

use Illuminate\Http\Response;
use Tests\Mocks\UserEntityMock;
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

    public function test_auth_login_with_missing_credentials(): void
    {
        // Mock the Auth facade
        Auth::shouldReceive('guard')->with('api')->andReturnSelf();
        
        // Expects the result
        $this->expectException(JsonException::class);
        $this->expectExceptionMessage("The username field is required");
        $this->expectExceptionMessage("The password field is required");

        // Execute usecase
        $usecase = new AuthLoginUseCase();
        $usecase->handler(new AuthLoginDto([
            "username" => null,
            "password" => null
        ]));
    }

    public function test_auth_login_with_invalid_credentials(): void
    {
        $credentials = [
            "username" => "johndoe",
            "password" => "invalid"
        ];

        // Mock the Auth facade
        Auth::shouldReceive('guard')->with('api')->andReturnSelf();
        Auth::shouldReceive('attempt')->with($credentials)->andReturn(false);

        // Expects the result
        $this->expectException(JsonException::class);
        $this->expectExceptionMessage("Invalid credentials");

        // Execute usecase
        $usecase = new AuthLoginUseCase();
        $usecase->handler(new AuthLoginDto($credentials));
    }

    public function test_auth_login_with_valid_credentials(): void
    {
        $user = UserEntityMock::build();
        $jwt = "custom_jwt_string";
        $credentials = [
            "username" => $user->getUsername(),
            "password" => $user->getPassword()
        ];

        // Mock the Auth facade
        Auth::shouldReceive('guard')->with('api')->andReturnSelf();
        Auth::shouldReceive('attempt')->with($credentials)->andReturn($jwt);
        Auth::shouldReceive('user')->andReturn($user);

        // Execute usecase
        $usecase = new AuthLoginUseCase();
        $response = $usecase->handler(new AuthLoginDto($credentials));

        // Expect response payload with authorization
        $this->assertEquals(200, $response->status());
        $this->assertJson($response->getContent());
        
        
        // get return jwt on cookie
        $authorizationValue = null;
        $cookieJar = $response->headers->getCookies();
        foreach ($cookieJar as $cookie) {
            if ($cookie->getName() === 'Authorization') {
                $authorizationValue = $cookie->getValue();
                break;
            }
        }

        // compare returned cookie Authorization with mocked jwt
        $this->assertEquals($jwt, $authorizationValue);


    }
}
