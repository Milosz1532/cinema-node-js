const mongoose = require('mongoose')
const Schema = mongoose.Schema

const actorSchema = new Schema({
	name: { type: String, required: true },
	imgUrl: { type: String },
})

const Actor = mongoose.model('Actor', actorSchema)
module.exports = Actor
