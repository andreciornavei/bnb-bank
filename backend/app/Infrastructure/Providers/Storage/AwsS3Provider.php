<?php

namespace App\Infrastructure\Providers\Storage;

use Aws\Sdk;
use Exception;
use Aws\S3\S3Client;
use Aws\S3\PostObjectV4;
use Aws\Credentials\Credentials;
use App\Domain\Providers\IStorageProvider;
use App\Domain\Entities\PresignedUrlFormEntity;

class AwsS3Provider implements IStorageProvider
{
    private S3Client $client;
    private string $bucket;
    public function __construct()
    {
        $args = [
            'region' => env('AWS_DEFAULT_REGION', "sa-east-1"),
            'version' => 'latest',
        ];
        if (getenv("AWS_ACCESS_KEY_ID") && getenv("AWS_SECRET_ACCESS_KEY")) {
            $args["credentials"] = new Credentials(
                env('AWS_ACCESS_KEY_ID'),
                env('AWS_SECRET_ACCESS_KEY'),
            );
        }
        $sdk = new Sdk($args);
        $this->bucket = env('AWS_BUCKET');
        $this->client = $sdk->createS3();
    }

    public function generateSignedUrl(string $document_key): PresignedUrlFormEntity
    {
        // Generate the form
        $postObject = new PostObjectV4(
            $this->client,
            $this->bucket,
            [
                'acl' => 'private',
                "bucket" => $this->bucket,
                'key' => "tmp" . "/" . $document_key,
            ],
            [
                ['acl' => 'private'],
                ["bucket" => $this->bucket],
                ['key' => "tmp" . "/" . $document_key],
            ],
            '+5 minutes'
        );

        // return build form entity
        return new PresignedUrlFormEntity([
            "url" => $postObject->getFormAttributes()['action'],
            "fields" => $postObject->getFormInputs()
        ]);
    }

    public function checkTmpDocument(string $document_key): string | null
    {
        try {
            $this->client->headObject([
                'Bucket' => $this->bucket,
                'Key'    => "tmp/" . $document_key
            ]);
            return $document_key;
        } catch (Exception $e) {
            return null;
        }
    }

    public function moveDocument(string $from_document, string $to_document): string | null
    {
        try {
            // Copy the object from the source location to the destination location
            $this->client->copyObject([
                'Bucket'     => $this->bucket,
                'Key'        => $to_document,
                'CopySource' => $this->bucket . "/" . $from_document
            ]);

            // Delete the object from the source location after successful copy
            $this->client->deleteObject([
                'Bucket' => $this->bucket,
                'Key'    => $from_document,
            ]);

            // Return new document key
            return $to_document;
        } catch (Exception $e) {
            return null;
        }
    }

    public function generateReadableUrl(string $document_key): string | null
    {
        try {
            // Create a presigned URL for the getObject operation
            $command = $this->client->getCommand('GetObject', [
                'Bucket' => $this->bucket,
                'Key'    => $document_key
            ]);

            // generate signed url
            $signedUrl = $this->client->createPresignedRequest($command, "+15 minutes")->getUri();

            // return signed url
            return (string)$signedUrl;
        } catch (Exception $e) {
            return null;
        }
    }
}
