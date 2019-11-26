<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use App\User;
use App\Services\TeacherService;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TeachersController extends Controller
{

    public function showAllTeachers()
    {
        return response()->json(Teacher::all());
    }


    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function get($teacherId)
    {
        return response()->json(Teacher::find($teacherId));
    }

    public function post(Request $request, TeacherService $teacherService)
    {
        $user = Auth::user();
        $saveParams = $request->all();
        $saveParams['user_id'] = $user->id;

        $user->update($saveParams);
        $teacher = $teacherService->createTeacher($saveParams);

        return response()->json($teacher, 201);
    }

    public function update(Request $request, TeacherService $teacherService)
    {
        $teacher = $teacherService->updateTeacher($request->all());
        return response()->json($teacher, 200);
    }

    public function delete($id)
    {
        Teacher::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }
}
