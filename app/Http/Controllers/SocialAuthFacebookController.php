<?php

// SocialAuthFacebookController.php

namespace App\Http\Controllers;

use App\Models\Teacher;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
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
        return Socialite::driver ('facebook')->stateless()->redirect();
    }

    /**
     * Return a callback method from facebook api.
     *
     * @return callback URL from facebook
     */
    public function callback(Request $request, Response $response)
    {
        $facebookUser = Socialite::driver('facebook')->stateless()->user();

        $user = User::firstOrCreate(
            [
                'facebook_id' => $facebookUser->getId()
            ]
        );

        Teacher::updateOrCreate(
            [
                'user_id' => $user->id
            ],
            [
                'name' => $facebookUser->getName(),
                'email' => $facebookUser->getEmail(),
                'photo' => str_replace('normal', 'large', $facebookUser->getAvatar())
            ]
        );

        return redirect('//localhost:3000/getToken?jwt-token=' . JWTAuth::fromUser($user));
    }
}