<?php

namespace App\Domain\Usecases\AuthLogin;

use Illuminate\Http\Response;
use App\Exceptions\JsonException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Domain\Usecases\AuthLogin\AuthLoginDto;

class AuthLoginUseCase
{
    public function __construct()
    {
    }

    public function handler(AuthLoginDto $dto): Response
    {
        // mount credentials
        $credentials = ["username" => $dto->getUsername(), "password" => $dto->getPassword()];

        // create validate schema
        $validator = Validator::make($credentials, [
            'username' => 'required|string',
            'password' => 'required|string'
        ]);

        // validate provided data
        if ($validator->fails()) {
            throw new JsonException([
                "error" => [
                    "message" => "Validation failed",
                    "fields" => $validator->errors()
                ]
            ]);
        }

        // attempt to generate jwt token
        if (!$token = Auth::guard('api')->attempt($credentials)) {
            throw new JsonException([
                "error" => [
                    "message" => "Invalid credentials"
                ]
            ]);
        }

        // return response with built-in token on cookie
        $response = new Response(json_encode(auth()->user()));
        return $response
            ->withHeaders(['Cache-Control' => 'no-cache, private'])
            ->withCookie(cookie("Authorization", $token, 60, null, null, false, true, false, null));
    }
}
