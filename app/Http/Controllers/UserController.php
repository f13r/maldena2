<?php

namespace App\Http\Controllers;

use App\Services\TeacherService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function get()
    {
        return response()->json(Auth::user());
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
