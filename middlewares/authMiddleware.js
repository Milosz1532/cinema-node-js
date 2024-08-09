const jwt = require('jsonwebtoken')
require('dotenv').config()

const authMiddleware = (req, res, next) => {
	// const authHeader = req.headers['authorization']
	// const token = authHeader && authHeader.split(' ')[1]
	const token = req.cookies.token

	if (!token) {
		return res.status(401).json({ message: 'No token provided' })
	}

	jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
		if (err) {
			res.clearCookie('token', {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
			})

			return res.status(401).json({ message: 'Invalid token' })
		}
		req.user_id = decoded.user_id
		next()
	})
}

module.exports = authMiddleware
