<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LessonDurationTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $values = [
            '30 минут',
            '45 минут',
            '1 час',
            '1 час 30 минут'
        ];

        foreach ($values as $value) {
            DB::table('lesson_durations')->insert(
                [
                    'value' => $value
                ]
            );
        }
    }
}
