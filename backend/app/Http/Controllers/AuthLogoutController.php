<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Response;
use App\Http\Controllers\_Controller;
use Illuminate\Support\Facades\Cookie;


class AuthLogoutController extends _Controller
{
    public function handler()
    {
        try {
            $response = new Response(json_encode(["message" => "Logout Successfull"]));
            return $response
                ->withHeaders(['Cache-Control' => 'no-cache, private'])
                ->withCookie(Cookie::forget('Authorization'));
        } catch (Exception $error) {
            return response()->json(json_decode($error->getMessage()), 401);
        }
    }
}
