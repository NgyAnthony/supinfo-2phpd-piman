<?php

namespace App\Http\Controllers;

use App\Http\Resources\TodolistUsersResource;
use App\Http\Resources\WaitingSharedTodolistRessource;
use App\Models\Todolist;
use App\Models\TodolistUsers;
use App\Models\WaitingSharedTodolist;
use Egulias\EmailValidator\Exception\AtextAfterCFWS;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WaitingSharedTodolistController extends Controller
{
    /**
     * Send the R/W permission to a todolist
     */
    public function sendAuthorization(Request $request)
    {
        $this->validate($request, [
            'selected_friend' => 'required',
            'todolist_id' => 'required',
            'read_auth' => 'required',
            'write_auth' => 'required',
        ]);

        // Check if user is allowed to send an authorization for this todolist
        $userId = $request->user()->id;
        $todolists = Todolist::whereHas('TodolistUsers', function($q) use($userId) {
            $q->where('user_id', $userId)->where('owner', true);
        })->get();


        if (count($todolists) > 0){
            $waitingShared = new WaitingSharedTodolist;

            $waitingShared->user_id = $request->selected_friend;
            $waitingShared->todolist_id = $request->todolist_id;
            $waitingShared->shared_by_id = $userId;
            $waitingShared->read = $request->read_auth;
            $waitingShared->write = $request->write_auth;

            $waitingShared->save();
            return response()->json(null,204);
        } else {
            return response()->json(null,403);
        }
    }

    /**
     * Send the awaiting authorizations
     */
    public function showAwaiting(Request $request)
    {
        $userId = $request->user()->id;
        $receivedReq = WaitingSharedTodolist::where('user_id', $userId)->get();
        return WaitingSharedTodolistRessource::collection($receivedReq);
    }

    /**
     * Send the authorized users
     */
    public function showAuthorized(Request $request)
    {
        $this->validate($request, [
            'todolist_id' => 'required',
        ]);

        // Check if user is allowed to send an authorization for this todolist
        $userId = $request->user()->id;
        $todolists = Todolist::whereHas('TodolistUsers', function($q) use($userId) {
            $q->where('user_id', $userId)->where('owner', false);
        })->get();


        if (count($todolists) > 0){
            $td_id = $request->todolist_id;
            $tdusers = TodolistUsers::where('todolist_id', $td_id)->get();

            return TodolistUsersResource::collection($tdusers);
        } else {
            return response()->json("No sharing found.",404);
        }
    }


    /**
     * Accept the authorization to the list
     */
    public function acceptAuthorization(Request $request)
    {
        $this->validate($request, [
            'share_request_id' => 'required',
        ]);

        $share_request_id = $request->share_request_id;
        $userId = $request->user()->id;

        $shareReq = WaitingSharedTodolist::find($share_request_id);

        $authTdlUser = new TodolistUsers;
        $authTdlUser->user_id = $userId;
        $authTdlUser->shared_by_id = $shareReq->shared_by_id;
        $authTdlUser->todolist_id = $shareReq->todolist_id;
        $authTdlUser->owner = false;
        $authTdlUser->read = $shareReq->read;
        $authTdlUser->write = $shareReq->write;
        $authTdlUser->save();

        $shareReq->delete();
        return response()->json(null,204);
    }

    /**
     * Refuse the authorization to the list
     */
    public function refuseAuthorization(Request $request)
    {
        //
    }
}
