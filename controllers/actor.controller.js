const Actor = require('../models/actor.model')

const getAllActors = async (req, res) => {
	try {
		const actors = await Actor.find({}).exec()
		res.json({ actors })
	} catch (err) {
		res.status(500).json({
			message: 'There was an error fetching the actors',
		})
	}
}

const createActor = async (req, res) => {
	const actor = new Actor(req.body)
	try {
		const createActor = await actor.save()
		res.status(201).json(createActor)
	} catch (err) {
		res.status(500).json(err)
	}
}

module.exports = {
	getAllActors,
	createActor,
}
