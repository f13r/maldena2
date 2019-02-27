<?php

// SocialAuthFacebookController.php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Tymon\JWTAuth\Facades\JWTAuth;


class SocialAuthFacebookController extends Controller
{
    /**
     * Create a redirect method to facebook api.
     *
     * @return mixed
     */
    public function redirect(Request $request)
    {
        return Socialite::driver ('facebook')->stateless()->redirect ();
    }

    /**
     * Return a callback method from facebook api.
     *
     * @return callback URL from facebook
     */
    public function callback()
    {
        $facebookUser = Socialite::driver('facebook')->stateless()->user();

        $user = User::firstOrCreate(['facebook_id' => $facebookUser->getId()]);
        $user->facebook_id = $facebookUser->getId();
        $user->save();

        return JWTAuth::fromUser($user);
    }
}