<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class PolicyOnlyAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();
        if ($user->role != "admin") {
            return response()->json([
                'error' => [
                    "message" => "You must to be an admin to perform this action",
                ]
            ], 403);
        }
        return $next($request);
    }
}
