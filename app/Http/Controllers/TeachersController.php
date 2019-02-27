<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TeachersController extends Controller
{

    public function showAllTeachers()
    {
        $user = Auth::user();
        return response()->json(Auth::user()->teacher);
    }

    public function showOneTeachers($id)
    {
        return response()->json(Teacher::find($id));
    }

    public function create(Request $request)
    {
        $author = Teacher::create($request->all());

        return response()->json($author, 201);
    }

    public function update($id, Request $request)
    {
        $author = Teacher::findOrFail($id);
        $author->update($request->all());

        return response()->json($author, 200);
    }

    public function delete($id)
    {
        Teacher::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }
}
