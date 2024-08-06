const express = require('express')
const router = express.Router()

const guestMiddleware = require('../middlewares/guestMiddleware')

const {
	registerUser,
	loginUser,
	validateRegister,
	validateLogin,
	checkAuth,
} = require('../controllers/auth.controller')

router.post('/register', validateRegister, registerUser)
router.post('/login', validateLogin, loginUser)
router.post('/check', checkAuth)

module.exports = router
