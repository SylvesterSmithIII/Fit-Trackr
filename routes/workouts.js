const express = require('express')
const router = express.Router()
const workoutCtrl = require('../controllers/workouts')

router.get('/', workoutCtrl.index)

router.post('/', workoutCtrl.create)

router.get('/:id/edit', workoutCtrl.show)

router.put('/:id/edit', workoutCtrl.edit)

router.delete('/:id', workoutCtrl.delete)

module.exports = router