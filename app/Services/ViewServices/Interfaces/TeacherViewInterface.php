<?php

namespace App\Services\ViewServices\Interfaces;


use App\Models\Teacher;

interface TeacherViewInterface
{
    public function adjustForView($teachers, $options);
}