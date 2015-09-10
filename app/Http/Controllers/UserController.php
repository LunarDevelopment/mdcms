<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Config;
use JWT;
use GuzzleHttp;
use GuzzleHttp\Subscriber\Oauth\Oauth1;
use App\User;

class UserController extends Controller {

    /**
     * Generate JSON Web Token.
     */
    protected function createToken($user)
    {
        $payload = [
            'sub' => $user->id,
            'iat' => time(),
            'exp' => time() + (2 * 7 * 24 * 60 * 60)
        ];
        return JWT::encode($payload, Config::get('app.token_secret'));
    }

    /**
     * Get signed in user's profile.
     */
    public function getUser(Request $request)
    {
        $user = User::find($request['user']['sub']);

        return $user;
    }
    /**
     * Update signed in user's profile.
     */
    public function updateUser(Request $request)
    {
        $user = User::find($request['user']['sub']);

        $user->displayName = $request->input('displayName');
        $user->department = $request->input('department');
        $user->email = $request->input('email');
        $user->save();

        $token = $this->createToken($user);

        return response()->json(['token' => $token]);
    }
    /**
     * Get all registered users
     */
    public function getUsers(Request $request)
    {
      $users = User::all();
      return response()->json(['users' => $users]);
    }
}