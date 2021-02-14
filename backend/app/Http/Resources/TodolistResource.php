<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TodolistResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $users = collect(json_decode($this->todolistusers, true));

        if($users -> contains('user_id', $request->user()->id)){
            return [
                'id'=> $this->id,
                'title'=> $this->title,
                'archived'=> $this->archived,
                'users' => $this->todolistusers,
            ];
        }
    }
}
