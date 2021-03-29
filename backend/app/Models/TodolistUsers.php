<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TodolistUsers extends Model
{
    use HasFactory;

    public function objSharedById()
    {
        return $this->belongsTo(User::class, 'shared_by_id');
    }

    public function objUser()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function objTodolist()
    {
        return $this->belongsTo(Todolist::class,'todolist_id');
    }
}
