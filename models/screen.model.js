const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SeatSchema = new Schema({
	type: {
		type: String,
		enum: ['standard', 'vip', 'empty'],
		default: 'standard',
	},
})

const ScreenSchema = new Schema({
	name: { type: String, required: true },
	rows: {
		type: [[SeatSchema]],
		required: true,
	},
})

const Screen = mongoose.model('Screen', ScreenSchema)

module.exports = Screen
