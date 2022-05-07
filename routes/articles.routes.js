const router = require('express').Router()
const articles = require('../controllers/articles.controller')
const validate = require('../validators/articles.validator')
const { multerUpload } = require('../config/cloudinary')

router.get('/', articles.findAll)
router.post('/', multerUpload, validate.create(), articles.create)
router.get('/:id', validate.findOne(), articles.findOne)
router.put('/:id', validate.update(), articles.update)
router.delete('/:id', validate.delete(), articles.delete)
router.put('/like/:id', validate.like(), articles.like)
router.get('/search/:value', validate.search(), articles.search)

module.exports = router