<?php

namespace App\Domain\Usecases\TransactionFind;

use App\Exceptions\JsonException;
use Illuminate\Support\Facades\Validator;

use App\Domain\Usecases\TransactionFind\TransactionFindDto;
use App\Domain\Repositories\IFindTransactionRepository\IFindTransactionDto;
use App\Domain\Repositories\IFindTransactionRepository\IFindTransactionRepository;

class TransactionFindUseCase
{
    public function __construct(
        private readonly IFindTransactionRepository $findTransactionRepository
    ) {
    }

    public function handler(TransactionFindDto $dto): array
    {
        // mount payload
        $payload = [
            'limit' => $dto->getLimit(),
            'cursor' => $dto->getCursor(),
            'filter_id' => $dto->getFilterId(),
            'filter_user_id' => $dto->getFilterUserId(),
            'filter_status' => $dto->getFilterStatus(),
            'filter_factor' => $dto->getFilterFactor(),
        ];

        // create validate schema
        $validator = Validator::make(
            $payload,
            [
                'limit' => 'required|numeric|min:1|max:20',
                'cursor' => 'nullable|string',
                'filter_id' => 'nullable|string',
                'filter_user_id' => 'nullable|string',
                'filter_status' => 'nullable|array',
                'filter_status.*' => 'string|in:pending,approved,rejected',
                'filter_factor' => 'nullable|numeric|in:1,-1'
            ]
        );

        // validate provided data
        if ($validator->fails()) {
            throw new JsonException([
                "error" => [
                    "message" => "Validation failed",
                    "fields" => $validator->errors()->all()
                ]
            ]);
        }

        // create a new transaction and return it
        return $this->findTransactionRepository->handler(new IFindTransactionDto($payload));
    }
}
