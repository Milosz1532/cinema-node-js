const Showtime = require('../models/showtime.model')

const getAllShowtimes = async (req, res) => {
	try {
		const showtimes = await Showtime.find()
			.populate('movie', 'title imgUrl genre productionYear duration')
			.populate('screen', 'name')
			.exec()
		res.json(showtimes)
	} catch (err) {
		res.status(500).json({
			message: 'There was an error fetching the showtimes',
		})
	}
}

const getShowtimeById = async (req, res) => {
	const { id } = req.params
	try {
		const showtime = await Showtime.findById(id).populate('movie screen')
		if (!showtime) {
			return res.status(404).json({ message: 'Showtime not found' })
		}

		const formatedShowtime = {
			id: showtime._id,
			date: showtime.date,
			time: showtime.time,
			language: showtime.language,
			movieType: showtime.movieType,
			movie: {
				id: showtime.movie._id,
				title: showtime.movie.title,
				productionYear: showtime.movie.productionYear,
				duration: showtime.movie.duration,
				imgUrl: showtime.movie.imgUrl,
				ageRating: showtime.movie.ageRating,
			},
			screen: {
				id: showtime.screen._id,
				name: showtime.screen.name,
				rows: showtime.screen.rows,
			},
		}

		res.status(200).json(formatedShowtime)
	} catch (err) {
		res.status(500).json({
			message: 'There was an error fetching the showtime',
		})
	}
}

const createShowtime = async (req, res) => {
	const showtime = new Showtime(req.body)
	try {
		const newShowtime = await showtime.save()
		res.status(201).json(newShowtime)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

const updateShowtimeDates = async (req, res) => {
	try {
		const showtimes = await Showtime.find().exec()

		const halfLength = Math.ceil(showtimes.length / 2)

		const currentDate = new Date()
		const tommorowDate = new Date()
		tommorowDate.setDate(tommorowDate.getDate() + 1)

		const promises = showtimes.map((showtime, index) => {
			if (index < halfLength) {
				showtime.date = currentDate
			} else {
				showtime.date = tomorrowDate
			}
			return showtime.save()
		})

		await Promise.all(promises)

		res.status(200).json({ message: 'Showtime dates updated successfully' })
	} catch (err) {
		res.status(500).json({
			message: 'There was an error updating the showtime dates',
		})
	}
}

module.exports = {
	getAllShowtimes,
	createShowtime,
	updateShowtimeDates,
	getShowtimeById,
}
