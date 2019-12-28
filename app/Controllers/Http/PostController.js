'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Post = use('App/Models/Post')

/**
 * Resourceful controller for interacting with posts
 */
class PostController {
  /**
   * Show a list of all posts.
   * GET posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, auth }) {
    const { page } = request.get()
    const user = await auth.getUser()
    if (await user.can('read_private_posts')) {
      const posts = await Post.query().paginate(page)
      return posts
    }
    const posts = await Post.query().where({ type: 'public' }).paginate(page)
    return posts
  }

  /**
   * Create/save a new post.
   * POST posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const data = request.only(['title', 'text', 'type'])
    const post = await Post.create({ ...data, user_id: auth.user.id })
    return post
  }

  /**
   * Display a single post.
   * GET posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, auth, response }) {
    const post = await Post.findOrFail(params.id)
    await post.load('user')
    if (post.type === 'public') {
      return post
    }
    const user = await auth.getUser()
    if (await user.can('read_private_posts')) {
      return post
    }
    return response.status(403).send({ error: { message: 'You are not allowed to read this post' } })
  }

  /**
   * Update post details.
   * PUT or PATCH posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const post = await Post.findOrFail(params.id)
    const data = request.only(['title', 'text', 'type'])
    post.merge(data)
    await post.save()
    return post
  }

  /**
   * Delete a post with id.
   * DELETE posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const post = await Post.findOrFail(params.id)
    await post.delete()
  }
}

module.exports = PostController
