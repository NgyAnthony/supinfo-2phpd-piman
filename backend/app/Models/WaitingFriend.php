<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WaitingFriend extends Model
{
    use HasFactory;

    public function objUserInitiator()
    {
        return $this->belongsTo(User::class, 'user_initiator');
    }

    public function objUserTarget()
    {
        return $this->belongsTo(User::class, 'user_target');
    }
}
