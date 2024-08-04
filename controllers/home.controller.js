const Movie = require('../models/movie.model')
const Showtime = require('../models/showtime.model')

const getMovies = async (req, res) => {
	try {
		const kidsMovies = await Movie.find({ ageRating: 'KIDS' })
			.limit(10)
			.select('_id title genre productionYear duration imgUrl')
			.exec()

		const generalMovies = await Movie.find({ ageRating: { $ne: 'KIDS' } })
			.limit(10)
			.select('_id title genre productionYear duration imgUrl')
			.exec()

		const top5Movies = await Movie.find({})
			.limit(5)
			.select('_id title genre productionYear duration imgUrl')
			.exec()

		const dateToday = new Date()
		dateToday.setHours(0, 0, 0, 0)

		const dateTomorrow = new Date(dateToday)
		dateTomorrow.setDate(dateToday.getDate() + 1)

		const ShowtimeToday = await Showtime.find({
			date: { $gte: dateToday, $lt: dateTomorrow },
		})
			.populate('movie', 'title imgUrl genre productionYear duration')
			.exec()

		const ShowtimeTomorrow = await Showtime.find({
			date: { $gte: dateTomorrow },
		})
			.populate('movie', 'title imgUrl genre productionYear duration')
			.exec()

		const uniqueMovies = showtimes => {
			const movieMap = new Map()
			showtimes.forEach(showtime => {
				if (!movieMap.has(showtime.movie._id.toString())) {
					movieMap.set(showtime.movie._id.toString(), showtime)
				}
			})
			return Array.from(movieMap.values())
		}

		const uniqueShowtimeToday = uniqueMovies(ShowtimeToday)
		const uniqueShowtimeTomorrow = uniqueMovies(ShowtimeTomorrow)

		const response = {
			kidsRepertoire: kidsMovies.map(movie => ({
				id: movie._id,
				title: movie.title,
				imgUrl: movie.imgUrl,
				productionYear: movie.productionYear,
				duration: movie.duration,
				genre: movie.genre,
			})),
			generalRepertoire: generalMovies.map(movie => ({
				id: movie._id,
				title: movie.title,
				genre: movie.genre,
				productionYear: movie.productionYear,
				duration: movie.duration,
				imgUrl: movie.imgUrl,
			})),
			top5Movies: top5Movies.map(movie => ({
				id: movie._id,
				title: movie.title,
				genre: movie.genre,
				duration: movie.duration,
				productionYear: movie.productionYear,
				imgUrl: movie.imgUrl,
			})),
			showtime: {
				today: uniqueShowtimeToday.map(showtime => ({
					_id: showtime._id,
					movieId: showtime.movie._id,
					...showtime.movie.toObject(),
				})),
				tomorrow: uniqueShowtimeTomorrow.map(showtime => ({
					_id: showtime._id,
					movieId: showtime.movie._id,
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
