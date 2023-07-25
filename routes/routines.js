const express = require('express')
const router = express.Router()
const routineCtrl = require('../controllers/routines')

router.get('/', routineCtrl.show)

router.get('/new', routineCtrl.new)

router.post('/create', routineCtrl.create)

module.exports = router