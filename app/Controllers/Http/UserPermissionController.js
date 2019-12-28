'use strict'

class UserPermissionController {
  async index ({ auth }) {
    const { user } = auth
    await user.load('permissions')
    return user
  }
}

module.exports = UserPermissionController
