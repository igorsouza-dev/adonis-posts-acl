'use strict'

class UserRoleController {
  async index ({ auth }) {
    const { user } = auth
    await user.load('roles')
    return user
  }
}

module.exports = UserRoleController
