<?php

namespace App\Domain\Usecases\UserBalanceSummary;

use App\Exceptions\JsonException;
use Illuminate\Support\Facades\Validator;
use App\Domain\Entities\BalanceSummaryEntity;
use App\Domain\Repositories\IBalanceSummaryRepository\IBalanceSummaryDto;
use App\Domain\Repositories\IBalanceSummaryRepository\IBalanceSummaryRepository;

class UserBalanceSummaryUseCase
{
    public function __construct(private readonly IBalanceSummaryRepository $balanceSummaryRepository)
    {
    }

    public function handler(UserBalanceSummaryDto $dto): BalanceSummaryEntity
    {
        // mount payload
        $payload = [
            'user_id' => $dto->getUserId(),
            'period_from' => $dto->getPeriodFrom(),
            'period_to' => $dto->getPeriodTo()
        ];

        // create validate schema
        $validator = Validator::make(
            $payload,
            [
                'user_id' => 'required|string',
                'period_from' => 'required|date',
                'period_to' => 'required|date|gte:period_from'
            ]
        );

        // validate provided data
        if ($validator->fails()) {
            throw new JsonException([
                "error" => [
                    "message" => "Validation failed",
                    "fields" => $validator->errors()
                ]
            ]);
        }

        // update user data
        return $this->balanceSummaryRepository->handler(new IBalanceSummaryDto($payload));
    }
}
