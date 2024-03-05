<?php

namespace App\Domain\Usecases\TransactionUploadCheck;

use Ramsey\Uuid\Uuid;
use App\Exceptions\JsonException;
use Illuminate\Support\Facades\Validator;
use App\Domain\Providers\IStorageProvider;
use App\Domain\Usecases\TransactionUploadCheck\TransactionUploadCheckDto;

class TransactionUploadCheckUseCase
{
    public function __construct(private readonly IStorageProvider $storageProvider)
    {
    }

    public function handler(TransactionUploadCheckDto $dto): string
    {

        // create validate schema
        $validator = Validator::make(
            ['user_id' => $dto->getUserId()],
            ['user_id' => 'required|string']
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

        // generate a filename with user_id + uuidv4
        // user_id is used to retrieve document and validate user on create transaction
        // uuidv4 is used to generate a unique document filename
        $uuid = Uuid::uuid4();
        $filename = $dto->getUserId() . "_" . $uuid->toString() . ".png";
        return $this->storageProvider->generateSignedUrl($filename);
    }
}
