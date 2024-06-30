const express = require('express')
const router = express.Router()

const actorController = require('../controllers/actor.controller')

router.get('/', actorController.getAllActors)
router.post('/', actorController.createActor)

module.exports = router
