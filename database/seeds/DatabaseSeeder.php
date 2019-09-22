<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call('UsersTableSeeder');
        $this->call('TeachersTableSeeder');
        $this->call('LessonDurationTableSeeder');
        $this->call('TeacherExperienceTableSeeder');
        $this->call('LevelTableSeeder');
        $this->call('TeacherLevelsTableSeeder');
    }
}
