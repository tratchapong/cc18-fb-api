const express = require('express')
const authRoute = express.Router()
const authController = require('../controllers/auth-controller')
const authenticate = require('../middlewares/authenticate')

authRoute.post('/register', authController.register)
authRoute.post('/login', authController.login)
authRoute.get('/me', authenticate, authController.getMe)

module.exports = authRoute