<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\_Controller;
use App\Domain\Usecases\AuthLogin\AuthLoginDto;
use App\Domain\Usecases\AuthLogin\AuthLoginUseCase;


class AuthLoginController extends _Controller
{
    private AuthLoginUseCase $authLoginUsecase;
    public function __construct()
    {
        $this->authLoginUsecase = new AuthLoginUseCase();
    }

    public function handler(Request $request)
    {
        try {
            $token = $this->authLoginUsecase->handler(new AuthLoginDto([
                "username" => $request->input('username'),
                "password" => $request->input('password'),
            ]));

            return response()->json([
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => auth()->factory()->getTTL() * 60
            ]);
        } catch (Exception $error) {
            return response()->json(json_decode($error->getMessage()), 401);
        }
    }
}
