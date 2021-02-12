<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TodolistUsersResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'user_id'=> $this->user_id,
            'todolist_id'=> $this->todolist_id,
            'role'=>$this->role,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
            'todolist' => $this->todolist,
        ];
    }
}
