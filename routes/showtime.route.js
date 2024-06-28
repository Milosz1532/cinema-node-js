const express = require('express')
const router = express.Router()

const showtimeController = require('../controllers/showtime.controller')

router.get('/', showtimeController.getAllShowtimes)
router.post('/', showtimeController.createShowtime)

module.exports = router
