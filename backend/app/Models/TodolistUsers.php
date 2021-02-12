<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TodolistUsers extends Model
{
    use HasFactory;

    protected $fillable = ['role', 'user_id', 'todolist_id'];

    public function todolist()
    {
        return $this->belongsTo(Todolist::class);
    }
}
