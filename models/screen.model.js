const mongoose = require('mongoose')
const Schema = mongoose.Schema

const screenSchema = new Schema(
	{
		name: { type: String, required: true },
		seatsRow: { type: Number, required: true },
		seatsCol: { type: Number, required: true },
	},
	{
		timestamps: true,
	}
)

const Screen = mongoose.model('Screen', screenSchema)

module.exports = Screen
