<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\_Controller;
use App\Domain\Usecases\UserBalanceSummary\UserBalanceSummaryDto;
use App\Domain\Usecases\UserBalanceSummary\UserBalanceSummaryUsecase;
use App\Infrastructure\Repositories\EloquentBalanceSummaryRepository;

class UserBalanceSummaryController extends _Controller
{
    private UserBalanceSummaryUsecase $userBalanceSummaryUsecase;
    public function __construct()
    {
        $this->userBalanceSummaryUsecase = new UserBalanceSummaryUsecase(
            new EloquentBalanceSummaryRepository()
        );
    }

    public function handler(Request $request)
    {
        try {
            // get authenticated user
            $user = auth()->user();
            // execute usecase
            $balanceSummary = $this->userBalanceSummaryUsecase->handler(new UserBalanceSummaryDto([
                "user_id" => $user->_id,
                "period_from" => $request->query("from"),
                "period_to" => $request->query("to"),
            ]));
            // return balance summary
            return response()->json($balanceSummary->toJson());
        } catch (Exception $error) {
            // return error message if something happens
            return response()->json(json_decode($error->getMessage()), 400);
        }
    }
}
