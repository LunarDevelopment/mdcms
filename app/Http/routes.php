<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

// OAuth, Login and Signup Routes.
Route::group(['prefix' => 'auth'], function()
{
  Route::post('login', 'AuthController@login');
  Route::post('signup', 'AuthController@signup');
  Route::get('unlink/{provider}', ['middleware' => 'auth', 'uses' => 'AuthController@unlink']);
});

// API Routes.
Route::group(['prefix' => 'api'], function()
{
  Route::get('me', ['middleware' => 'auth', 'uses' => 'UserController@getUser']);
  Route::put('me', ['middleware' => 'auth', 'uses' => 'UserController@updateUser']);
  Route::get('users', ['middleware' => 'auth', 'uses' => 'UserController@getUsers']);
  //
  Route::get('orders', ['middleware' => 'auth', 'uses' => 'OrdersController@index']);
  Route::delete('orders', ['middleware' => 'auth', 'uses' => 'OrdersController@destroy']);
  Route::post('orders', ['middleware' => 'auth', 'uses' => 'OrdersController@create']);
  Route::put('orders', ['middleware' => 'auth', 'uses' => 'OrdersController@update']);
  Route::put('orders/statusChange', ['middleware' => 'auth', 'uses' => 'OrdersController@edit']);  
  Route::get('orders/sendEmailReminder', ['middleware' => 'auth', 'uses' => 'OrdersController@sendEmailReminder']);
});
// Twitter Routes.
Route::group(['prefix' => 'twitter'], function()
{
  //Route::get('dump', ['middleware' => 'auth', 'uses' => 'TwitterController@tweet']);
  //Route::get('search', ['middleware' => 'auth', 'uses' => 'TwitterController@searchTweets']);
  //Route::post('tweet', ['middleware' => 'auth', 'uses' => 'TwitterController@tweet']);
  //Route::post('retweet', ['middleware' => 'auth', 'uses' => 'TwitterController@retweet']);
  //Route::post('favourite', ['middleware' => 'auth', 'uses' => 'TwitterController@favourite']);
  //Route::post('follow', ['middleware' => 'auth', 'uses' => 'TwitterController@followUser']);
});
// Initialize Angular.js App Route.
Route::get('/', 'HomeController@index');
