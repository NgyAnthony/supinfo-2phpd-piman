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
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @param Todolist $todolist
     * @return TodolistUsersResource
     */
    public function store(Request $request, Todolist $todolist): TodolistUsersResource
    {
        $todolistusers = TodolistUsers::firstOrCreate(
            [
                'user_id' => $request->user()->id,
                'todolist_id' => $todolist->id,
            ],
            ['todolistusers'=> $request->todolistusers]
        );
        return new TodolistUsersResource($todolistusers);
    }

    /**
     * Display the specified resource.
     *
     * @param TodolistUsers $todolistUsers
     * @return \Illuminate\Http\Response
     */
    public function show(TodolistUsers $todolistUsers)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param TodolistUsers $todolistUsers
     * @return \Illuminate\Http\Response
     */
    public function edit(TodolistUsers $todolistUsers)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param TodolistUsers $todolistUsers
     * @return TodolistUsersResource|JsonResponse
     */
    public function update(Request $request, TodolistUsers $todolistUsers)
    {
        if($todolistUsers->user_id !== $request->user()->id){
            return response()->json(['error' => 'You can only edit your own Todolist.'], 403);
        }
        $todolistUsers->update($request->only(['role', 'user_id', 'todolist_id']));
        return new TodolistUsersResource($todolistUsers);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Request $request
     * @param TodolistUsers $todolistUsers
     * @return JsonResponse
     * @throws Exception
     */
    public function destroy(Request $request, TodolistUsers $todolistUsers)
    {
        if($todolistUsers->user_id !== $request->user()->id){
            return response()->json(['error' => 'You can only edit your own Todolist.'], 403);
        }

        $todolistUsers->delete();
        return response()->json(null,204);
    }
}
