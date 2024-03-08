<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\_Controller;
use App\Domain\Usecases\AuthLogin\AuthLoginUseCase;
use App\Domain\Usecases\AuthRegister\AuthRegisterDto;
use App\Domain\Usecases\AuthRegister\AuthRegisterUseCase;
use App\Infrastructure\Repositories\EloquentCreateUserRepository;

class AuthRegisterController extends _Controller
{
    private AuthRegisterUseCase $authRegisterUsecase;
    public function __construct()
    {
        $this->authRegisterUsecase = new AuthRegisterUseCase(
            new EloquentCreateUserRepository(),
            new AuthLoginUseCase()
        );
    }

    public function handler(Request $request)
    {
        try {
            // execute registration usecase and return authenticated
            return $this->authRegisterUsecase->handler(new AuthRegisterDto([
                "email" => $request->input('email'),
                "username" => $request->input('username'),
                "password" => $request->input('password'),
            ]));
        } catch (Exception $error) {
            // return error message if something happens
            return response()->json(json_decode($error->getMessage()), 400);
        }
    }
}
