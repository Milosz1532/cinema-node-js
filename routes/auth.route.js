const express = require('express')
const router = express.Router()

const guestMiddleware = require('../middlewares/guestMiddleware')

const {
	registerUser,
	loginUser,
	validateRegister,
	validateLogin,
} = require('../controllers/auth.controller')

router.post('/register', guestMiddleware, validateRegister, registerUser)
router.post('/login', guestMiddleware, validateLogin, loginUser)

module.exports = router
