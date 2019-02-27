<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/


$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group([], function () use ($router) {
    $router->get('/login', 'SocialAuthFacebookController@redirect');
    $router->get('/callback', 'SocialAuthFacebookController@callback');
});

$router->group(['middleware' => ['jwt']], function () use ($router) {
    $router->get('teachers',  ['uses' => 'TeachersController@showAllTeachers']);
    $router->get('teachers/{id}', ['uses' => 'TeachersController@showOneTeachers']);
    $router->post('teachers', ['uses' => 'TeachersController@create']);
    $router->delete('teachers/{id}', ['uses' => 'TeachersController@delete']);
    $router->put('teachers/{id}', ['uses' => 'TeachersController@update']);
});
