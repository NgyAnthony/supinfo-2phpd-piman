<?php

namespace App\Http\Controllers;

use App\Http\Resources\TodolistResource;
use App\Http\Resources\TaskResource;
use App\Models\TaskUsers;
use App\Models\Todolist;
use App\Models\TodolistTask;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TaskController extends Controller
{

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @return TaskResource
     */
    public function deactivateTask(Request $request)
    {
        $userId = $request->user()->id;
        $task_id = $request->task_id;

        $task = TodolistTask::whereHas('taskusers', function($q) use($userId, $task_id) {
            $q->where('user_id', $userId)
                ->where('task_id', $task_id);
        })->first();

        $task->active = 0;

        $task->save();
        return new TaskResource($task);
    }

    public function create(Request $request)
    {
        $this->validate($request, [
            'title' => 'required',
            'todolist_id' => 'required',
        ]);

        $task = new TodolistTask;
        $task->title = $request->title;

        if(!empty($request->description)) {
            $task->description = $request->description;
        }

        if(!empty($task->tag = $request->tag)){
            $task->tag = $request->tag;
        }

        $task->archived = 0;
        $task->active = 1;
        $task->todolist_id = $request->todolist_id;
        $task->save();

        $taskusers = new TaskUsers;
        $taskusers->user_id = $request->user()->id;
        $taskusers->task_id = $task->id;
        $taskusers->save();

        return new TaskResource($task);
    }
}
