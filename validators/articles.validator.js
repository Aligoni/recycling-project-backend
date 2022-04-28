const { body, check, param } = require('express-validator/check')
const db = require('../models')
const Admin = db.admins
const Article = db.articles

exports.create = () => {
    return [
        body('title').exists(),
        body('content').exists(),
        body('summary').exists(),
        body('adminId').exists().custom(value => {
            return Admin.findByPk(value).then(admin => {
                if (!admin) return Promise.reject('Admin not found')
            })
        })
    ]
}

exports.findOne = () => {
    return [
        param('id').exists()
    ]
}

exports.update = () => {
    return [
        param('id').exists().custom(value => {
            return Article.findByPk(value).then(article => {
                if (!article) return Promise.reject('Article not found')
            })
        }),
        body('title').exists(),
        body('content').exists(),
        body('summary').exists(),
        body('adminId').not().exists(),
        body('likes').not().exists().withMessage('Field should not be passed'),
        body('image').not().exists().withMessage('Field should not be passed'),
    ]
}

exports.like = () => {
    return [
        param('id').exists().custom(value => {
            return Article.findByPk(value).then(article => {
                if (!article) return Promise.reject('Article not found')
            })
        }),
    ]
}