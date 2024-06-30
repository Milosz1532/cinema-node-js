const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./config/database')
const app = express()
const path = require('path')
const cors = require('cors')

app.use('/images', express.static(path.join(__dirname, 'public', 'images')))

//========= Import routes =========//
const actorRouter = require('./routes/actor.route')
const moviesRouter = require('./routes/movie.route')
const homeRouter = require('./routes/home.route')
const showtimeRouter = require('./routes/showtime.route')
const screenRouter = require('./routes/screen.route')

//========= Middleware =========//
app.use(express.json())
app.use(
	cors({
		origin: process.env.ORIGIN,
	})
)

//========= Define routes =========//
app.use('/api/actors', actorRouter)
app.use('/api/movies', moviesRouter)
app.use('/api/home', homeRouter)
app.use('/api/showtime', showtimeRouter)
app.use('/api/screen', screenRouter)

connectDB()
	.then(() => {
		const PORT = process.env.PORT || 3000
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`)
		})
	})
	.catch(error => {
		console.error('Failed to connect to MongoDB:', error)
		process.exit(1)
	})
