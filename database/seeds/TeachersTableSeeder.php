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

        DB::table('teachers')->insert([
            'name' => $faker->name,
            'email' => $faker->email,
            'facebook' => $faker->url,
            'photo' => $faker->imageUrl(),
            'age' => $faker->numberBetween(18, 60),
            'sex' => $faker->randomElement($array = array ('male', 'female')),
            'experience' => $faker->numberBetween(1, 5),
            'description' => $faker->paragraph(),
            'created_at' => new \DateTime(),
            'updated_at' => new \DateTime()
        ]);
    }
}
