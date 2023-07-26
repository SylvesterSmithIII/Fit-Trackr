const express = require('express')
const router = express.Router()
const routineCtrl = require('../controllers/routines')
const ensureLoggedIn = require('../config/ensureLoggedIn')

router.get('/', ensureLoggedIn, routineCtrl.index)

router.get('/new', ensureLoggedIn, routineCtrl.new)

router.post('/create', ensureLoggedIn, routineCtrl.create)

module.exports = router