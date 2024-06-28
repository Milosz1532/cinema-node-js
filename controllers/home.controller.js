const Movie = require('../models/movie.model')
const Showtime = require('../models/showtime.model')

const getMovies = async (req, res) => {
	try {
		const kidsMovies = await Movie.find({ ageRating: 'KIDS' })
			.limit(10)
			.select('id title genre productionYear duration imgUrl')
			.exec()

		const generalMovies = await Movie.find({ ageRating: { $ne: 'KIDS' } })
			.limit(10)
			.select('title genre releaseDate imgUrl')
			.exec()

		const top5Movies = await Movie.find({}).limit(5).select('title genre releaseData imgUrl').exec()

		const dateToday = new Date()
		dateToday.setHours(0, 0, 0, 0)

		const dateTomorrow = new Date(dateToday)
		dateTomorrow.setDate(dateToday.getDate() + 1)

		const ShowtimeToday = await Showtime.find({
			date: { $gte: dateToday },
		})
			.populate('movie', 'title imgUrl genre productionYear duration')
			.exec()

		const ShowtimeTomorrow = await Showtime.find({
			date: { $gte: dateTomorrow },
		})
			.populate('movie', 'title imgUrl genre productionYear duration')
			.exec()

		const response = {
			kidsRepertoire: kidsMovies.map(movie => ({
				id: movie.id,
				title: movie.title,
				imgUrl: movie.imgUrl,
				productionYear: movie.productionYear,
				duration: movie.duration,
				genre: movie.genre,
			})),
			generalRepertoire: generalMovies.map(movie => ({
				id: movie.id,
				title: movie.title,
				genre: movie.genre,
				productionYear: movie.productionYear,

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
			showtime: {
				today: ShowtimeToday.map(showtime => ({
					_id: showtime._id,
					...showtime.movie.toObject(),
				})),
				tomorrow: ShowtimeTomorrow.map(showtime => ({
					_id: showtime._id,
					...showtime.movie.toObject(),
				})),
			},
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
