const mongoose = require('mongoose')
const Schema = mongoose.Schema
const actorSchema = require('./actor.model')

const movieSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		genre: { type: String, required: true },
		director: { type: String, required: true },
		cast: [actorSchema],
		releaseDate: { type: Date, required: true },
		duration: { type: Number, required: true }, // in minutes
		imgUrl: { type: String, required: true },
		bannerUrl: { type: String, required: true },
		ageRating: { type: String, required: true },
	},
	{
		timestamps: true,
	}
)

const Movie = mongoose.model('Movie', movieSchema)
module.exports = Movie
