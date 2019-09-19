<?php
/**
 * Created by PhpStorm.
 * User: fler
 * Date: 2019-09-11
 * Time: 17:27
 */

namespace App\Services\ViewServices;

use App\Services\ViewServices\Interfaces\TeacherViewInterface;

class DefaultTeacherViewService implements TeacherViewInterface
{
    public function adjustForView($teachers, $options)
    {
        foreach ($teachers as &$teacher) {
            $teacher['viewExperience'] = $options['teacherExperiences']->find($teacher['experience'])['value'];
            $teacher['lessonDuration'] = $options['lessonDurations']->find($teacher['lessonDuration'])['value'];
            $teacher['viewLevels'] = $options['levels']->find($teacher['levels'])->pluck('value');
         }

        return $teachers;
    }
}