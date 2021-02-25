<?php

namespace App\Http\Controllers;

use App\Models\WaitingSharedTodolist;
use Illuminate\Http\Request;

class WaitingSharedTodolistController extends Controller
{
    /**
     * Send the R/W permission to a todolist
     */
    public function sendSharedAuthorization(Request $request)
    {
        //
    }

    /**
     * Accept the authorization to the list
     */
    public function acceptAuthorization(Request $request)
    {
        //
    }

    /**
     * Refuse the authorization to the list
     */
    public function refuseAuthorization(Request $request)
    {
        //
    }
}
