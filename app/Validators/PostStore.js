'use strict'

class PostStore {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      title: 'required',
      text: 'required'
    }
  }
}

module.exports = PostStore
