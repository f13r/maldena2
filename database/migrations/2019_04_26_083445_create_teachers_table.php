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
            $table->string('phone');
            $table->string('email');
            $table->smallInteger('experience');
            $table->text('education');
            $table->smallInteger('lessonDuration');
            $table->string('lessonPrice');
            $table->text('venue')->nullable();
            $table->text('home')->nullable();
            $table->smallInteger('skype')->nullable();
            $table->integer('teachingLevels');
            $table->text('description');
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
