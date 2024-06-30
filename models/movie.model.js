const mongoose = require('mongoose')
const Schema = mongoose.Schema

const castSchema = new Schema({
	actor: { type: Schema.Types.ObjectId, ref: 'Actor', required: true },
	characterName: { type: String, required: true },
})

const movieSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		genre: { type: String, required: true },
		director: { type: String, required: true },
		cast: [castSchema],
		productionCountry: { type: String, required: true },
		productionYear: { type: Number, required: true },
		duration: { type: Number, required: true },
		imgUrl: { type: String, required: true },
		bannerUrl: { type: String, required: true },
		ageRating: { type: String, required: true },
		trailerUrl: { type: String, required: true },
	},
	{
		timestamps: true,
	}
)

const Movie = mongoose.model('Movie', movieSchema)
module.exports = Movie
