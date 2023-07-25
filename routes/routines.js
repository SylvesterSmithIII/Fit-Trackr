const express = require('express')
const router = express.Router()
const workoutCtrl = require('../controllers/routines')

router.get('/', workoutCtrl.show)

router.get('/new', workoutCtrl.new)

module.exports = router