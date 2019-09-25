<?php

namespace App\Http\Controllers;

use App\Services\TeacherService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    public function get()
    {
        $user = Auth::user();
        return response()->json($user);
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
