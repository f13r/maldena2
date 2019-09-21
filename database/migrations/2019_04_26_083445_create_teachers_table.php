<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTeachersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('teachers', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->string('photo');
            $table->string('name');
            $table->string('phone')->nullable();
            $table->string('email');
            $table->smallInteger('experience')->nullable();
            $table->text('education')->nullable();
            $table->smallInteger('lessonDuration')->nullable();
            $table->string('lessonPrice')->nullable();
            $table->text('venue')->nullable();
            $table->text('home')->nullable();
            $table->smallInteger('skype')->nullable();
            $table->integer('teachingLevels')->nullable();;
            $table->text('description')->nullable();;
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('teachers');
    }
}
