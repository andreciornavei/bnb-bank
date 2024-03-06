<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    public function handle($request, Closure $next, ...$guards)
    {
        try {
            $request->headers->set('Authorization', 'Bearer ' . Cookie::get('Authorization'));
            $this->authenticate($request, $guards);
            return $next($request);
        } catch (Exception $e) {
            return response()->json([
                'error' => [
                    "message" => "Unauthenticated"
                ]
            ], 401);
        }
    }
}
