const router = require('express').Router()
const subscribers = require('../controllers/subscribers.controller')
const validate = require('../validators/subscribers.validator')

router.get('/', subscribers.findAll)
router.post('/', validate.create(), subscribers.create)
router.get('/:id', validate.findOne(), subscribers.findOne)
router.delete('/:id', validate.delete(), subscribers.delete)
router.get('/unsubscribe-user/:id', subscribers.unsubscribe)

module.exports = router