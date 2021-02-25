<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Todolist;
use App\Models\TodolistTask;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /*
     * Check if the user id has the write authority to the todolist
     */
    private function checkWriteAuthority($userId, $todolistId): bool
    {
        return Todolist::whereHas('TodolistUsers',
                function($q) use($todolistId, $userId) {
                    $q->where('user_id', $userId)->where('todolist_id', $todolistId)->where('write', true);
                })->count() == 1;
    }

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

        $hasAuthority = $this->checkWriteAuthority($userId, $todolistId);

        if ($hasAuthority){
            $task = TodolistTask::find($taskId);
            $task->active = 0;
            $task->save();

            return new TaskResource($task);
        } else {
            return response()->json("You do not have the authority to do this.",403);
        }
    }

    public function create(Request $request)
    {
        // Requirements
        $this->validate($request, [
            'title' => 'required',
            'todolist_id' => 'required',
        ]);

        $userId = $request->user()->id;
        $todolistId = $request->todolist_id;

        $hasAuthority = $this->checkWriteAuthority($userId, $todolistId);

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
            return response()->json("You do not have the authority to do this.",403);
        }
    }
}
