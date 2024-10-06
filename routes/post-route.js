const express = require('express')
const postRoute = express.Router()
const upload = require('../middlewares/upload')
const postController = require('../controllers/post-controller')

postRoute.get('/', postController.getAllPosts)
postRoute.post('/', upload.single('image') , postController.createPost)
postRoute.put('/:id',postController.editPost)
postRoute.delete('/:id',postController.deletePost)

module.exports = postRoute