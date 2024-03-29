const router = require('express').Router()
const admins = require('../controllers/admins.controller')
const validate = require('../validators/admins.validator')

router.get('/', admins.findAll)
router.post('/', validate.create(), admins.create)
router.post('/login', validate.login(), admins.login)
router.get('/:id', validate.findOne(), admins.findOne)

module.exports = router