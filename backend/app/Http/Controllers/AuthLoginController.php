<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
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
            $response = new Response(json_encode(auth()->user()));
            return $response
                ->withHeaders(['Cache-Control' => 'no-cache, private'])
                ->withCookie(cookie("Authorization", $token, 60, null, null, false, true, false, "none"));
        } catch (Exception $error) {
            return response()->json(json_decode($error->getMessage()), 401);
        }
    }
}
