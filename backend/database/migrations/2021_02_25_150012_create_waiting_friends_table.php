<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWaitingFriendsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('waiting_friends', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->bigInteger('user_initiator')->unsigned()->index();
            $table->bigInteger('user_target')->unsigned()->index();
        });

        Schema::table('waiting_friends', function($table) {
            $table->foreign('user_initiator')->references('id')->on('users');
            $table->foreign('user_target')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('waiting_friends');
    }
}
