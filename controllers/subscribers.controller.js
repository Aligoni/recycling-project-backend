const bcrypt = require('bcrypt')
const db = require("../models");
const Subscriber = db.subscribers;
const Op = db.Sequelize.Op;
const { validationResult } = require('express-validator/check');

// Create and save a new Subscriber
exports.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    Subscriber.create(req.body)
        .then(async subscriber => {
            res.json({
                data: subscriber
            })
        })
        .catch(error => {
            res.status(400).json({
                error
            })
        })
};

exports.findAll = async (req, res) => {
    const subscribers = await Subscriber.findAll()
    res.json({
        data: subscribers
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

    Subscriber.findByPk(id)
        .then(subscriber => {
            if (subscriber) {
                res.json({
                    data: subscriber
                })
            } else {
                res.status(404).json({
                    msg: "Subscriber not found",
                })
            }
        })
}
