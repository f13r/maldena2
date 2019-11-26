<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

use Faker\Factory as Faker;

class TeachersTableSeeder extends Seeder
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
            DB::table('teachers')->insert([
                'user_id'        => $faker->unique(true)->numberBetween(1, 20),
                'phone'          => $faker->phoneNumber,
                'experience'     => $faker->numberBetween(1, 4),
                'education'      => $faker->paragraph(1),
                'lessonDuration' => $faker->numberBetween(1, 4),
                'lessonPrice'    => $faker->randomElement([100, 150, 200, 250]),
                'venue'          => $faker->optional()->paragraph,
                'home'           => $faker->optional()->paragraph,
                'skype'          => $faker->word,
                'teachingLevels' => $faker->numberBetween(1, 100),
                'description'    => $faker->paragraph(3),
                'created_at'     => new \DateTime(),
                'updated_at'     => new \DateTime()
            ]);
        }
    }
}
