<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use http\Client\Curl\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TeachersController extends Controller
{

    public function showAllTeachers()
    {
        return response()->json(Teacher::all());
    }

    public function showOneTeacher($id)
    {
        return response()->json(Teacher::find($id));
    }

    public function showMyTeacher()
    {
        $user = Auth::user();
        return response()->json(Teacher::where('user_id', '=', $user->id)->first());
    }

    public function create(Request $request)
    {
        $author = Teacher::create($request->all());

        return response()->json($author, 201);
    }

    public function update(Request $request)
    {
        $id = $request->get('id');

        $theacher = Teacher::findOrFail($id);
        $theacher->update($request->all());

        return response()->json($theacher, 200);
    }

    public function delete($id)
    {
        Teacher::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }
}
