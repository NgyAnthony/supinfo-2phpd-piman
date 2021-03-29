<?php


namespace App\Http\Resources;


use Illuminate\Http\Resources\Json\JsonResource;

class WaitingSharedTodolistRessource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'=> $this->id,
            'user' => $this->objUser,
            'shared_by' => $this->objSharedById,
            'todolist' => $this->objTodolist,
            'read' => $this->read,
            'write' => $this->write
        ];
    }
}

