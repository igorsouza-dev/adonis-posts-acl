'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('users', 'UserController.store').validator('UserStore')
Route.post('sessions', 'SessionController.store').validator('SessionStore')

Route.group(() => {
  // auth routes
  Route.resource('posts', 'PostController')
    .apiOnly().validator(new Map([
      [['posts.store'], ['PostStore']]
    ])).except(['index', 'show']).middleware('is:(administrator || moderator)')
  Route.get('posts', 'PostController.index').middleware('can:read_posts')
  Route.get('posts/:id', 'PostController.show').middleware('can:read_posts')

  Route.resource('permissions', 'PermissionController')
    .apiOnly().validator(new Map([
      [['permissions.store'], ['PermissionStore']]
    ]))

  Route.resource('roles', 'RoleController')
    .apiOnly()

  Route.get('me/roles', 'UserRoleController.index')
  Route.get('me/permissions', 'UserPermissionController.index')
  Route.get('me', 'UserController.show')
  Route.put('me', 'UserController.update')
}).middleware(['auth'])
