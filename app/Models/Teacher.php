<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'name', 'email', 'facebook', 'photo', 'lessonDuration', 'phone', 'venue', 'home',
        'age', 'sex',  'experience', 'description', 'lessonPrice', 'education', 'skype'
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['levels'];


    public function teacherLevel()
    {
        return $this->hasMany('App\Models\TeacherLevel');
    }

    public function getLevelsAttribute()
    {
        $levels = [];
        $teacherLevels = $this->teacherLevel()->get();

        foreach ($teacherLevels as $teacherLevel) {
            $levels[] = $teacherLevel->level_id;
        }

        return $levels;
    }
}