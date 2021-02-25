<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TodolistUsers extends Model
{
    use HasFactory;

    protected $fillable = ['role', 'email', 'user_id', 'todolist_id', 'owner', 'read', 'write'];

    public function user()
    {
        return $this->hasMany(User::class);
    }

    public function todolist()
    {
        return $this->belongsTo(Todolist::class);
    }
}
