<?php

namespace App\Domain\Repositories\IFindTransactionRepository;

class IFindTransactionDto
{
    private string | null $limit;
    private string | null $cursor;
    private string | null $filter_id;
    private string | null $filter_user_id;
    private $filter_status;

    public function __construct(array $data)
    {
        foreach ($data as $key => $value) {
            if (property_exists($this, $key)) {
                $this->$key = $value;
            }
        }
    }

    public function getLimit()
    {
        return $this->limit ?? null;
    }

    public function getCursor()
    {
        return $this->cursor ?? null;
    }

    public function getFilterId()
    {
        return $this->filter_id ?? null;
    }

    public function getFilterUserId()
    {
        return $this->filter_user_id ?? null;
    }

    public function getFilterStatus()
    {
        return $this->filter_status ?? null;
    }
}
