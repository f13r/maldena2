<?php

namespace App\Services;


use App\Models\LessonDuration;
use App\Models\Level;
use App\Models\Teacher;
use App\Models\TeacherExperience;
use App\Models\TeacherLevel;

class TeacherService
{

    /**
     * @return array
     */
    public function getTeachersOptions(): array
    {
        return [
            'levels' => Level::all(),
            'lessonDurations' => LessonDuration::all(),
            'teacherExperiences' => TeacherExperience::all()
        ];
    }

    /**
     * @param array $teacherData
     *
     * @return Teacher
     */
    public function saveTeacher(array $teacherData): Teacher
    {
        $teacher = Teacher::findOrFail($teacherData['id']);
        $teacher->update($teacherData);

        $levels = $teacherData['levels'];

        $teacherLevels = [];
        foreach ($levels as $level) {
            $teacherLevels[] = new TeacherLevel(['level_id' => $level]);
        }

        $teacher->teacherLevel()->delete();

        $teacher->teacherLevel()->saveMany($teacherLevels);

        return $teacher;
    }

}