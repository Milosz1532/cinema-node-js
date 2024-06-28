const Movie = require('../models/movie.model')

const getAllMovies = async (req, res) => {
	try {
		const movies = await Movie.find()
		res.json(movies)
	} catch (err) {
		res.status(500).json({
			message: 'There was an error downloading the movies',
		})
	}
}

const createMovie = async (req, res) => {
	const movie = new Movie(req.body)
	try {
		const newMovie = await movie.save()
		res.status(201).json(newMovie)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

module.exports = {
	getAllMovies,
	createMovie,
}
