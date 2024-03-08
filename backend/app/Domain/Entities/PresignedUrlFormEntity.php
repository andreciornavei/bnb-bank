<?php

namespace App\Domain\Entities;


class PresignedUrlFormEntity
{
    private $url;
    private $fields;

    public function __construct(array | object $data)
    {
        foreach ($data as $key => $value) {
            if (property_exists($this, $key)) {
                $this->$key = $value;
            }
        }
    }

    public function toJson()
    {
        return get_object_vars($this);
    }

    public function getUrl()
    {
        return $this->url;
    }

    public function getFields()
    {
        return $this->fields;
    }
}
