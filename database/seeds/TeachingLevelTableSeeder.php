<?php

use Illuminate\Database\Seeder;

class TeachingLevelTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $values = [
            'Младшие классы 1-4',
            '5 - 6 классы',
            '7 - 9 классы',
            '10 - 11 классы',
            'Подготовка к ЗНО (ВНО)',
            'Репетитор для начинающих',
            'Грамматика',
            'Разговорный язык',
            'Уровень А1-А2 (Beginner, Elementary)',
            'Уровень B1-B2 (Intermediate)',
            'Уровень C1-C2',
            'TOEFL, IELTS',
            'Деловой и бизнес язык',
            'Для поступления за границу'
        ];

        foreach ($values as $value) {
            DB::table('teaching_levels')->insert(
                [
                    'value' => $value
                ]
            );
        }
    }
}
