const { body, check, param } = require('express-validator/check')
const db = require('../models')
const Admin = db.admins

exports.create = () => {
    return [
        body('firstname').exists(),
        body('lastname').exists(),
        body('email').exists().isEmail().withMessage('Invalid email format').custom(val => {
            return Admin.findAll({ where: { email: val } }).then(admins => {
                if (admins.length) return Promise.reject('Email already exists')
            })
        }),
        body('password').exists().isLength({min: 6}).withMessage('Must be greater than length 5')
    ]
}

exports.findOne = () => {
    return [
        param('id').exists()
    ]
}

exports.login = () => {
    return [
        body('email').exists().isEmail().withMessage('Invalid email format'),
        body('password').exists().isLength({min: 6}).withMessage('Must be greater than length 5')
    ]
}