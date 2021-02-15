<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskUsers extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'task_id'];

    public function user()
    {
        return $this->hasMany(User::class);
    }

    public function todolsittask()
    {
        return $this->belongsTo(TodolistTask::class);
    }
}
