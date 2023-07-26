const express = require('express')
const router = express.Router()
const workoutCtrl = require('../controllers/workouts')
const ensureLoggedIn = require('../config/ensureLoggedIn')

router.get('/', ensureLoggedIn, workoutCtrl.index)

router.post('/', ensureLoggedIn, workoutCtrl.create)

router.get('/:id/edit', ensureLoggedIn, workoutCtrl.show)

router.put('/:id/edit', ensureLoggedIn, workoutCtrl.edit)

router.delete('/:id', ensureLoggedIn, workoutCtrl.delete)

module.exports = router