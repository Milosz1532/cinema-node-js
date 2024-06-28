const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bannerSchema = new Schema(
	{
		movie: { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
		priority: { type: Number, required: true },
	},
	{
		timestamps: true,
	}
)

const Banner = mongoose.model('Banner', bannerSchema)

module.exports = Banner
