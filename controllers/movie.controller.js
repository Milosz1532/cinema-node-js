const Movie = require('../models/movie.model')
const Showtime = require('../models/showtime.model')

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

const getMovieById = async (req, res) => {
	const { id } = req.params
	try {
		const movie = await Movie.findById(id).populate('cast.actor')
		if (!movie) {
			return res.status(404).json({ message: 'Movie not found' })
		}

		const transformedCast = movie.cast.map(castMember => ({
			actor_id: castMember.actor._id,
			name: castMember.actor.name,
			imgUrl: castMember.actor.imgUrl,
			characterName: castMember.characterName,
		}))

		const otherMovies = await Movie.find({})
			.limit(5)
			.select('title genre releaseData imgUrl')
			.exec()

		const showtimes = await Showtime.find({ movie: id })

		const transformedMovie = {
			_id: movie._id,
			title: movie.title,
			description: movie.description,
			genre: movie.genre,
			director: movie.director,
			cast: transformedCast,
			productionCountry: movie.productionCountry,
			productionYear: movie.productionYear,
			duration: movie.duration,
			imgUrl: movie.imgUrl,
			bannerUrl: movie.bannerUrl,
			ageRating: movie.ageRating,
			trailerUrl: movie.trailerUrl,
			createdAt: movie.createdAt,
			updatedAt: movie.updatedAt,
			showtimes: showtimes,
			otherMovies: otherMovies.map(movie => ({
				id: movie.id,
				title: movie.title,
				genre: movie.genre,
				releaseDate: movie.releaseDate,
				imgUrl: movie.imgUrl,
			})),
		}

		res.json(transformedMovie)
	} catch (err) {
		res.status(500).json({ message: 'There was an error downloading the movie' })
	}
}

module.exports = {
	getAllMovies,
	createMovie,
	getMovieById,
}
