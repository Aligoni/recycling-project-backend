const router = require('express').Router()
const subscribers = require('../controllers/subscribers.controller')
const validate = require('../validators/subscribers.validator')

router.get('/', subscribers.findAll)
router.post('/', validate.create(), subscribers.create)
router.get('/:id', validate.findOne(), subscribers.findOne)

module.exports = router