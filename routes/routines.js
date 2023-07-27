const express = require('express')
const router = express.Router()
const routineCtrl = require('../controllers/routines')
const ensureLoggedIn = require('../config/ensureLoggedIn')
const checkForEmptyRoutines = require('../config/routines')

router.get('/', ensureLoggedIn, checkForEmptyRoutines, routineCtrl.index)

router.get('/new', ensureLoggedIn, routineCtrl.new)

router.post('/create', ensureLoggedIn, routineCtrl.create)

router.get('/:id', ensureLoggedIn, routineCtrl.show)

router.delete('/:id', ensureLoggedIn, routineCtrl.delete)

module.exports = router