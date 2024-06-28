const mongoose = require('mongoose')
const Schema = mongoose.Schema

const customerSchema = require('./customer.model')

const ticketSchema = new Schema(
	{
		showTime: { type: Schema.Types.ObjectId, ref: 'Showtime', required: true },
		seatNumber: { type: String, required: true },
		price: { type: Number, required: true },
		curstomer: [customerSchema],
	},
	{
		timestamps: true,
	}
)
