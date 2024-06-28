const express = require('express')
const router = express.Router()

const screenController = require('../controllers/screen.controller')

router.get('/', screenController.getAllScreens)
router.post('/', screenController.createScreen)

module.exports = router
