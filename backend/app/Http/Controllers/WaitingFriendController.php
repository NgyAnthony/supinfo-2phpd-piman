<?php

namespace App\Http\Controllers;

use App\Http\Resources\WaitingFriendResource;
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
     * Show a list of received friend requests
     */
    public function showReceivedFriendRequests(Request $request)
    {
        $userId = $request->user()->id;
        $receivedReq = WaitingFriend::where('user_target', $userId)->get();
        return WaitingFriendResource::collection($receivedReq);
    }

    /**
     * Show a list of sent friend requests
     */
    public function showSentFriendRequests(Request $request)
    {
        $userId = $request->user()->id;
        $receivedReq = WaitingFriend::where('user_initiator', $userId)->get();
        return WaitingFriendResource::collection($receivedReq);
    }


    /**
     * Send a friend request
     */
    public function sendFriendRequest(Request $request)
    {
        $this->validate($request, [
            'friend_id' => 'required',
        ]);

        $friendReq = new WaitingFriend;
        $friendReq->user_target = $request->friend_id;
        $friendReq->user_initiator = $request->user()->id;
        $friendReq->save();

        return response()->json(null,204);
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
