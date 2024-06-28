const mongoose = require('mongoose')
const Schema = mongoose.Schema

const showtimeSchema = new Schema(
	{
		movie: { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
		screen: { type: Schema.Types.ObjectId, ref: 'Screen', required: true },
		date: { type: Date, required: true },
		time: { type: String, required: true },
	},
	{
		timestamps: true,
	}
)
const ShowTime = mongoose.model('Showtime', showtimeSchema)

module.exports = ShowTime
