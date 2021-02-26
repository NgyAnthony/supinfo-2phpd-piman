<?php

namespace App\Http\Controllers;

use App\Http\Resources\FriendResource;
use App\Models\Friend;
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
        $friendship->delete();
        return response()->json(null,204);
    }
}
