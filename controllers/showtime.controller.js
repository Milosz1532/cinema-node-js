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

const createShowtime = async (req, res) => {
	const showtime = new Showtime(req.body)
	try {
		const newShowtime = await showtime.save()
		res.status(201).json(newShowtime)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

module.exports = {
	getAllShowtimes,
	createShowtime,
}
