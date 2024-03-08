<?php

namespace Tests\Unit;

use Illuminate\Http\Response;
use Tests\Mocks\UserEntityMock;
use PHPUnit\Framework\TestCase;
use App\Exceptions\JsonException;
use App\Domain\Entities\UserEntity;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Domain\Usecases\AuthLogin\AuthLoginDto;
use App\Domain\Usecases\AuthLogin\AuthLoginUseCase;
use App\Domain\Usecases\AuthRegister\AuthRegisterDto;
use App\Domain\Usecases\AuthRegister\AuthRegisterUseCase;
use App\Domain\Usecases\UserUpdateBalance\UserUpdateBalanceDto;
use App\Domain\Usecases\UserUpdateBalance\UserUpdateBalanceUseCase;
use App\Domain\Repositories\IFindUserRepository\IFindUserRepository;
use App\Domain\Repositories\ICreateUserRepository\ICreateUserRepository;


class AuthRegisterUseCaseTest extends TestCase
{
    public function test_auth_registration_with_valid_data_and_return_authorization(): void
    {
        $token = "custom_jwt_string";
        $user = UserEntityMock::build();
        $payload = [
            "email" => $user->getEmail(),
            "username" => $user->getUsername(),
            "password" => $user->getPassword()
        ];
        $response = new Response(json_encode($user));
        $response
            ->withHeaders(['Cache-Control' => 'no-cache, private'])
            ->withCookie(cookie("Authorization", $token, 60, null, null, false, true, false, null));

        // Mock the Auth facade
        Auth::shouldReceive('guard')->with('api')->andReturnSelf();
        Auth::shouldReceive('attempt')
            ->with(["username" => $user->getUsername(),"password" => $user->getPassword()])
            ->andReturn(false);
        // Mock Create User Repository
        $mockCreateUserRepository = $this->getMockBuilder(ICreateUserRepository::class)->getMock();
        $mockCreateUserRepository->method('handler')->willReturn($user);
        // Mock Find User Repository
        $mockFindUserRepository = $this->getMockBuilder(IFindUserRepository::class)->getMock();
        $mockFindUserRepository->method('handler')->willReturn(null);
        // Mock Auth Login Usecase
        $mockAuthLoginUsecase = $this->getMockBuilder(AuthLoginUseCase::class)->getMock();
        $mockAuthLoginUsecase->method('handler')->willReturn($response);
        
        // Execute usecase
        $usecase = new AuthRegisterUseCase(
            $mockCreateUserRepository, 
            $mockFindUserRepository, 
            $mockAuthLoginUsecase)
        ;
        $response = $usecase->handler(new AuthRegisterDto($payload));

        // Expect response payload with authorization
        $this->assertEquals(200, $response->status());
        $this->assertJson($response->getContent());
        
        // get return token on cookie
        $authorizationValue = null;
        $cookieJar = $response->headers->getCookies();
        foreach ($cookieJar as $cookie) {
            if ($cookie->getName() === 'Authorization') {
                $authorizationValue = $cookie->getValue();
                break;
            }
        }

        // compare returned cookie Authorization with mocked token
        $this->assertEquals($token, $authorizationValue);
    }
}
