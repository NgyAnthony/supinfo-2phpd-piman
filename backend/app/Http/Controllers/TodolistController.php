<?php

namespace App\Http\Controllers;

use App\Http\Resources\TodolistResource;
use App\Models\Todolist;
use App\Models\TodolistUsers;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class TodolistController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        $userId = $request->user()->id;
        $todolists = Todolist::whereHas('TodolistUsers', function($q) use($userId) {
            $q->where('user_id', $userId);
        })->get();

        return TodolistResource::collection($todolists);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return TodolistResource
     * @throws ValidationException
     */
    public function store(Request $request): TodolistResource
    {
        $this->validate($request, [
            'title' => 'required',
        ]);

        $todolist = new Todolist;
        $todolist->title = $request->title;
        $todolist->archived = false;
        $todolist->save();

        $todolistusers = new TodolistUsers;
        $todolistusers->user_id = $request->user()->id;
        $todolistusers->todolist_id = $todolist->id;
        $todolistusers->read = true;
        $todolistusers->write = true;
        $todolistusers->owner = true;
        $todolistusers->save();

        return new TodolistResource($todolist);
    }

    /**
     * Display the specified resource.
     *
     * @param Todolist $todolist
     * @return TodolistResource
     */
    public function show(Todolist $todolist): TodolistResource
    {
        return new TodolistResource($todolist);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @return TodolistResource|JsonResponse
     */
    public function update(Request $request)
    {
        $userId = $request->user()->id;
        $todolistId = $request->todolist_id;
        $todolist = Todolist::whereHas('todolistUsers', function($q) use($userId, $todolistId) {
            $q->where('user_id', $userId)
              ->where('todolist_id', $todolistId);
        })->first();

        $todolist->update($request->only(['title','archived']));
        return new TodolistResource($todolist);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Request $request
     * @param Todolist $todolist
     * @return JsonResponse
     * @throws Exception
     */
    public function destroy(Request $request, Todolist $todolist): JsonResponse
    {
        if($todolist->todolistusers()->user_id !== $request->user()->id){
            return response()->json(['error' => 'You can only delete your own Todolist.'], 403);
        }

        $todolist->delete();
        return response()->json(null,204);
    }
}
