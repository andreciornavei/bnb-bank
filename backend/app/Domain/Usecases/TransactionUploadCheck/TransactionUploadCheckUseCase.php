<?php

namespace App\Domain\Usecases\TransactionUploadCheck;

use Ramsey\Uuid\Uuid;
use App\Exceptions\JsonException;
use Illuminate\Support\Facades\Validator;
use App\Domain\Providers\IStorageProvider;
use App\Domain\Entities\PresignedUrlFormEntity;
use App\Domain\Usecases\TransactionUploadCheck\TransactionUploadCheckDto;

class TransactionUploadCheckUseCase
{
    public function __construct(private readonly IStorageProvider $storageProvider)
    {
    }

    public function handler(TransactionUploadCheckDto $dto): PresignedUrlFormEntity
    {

        // create validate schema
        $validator = Validator::make(
            [
                'user_id' => $dto->getUserId(),
                "filename" => $dto->getFilename()
            ],
            [
                'user_id' => 'required|string',
                'filename' => 'required|string',
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

        // Extract the extension from the provided string
        $extension = pathinfo($dto->getFilename(), PATHINFO_EXTENSION);

        // generate a filename with user_id + uuidv4
        // user_id is used to retrieve document and validate user on create transaction
        // uuidv4 is used to generate a unique document filename
        $uuid = Uuid::uuid4();
        $filename = $dto->getUserId() . "_" . $uuid->toString() . "." . $extension;
        return $this->storageProvider->generateSignedUrl($filename);
    }
}
