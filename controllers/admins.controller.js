const bcrypt = require('bcrypt')
const db = require("../models");
const Admin = db.admins;
const Op = db.Sequelize.Op;
const { validationResult } = require('express-validator/check');

// Create and save a new Admin
exports.create = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const hashed = await bcrypt.hash(req.body.password, 10)
    Admin.create({
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: hashed
    })
        .then(async admin => {
            // to exclude password
            admin = await Admin.findByPk(admin.id)
            res.json({
                data: admin
            })
        })
        .catch(error => {
            res.status(400).json({
                error
            })
        })
};

exports.findAll = async (req, res) => {
    const admins = await Admin.findAll({ include: ['articles'] })
    res.json({
        data: admins
    })
}

exports.findOne = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const id = req.params.id

    Admin.findByPk(id, {include: ['articles']})
        .then(admin => {
            if (admin) {
                res.json({
                    data: admin
                })
            } else {
                res.status(404).json({
                    msg: "Admin not found",
                })
            }
        })
}

exports.findByEmail = async (req, res) => {
    if (!req.body.email) {
        return res.json({
            success: false,
            msg: 'Please provide email'
        })
    }

    Admin.findOne({ where: { email: req.body.email }, include: ['articles'] })
        .then(admin => {
            if (admin) {
                res.json({
                    success: true,
                    msg: "Returning admin",
                    admin
                })
            } else {
                res.json({
                    success: false,
                    msg: "Admin not found"
                })
            }
        })
        .catch(error => {
            res.json({
                success: false,
                msg: error
            })
        })
}

exports.login = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    Admin.scope('withPassword').findOne({ where: { email: req.body.email }, include: ['articles'] })
        .then(async admin => {
            if (admin) {
                const hashed = await bcrypt.compare(req.body.password, admin.dataValues.password)
                if (hashed) {
                    // to exclude password
                    admin = await Admin.findByPk(admin.id)
                    return res.json({
                        data: admin
                    })
                }
            }

            res.status(400).json({
                msg: "Email/Password is incorrect",
            })
        })
        .catch(error => {
            res.status(400).json({
                error
            })
        })
}