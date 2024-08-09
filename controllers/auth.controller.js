const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../models/user.model')

require('dotenv').config()

const registerUser = async (req, res) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const { email, password } = req.body
		const hashedPassword = await bcrypt.hash(password, 10)

		const user = new User({ email, password: hashedPassword })
		await user.save()

		res.status(201).json({
			message: 'User registered',
		})
	} catch (err) {
		res.status(500).json({
			message: 'Error registering user',
		})
	}
}

const loginUser = async (req, res) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const { email, password } = req.body

		const user = await User.findOne({ email })
		if (!user) {
			return res.status(400).json({ message: 'Invalid email or password' })
		}

		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid email or password' })
		}

		const token = jwt.sign({ user_id: user._id, email: user.email }, process.env.JWT_SECRET_KEY, {
			expiresIn: '1h',
		})

		res.cookie('token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: 3600000,
		})

		res.status(200).json({
			email: user.email,
			userId: user._id,
		})
	} catch (err) {
		res.status(500).json({
			message: 'Error loggin in',
		})
	}
}

const checkAuth = async (req, res) => {
	try {
		const token = req.cookies.token

		if (!token) {
			return res.status(401).json({ isLoggedIn: false })
		}

		jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
			if (err) {
				res.clearCookie('token')
				return res.status(401).json({ isLoggedIn: false })
			}
			res.status(200).json({ isLoggedIn: true, email: decoded.email })
		})
	} catch (err) {
		res.status(500).json({ message: 'Internal server error' })
	}
}

const validateRegister = [
	body('email').isEmail().withMessage('Invalid email address'),
	body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
]

const validateLogin = [
	body('email').isEmail().withMessage('Invalid email address'),
	body('password').exists().withMessage('Password is required'),
]

module.exports = {
	registerUser,
	loginUser,
	checkAuth,
	validateRegister,
	validateLogin,
}
