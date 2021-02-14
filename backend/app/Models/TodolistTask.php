<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TodolistTask extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'description',
        'active', 'tag', 'archived', 'todolist_id'
    ];

    public function todolist()
    {
        return $this->belongsTo(Todolist::class);
    }
}
