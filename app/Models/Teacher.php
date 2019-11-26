<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use phpDocumentor\Reflection\Types\Boolean;

class Teacher extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'facebook', 'lessonDuration', 'phone', 'venue', 'home',
        'age', 'sex',  'experience', 'description', 'lessonPrice', 'education', 'skype', 'created_at'
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['levels', 'name', 'photo', 'email'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'user'
    ];

    public function teacherLevel()
    {
        return $this->hasMany('App\Models\TeacherLevel');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function getPhotoAttribute()
    {
      return $this->user->photo;
    }

    public function getNameAttribute()
    {
      return $this->user->name;
    }

    public function getEmailAttribute()
    {
      return $this->user->email;
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
