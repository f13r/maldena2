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
    public function createTeacher(array $teacherData): Teacher
    {
        $teacher = new Teacher();
        $teacher->fill($teacherData);
        $teacher->save();

        $teacher->teacherLevel()->delete();
        $teacher->teacherLevel()->saveMany($this->createLevelsByArray($teacherData['levels']));

        return $teacher;
    }

    /**
     * @param array $teacherData
     *
     * @return Teacher
     */
    public function updateTeacher(array $teacherData): Teacher
    {
        $teacher = Teacher::findOrFail($teacherData['id']);
        $teacher->update($teacherData);

        $teacher->teacherLevel()->delete();
        $teacher->teacherLevel()->saveMany($this->createLevelsByArray($teacherData['levels']));

        return $teacher;
    }

    /**
     * @param array $levels
     *
     * @return array
     */
    private function createLevelsByArray($levels): array
    {
        $teacherLevels = [];
        foreach ($levels as $level) {
            $teacherLevels[] = new TeacherLevel(['level_id' => $level]);
        }

        return $teacherLevels;
    }
}
