const jwt = require('jsonwebtoken')
require('dotenv').config()

const guestMiddleware = (req, res, next) => {
	const token = req.cookies.token

	if (token) {
		jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
			if (err) {
				res.clearCookie('token', {
					httpOnly: true,
					secure: process.env.NODE_ENV === 'production',
					sameSite: 'strict',
				})

				return res.status(403).json({ message: 'Invalid token. Please log in again.' })
			}

			return res.status(403).json({ message: 'You are already logged in' })
		})
	} else {
		next()
	}
}

module.exports = guestMiddleware
