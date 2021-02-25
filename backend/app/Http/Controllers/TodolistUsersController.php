<?php

namespace App\Http\Controllers;

use App\Http\Resources\TodolistUsersResource;
use App\Models\Todolist;
use App\Models\TodolistUsers;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TodolistUsersController extends Controller
{
    /**
     * Update permissions of user
     */
    public function updatePermissions(Request $request)
    {
        //
    }

    /**
     * Revoke access
     */
    public function revokePermissions(Request $request)
    {
        //
    }

    /**
     * Get list of people who have access to todolist
     */
    public function getAccessList(Request $request)
    {
        //
    }
}
