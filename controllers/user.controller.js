const UserAbout = require('../models/userAbout.modal')

const getUserDetails = async (req, res) => {
	try {
		const userId = req.user_id
		const userDetails = await UserAbout.findOne({ user_id: userId })
		if (!userDetails) {
			return res.status(404).json({ error: 'User details not found' })
		}
		res.status(200).json(userDetails)
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch user details' })
	}
}

const updateUserDetails = async (req, res) => {
	try {
		const userId = req.user_id
		const { firstName, lastName, email, phoneNumber, birthDate, city } = req.body

		const updatedDetails = await UserAbout.findOneAndUpdate(
			{ user_id: userId },
			{
				$set: {
					firstName: firstName,
					lastName: lastName,
					email: email,
					phoneNumber: phoneNumber,
					birthDate: birthDate,
					city: city,
				},
			},
			{ new: true, upsert: true }
		)

		res.status(200).json(updatedDetails)
	} catch (error) {
		res.status(500).json({ error: 'Failed to update or create user details' })
	}
}

module.exports = { getUserDetails, updateUserDetails }
