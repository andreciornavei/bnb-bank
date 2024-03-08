<?php

namespace App\Domain\Repositories\IFindUserRepository;

class IFindUserDto
{
    private $filter_id;
    private $filter_username;

    public function __construct(array $data)
    {
        foreach ($data as $key => $value) {
            if (property_exists($this, $key)) {
                $this->$key = $value;
            }
        }
    }

    public function getFilterId()
    {
        return $this->filter_id ?? null;
    }

    public function getFilterUsername()
    {
        return $this->filter_username ?? null;
    }
}
