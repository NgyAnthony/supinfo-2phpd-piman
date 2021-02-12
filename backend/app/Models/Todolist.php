<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todolist extends Model
{
    use HasFactory;

    protected $fillable = ['id','title','archived'];

    public function todolistusers()
    {
        return $this->hasMany(TodolistUsers::class);
    }
}
