<?php

namespace App\Http\Controllers;

use App\Http\Controllers\_Controller;


class AuthUserDataController extends _Controller
{
    public function handler()
    {
        return response()->json(auth()->user());
    }
}
