<?php

namespace App\Http\Controllers;

use App\Http\Resources\WaitingFriendResource;
use App\Models\Friend;
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
        if($request->user()->email != $request->email){
            return User::where('email', $request->email)->first();
        }
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
        $this->validate($request, [
            'friend_request_id' => 'required',
        ]);

        $friendRequestId = $request->friend_request_id;
        $friendRequest = WaitingFriend::find($friendRequestId);
        $friendRequest->delete();
        return response()->json(null,204);
    }

    /**
     * Accept a friend request
     */
    public function acceptFriendRequest(Request $request)
    {
        $this->validate($request, [
            'friend_request_id' => 'required',
        ]);

        $friendRequestId = $request->friend_request_id;
        $friendRequest = WaitingFriend::find($friendRequestId);

        $friendRel = new Friend;
        $friendRel->user_target = $friendRequest->user_target;
        $friendRel->user_initiator = $friendRequest->user_initiator;
        $friendRel->save();

        $friendRequest->delete();
        return response()->json(null,204);
    }
}
