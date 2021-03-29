<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTodolistUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('todolist_users', function (Blueprint $table) {
            $table->id();
            // Don't forget to use same type on ID and FK
            $table->bigInteger('user_id')->unsigned()->index();
            $table->bigInteger('shared_by_id')->unsigned()->index();
            $table->bigInteger('todolist_id')->unsigned()->index();
            $table->boolean('owner');
            $table->boolean('read');
            $table->boolean('write');
            $table->timestamps();

        });

        Schema::table('todolist_users', function($table) {
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('shared_by_id')->references('id')->on('users');
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
        Schema::dropIfExists('todolist_users');
    }
}
