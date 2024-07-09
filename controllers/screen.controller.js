const Screen = require('../models/screen.model')

const getAllScreens = async (req, res) => {
	try {
		const screens = await Screen.find({})
		res.json(screens)
	} catch (err) {
		res.status(500).json({
			message: 'There was an error fetching the screens',
		})
	}
}

const createScreen = async (req, res) => {
	const screen = new Screen(req.body)
	try {
		const newScreen = await screen.save()
		res.status(201).json(newScreen)
	} catch (err) {
		res.status(500).json({
			message: err.message,
		})
	}
}

module.exports = {
	getAllScreens,
	createScreen,
}
