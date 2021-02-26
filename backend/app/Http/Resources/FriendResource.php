<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FriendResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $isInitiator = $request->user()->id == $this->user_initiator;

        if($isInitiator){
            return [
                'id'=> $this->id,
                'friend' => $this->objUserTarget,
            ];
        } else {
            return [
                'id'=> $this->id,
                'friend' => $this->objUserInitiator,
            ];
        }
    }
}
