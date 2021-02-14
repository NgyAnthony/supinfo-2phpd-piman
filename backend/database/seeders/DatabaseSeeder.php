<?php

namespace Database\Seeders;

use App\Models\Todolist;
use App\Models\User;
use Faker\Factory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $faker = Factory::create();
        for ($i = 0; $i < 50; $i++) {
            Todolist::create([
                'title' => $faker->sentence,
                'archived' => $faker->boolean,
            ]);
        }
        User::create([
            'name' => 'Alex',
            'email' => 'alex@alex.com',
            'password' => Hash::make('pwdpwd'),
        ]);

    }
}
