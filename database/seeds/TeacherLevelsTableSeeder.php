<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

use Faker\Factory as Faker;

class TeacherLevelsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create('uk_UA');
        for ($i = 0; $i <= 20; $i++) {
            DB::table('teacher_levels')->insert([
                'teacher_id'     => $faker->numberBetween(1, 20),
                'level_id'     => $faker->numberBetween(1, 14),
            ]);
        }
    }
}
