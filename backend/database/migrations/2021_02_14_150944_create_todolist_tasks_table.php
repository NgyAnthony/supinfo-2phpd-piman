<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTodolistTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('todolist_tasks', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('todolist_id')->unsigned()->index(); // this is working
            $table->string('title');
            $table->string('description')->nullable();
            $table->string('tag')->nullable();
            $table->boolean('active');
            $table->boolean('archived');
            $table->timestamps();
        });

        Schema::table('todolist_tasks', function($table) {
            $table->foreign('todolist_id')->references('id')->on('todolists');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('todolist_tasks');
    }
}
