const express = require('express')
const postRoute = express.Router()
const postController = require('../controllers/post-controller')

postRoute.get('/', postController.getAllPosts)
postRoute.post('/', postController.createPost)
postRoute.put('/:id',postController.editPost)
postRoute.delete('/:id',postController.deletePost)

module.exports = postRoute