const express = require('express')
const commentRoute = express.Router()
const commentController = require('../controllers/comment-controller')

commentRoute.post('/', commentController.createComment )

module.exports = commentRoute