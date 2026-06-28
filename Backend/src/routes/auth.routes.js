const express = require('express')
const authController = require('../controllers/auth.controller')
const { identifyUser } = require('../middlewares/auth.middleware')

const authRouter = express.Router()

authRouter.post('/register', authController.registerUser)

authRouter.post('/login', authController.loginUser)

authRouter.get("/get-me", identifyUser, authController.getMe)

authRouter.get("/logout", authController.logout )

module.exports = authRouter