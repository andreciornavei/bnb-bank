<?php

namespace App\Exceptions;

use Exception;

class JsonException extends Exception
{

    public function __construct(array $message)
    {
        $this->message = json_encode($message);
    }
}
