<?php

namespace App\Domain\Providers;

interface IStorageProvider
{
    public function generateSignedUrl(string $document_key): string;
    public function checkTmpDocument(string $document_key): string | null;
    public function moveDocument(string $from_document, string $to_document): string | null;
    public function generateReadableUrl(string $document_key): string | null;
}
