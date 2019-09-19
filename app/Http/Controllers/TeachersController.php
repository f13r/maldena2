<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use App\Services\ViewServices\Interfaces\TeacherViewInterface;
use App\Services\TeacherService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TeachersController extends Controller
{

    public function showAllTeachers(TeacherViewInterface $view, TeacherService $teacherService)
    {
        $teachers = $view->adjustForView(Teacher::all(), $teacherService->getTeachersOptions());
        return response()->json($teachers);
    }

    public function showOneTeacher($id)
    {
        return response()->json(Teacher::find($id));
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function showMyTeacher(TeacherViewInterface $view)
    {

        $user = Auth::user();
        $teacher = Teacher::where('user_id', '=', $user->id)->first();

        return response()->json($teacher);
    }

    public function create(Request $request)
    {
        $author = Teacher::create($request->all());

        return response()->json($author, 201);
    }

    public function update(Request $request, TeacherService $teacherService)
    {
        $teacher = $teacherService->saveTeacher($request->all());
        return response()->json($teacher, 200);
    }

    public function delete($id)
    {
        Teacher::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }
}
