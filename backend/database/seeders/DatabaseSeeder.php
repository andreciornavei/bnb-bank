<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use \App\Models\UserModel;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $admin = new UserModel();
        $admin->create([
            'username' => 'admin',
            'email' => 'admin@bnb-bank.com',
            'password' => 'admin',
            'role' => 'admin',
            'balance' => 0
        ]);
    }
}
