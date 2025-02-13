const express = require('express')
const router = express.Router()

const showtimeController = require('../controllers/showtime.controller')

router.get('/', showtimeController.getAllShowtimes)
router.post('/', showtimeController.createShowtime)
router.post('/updateDates', showtimeController.updateShowtimeDates)
router.get('/:id', showtimeController.getShowtimeById)

module.exports = router
