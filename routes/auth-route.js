const express = require('express')
const authRoute = express.Router()
const authController = require('../controllers/auth-controller')

authRoute.post('/register', authController.register)
authRoute.post('/login', authController.login)
authRoute.get('/me',authController.getMe)

module.exports = authRoute