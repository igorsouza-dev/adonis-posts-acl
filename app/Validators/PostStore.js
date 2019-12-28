'use strict'

class PostStore {
  get rules () {
    return {
      title: 'required',
      text: 'required'
    }
  }
}

module.exports = PostStore
