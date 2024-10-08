const express = require('express')
const likeRoute = express.Router()
const likeController = require('../controllers/like-controller')

likeRoute.post('/', likeController.createLike)
likeRoute.delete('/:id', likeController.deleteLike)

module.exports = likeRoute