<?php

namespace App\Http\Controllers;

use \App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Database\Connection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;


class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function login()
    {
        $credentials = request(['username', 'password']);
        $user = User::where('username','=',$credentials['username'])->first();

        if (!$token = Auth::guard('api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

    public function register()
    {
        // retrieve only needed payload data
        $payload = request(['username', 'email', 'password']);

        // create validate schema
        $validator = Validator::make($payload, [
            'username' => 'required|string|min:6|max:32|unique:users',
            'email' => 'required|string|email|max:255',
            'password' => 'required|min:6'
        ]);

        // validate provided data
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // create a new user on database is everything is ok
        $user = User::create([
            'username' => $payload['username'],
            'email' => $payload["email"],
            'password' => $payload["password"],
            'role' => 'customer',
            'balance' => 0
        ]);

        // return created user
        return response()->json($user->fresh());
    }

    public function me()
    {
        return response()->json(auth()->user());
    }

}