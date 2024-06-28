const Movie = require('../models/movie.model')

const getMovies = async (req, res) => {
	try {
		const kidsMovies = await Movie.find({ ageRating: 'KIDS' })
			.limit(10)
			.select('id title imgUrl')
			.exec()

		const generalMovies = await Movie.find({ ageRating: { $ne: 'KIDS' } })
			.limit(10)
			.select('title genre releaseDate imgUrl')
			.exec()

		const top5Movies = await Movie.find({})
			.limit(5)
			.select('title genre releaseData imgUrl')
			.exec()

		const response = {
			kidsRepertoire: kidsMovies.map(movie => ({
				id: movie.id,
				title: movie.title,
				imgUrl: movie.imgUrl,
			})),
			generalRepertoire: generalMovies.map(movie => ({
				id: movie.id,
				title: movie.title,
				genre: movie.genre,
				releaseDate: movie.releaseDate,
				imgUrl: movie.imgUrl,
			})),
			top5Movies: top5Movies.map(movie => ({
				id: movie.id,
				title: movie.title,
				genre: movie.genre,
				releaseDate: movie.releaseDate,
				imgUrl: movie.imgUrl,
			})),
		}

		res.json(response)
	} catch (error) {
		console.error('Error fetching movies:', error)
		res.status(500).json({ error: 'Failed to fetch movies' })
	}
}

module.exports = {
	getMovies,
}
