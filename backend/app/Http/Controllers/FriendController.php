<?php

namespace App\Http\Controllers;

use App\Http\Resources\FriendResource;
use App\Models\Friend;
use App\Models\TodolistUsers;
use Illuminate\Http\Request;

class FriendController extends Controller
{
    /**
     * Show list of friends
     */
    public function showFriends(Request $request)
    {
        $userId = $request->user()->id;

        $friends = Friend::select("*")
            ->where('user_target', $userId)
            ->orWhere('user_initiator', $userId)
            ->get();

        return FriendResource::collection($friends);

    }

    /**
     * Remove friend.
     */
    public function removeFriend(Request $request)
    {
        $this->validate($request, [
            'friendship_id' => 'required',
        ]);

        $friendshipId = $request->friendship_id;
        $friendship = Friend::find($friendshipId);

        $f1 = $friendship -> user_initiator;
        $f2 = $friendship -> user_target;

        // Revoking all shared permissions between the two friends
        TodolistUsers::where('user_id', $f1)
            ->where('shared_by_id', $f2)
            ->where('owner', false)->delete();

        TodolistUsers::where('user_id', $f2)
            ->where('shared_by_id', $f1)
            ->where('owner', false)->delete();

        $friendship->delete();


        return response()->json(null,204);
    }
}
