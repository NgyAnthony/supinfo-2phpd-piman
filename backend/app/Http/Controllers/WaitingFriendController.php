<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\WaitingFriend;
use Illuminate\Http\Request;

class WaitingFriendController extends Controller
{
    /**
     * Find a user by his email
     */
    public function findUserByEmail(Request $request)
    {
        return User::where('email', $request->email)->first();
    }

    /**
     * Show list of friend requests
     */
    public function showFriendRequests(Request $request)
    {
        //
    }


    /**
     * Send a friend request
     */
    public function sendFriendRequest(Request $request)
    {
        //
    }

    /**
     * Refuse a friend request
     */
    public function refuseFriendRequest(Request $request)
    {
        //
    }

    /**
     * Accept a friend request
     */
    public function acceptFriendRequest(Request $request)
    {
        //
    }
}
