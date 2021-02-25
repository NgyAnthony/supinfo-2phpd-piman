<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\TaskUsers;
use App\Models\Todolist;
use App\Models\TodolistTask;
use Illuminate\Http\Request;

class TaskController extends Controller
{

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     */
    public function deactivateTask(Request $request)
    {
        // Requirements
        $this->validate($request, [
            'task_id' => 'required',
            'todolist_id' => 'required',
        ]);

        $userId = $request->user()->id;
        $taskId = $request->task_id;
        $todolistId = $request->todolist_id;

        $hasAuthority = $this->checkAuthority($userId, $todolistId);

        if ($hasAuthority){
            $task = TodolistTask::find($taskId);
            $task->active = 0;
            $task->save();

            return new TaskResource($task);
        } else {
            return response()->json(null,204);
        }
    }

    private function checkAuthority($userId, $todolistId): bool
    {
        return Todolist::whereHas('TodolistUsers',
            function($q) use($todolistId, $userId) {
                $q->where('user_id', $userId)->where('todolist_id', $todolistId);
            })->count() == 1;
    }

    public function create(Request $request)
    {
        //TODO: Check if user has authority over todolist ID before

        // Requirements
        $this->validate($request, [
            'title' => 'required',
            'todolist_id' => 'required',
        ]);

        $userId = $request->user()->id;
        $todolistId = $request->todolist_id;

        $hasAuthority = $this->checkAuthority($userId, $todolistId);

        if($hasAuthority){
            // Create object
            $task = new TodolistTask;
            // Set title
            $task->title = $request->title;

            // Set description and tag
            if(!empty($request->description)) {
                $task->description = $request->description;
            }

            if(!empty($task->tag = $request->tag)){
                $task->tag = $request->tag;
            }

            // Set non-archived and active by default
            $task->archived = 0;
            $task->active = 1;

            // Add foreign key of todolist to task
            $task->todolist_id = $todolistId;
            $task->save();

            return new TaskResource($task);
        } else {
            return response()->json(null,204);
        }
    }
}
