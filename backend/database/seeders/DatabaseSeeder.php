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
        User::create([
            'name' => 'Alex',
            'email' => 'alex@alex.com',
            'password' => Hash::make('pwdpwd'),
        ]);
        User::create([
            'name' => 'Anthony',
            'email' => 'anthony@anthony.com',
            'password' => Hash::make('pwdpwd'),
        ]);
    }
}
