const mongoose = require('mongoose')
const Schema = mongoose.Schema

const actorSchema = new Schema({
	name: { type: String, required: true },
	role: { type: String },
})

module.exports = actorSchema
