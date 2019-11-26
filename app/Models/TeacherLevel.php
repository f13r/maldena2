<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class TeacherLevel extends Model
{

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'teacher_id', 'level_id'
    ];

    protected $visible = ['level_id'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];

    public function teacher()
    {
      return $this->belongsToMany('App\Models\Teacher');
    }

}
