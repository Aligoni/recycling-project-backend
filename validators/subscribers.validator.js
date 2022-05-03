const { body, check, param } = require('express-validator/check')
const db = require('../models')
const Subscriber = db.subscribers

exports.create = () => {
    return [
        body('firstname').exists(),
        body('lastname').exists(),
        body('email').exists().isEmail().withMessage('Invalid email format').custom(val => {
            return Subscriber.findAll({ where: { email: val } }).then(emails => {
                if (emails.length) return Promise.reject('Email already subscribed')
            })
        }),
    ]
}

exports.findOne = () => {
    return [
        param('id').exists().custom(value => {
            return Subscriber.findByPk(value).then(subscriber => {
                if (!subscriber) return Promise.reject('Subscriber not found')
            })
        }),
    ]
}

exports.delete = () => {
    return [
        param('id').exists().custom(value => {
            return Subscriber.findByPk(value).then(subscriber => {
                if (!subscriber) return Promise.reject('Subscriber not found')
            })
        }),
    ]
}
