<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TeacherExperienceTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $values = [
            'меньше года',
            'от 1 до 5 лет',
            'от 5 до 10 лет',
            'более 10 лет'
        ];

        foreach ($values as $value) {
            DB::table('teacher_experiences')->insert(
                [
                    'value' => $value
                ]
            );
        }
    }
}
