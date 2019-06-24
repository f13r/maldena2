<?php

namespace App\Http\Controllers;

use App\Services\TeacherService;
use Illuminate\Http\Request;

class OptionsController extends Controller
{

    public function get(TeacherService $teacherService)
    {
        return response()->json($teacherService->getTeachersOptions());
    }


    public function post()
    {
    }

    public function update(Request $request)
    {

    }

    public function delete($id)
    {

    }
}
