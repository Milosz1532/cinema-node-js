const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userAboutSchema = new Schema(
	{
		user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		firstName: { type: String },
		lastName: { type: String },
		birthDate: { type: Date },
		phoneNumber: { type: String },
		city: { type: String },
	},
	{
		timestamps: true,
	}
)

const UserAbout = mongoose.model('user_abouts', userAboutSchema)

module.exports = UserAbout
