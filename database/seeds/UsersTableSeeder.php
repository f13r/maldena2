<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

use Faker\Factory as Faker;

class UsersTableSeeder extends Seeder
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
            DB::table('users')->insert([
                'name'           => $faker->name,
                'email'          => $faker->email,
                'photo'          => $faker->imageUrl(),
                'facebook_id'    => $faker->randomNumber(5),
                'facebook_token' => $faker->randomNumber(5),
                'created_at'     => new \DateTime(),
                'updated_at'     => new \DateTime()
            ]);
        }
    }
}
