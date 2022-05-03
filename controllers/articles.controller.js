const bcrypt = require('bcrypt')
const db = require("../models");
const Article = db.articles;
const Op = db.Sequelize.Op;
const { transport } = require('../config/nodemailer.config')
const { validationResult } = require('express-validator');

// Create and save a new Article
exports.create = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    if (!req.file.mimetype.match(/^image/)) {
        return res.status(400).json({
            msg: "Please provide file of image type"
        })
    }

    req.body.image = req.file.path

    Article.create(req.body)
        .then(async article => {
            res.json({
                data: article
            })
        })
        .catch(error => {
            res.status(400).json({
                error
            })
        })
};

exports.findAll = async (req, res) => {
    const articles = await Article.findAll({ include: ['admin'] })
    res.json({
        data: articles
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

    Article.findByPk(id, { include: ['admin'] })
        .then(article => {
            if (article) {
                res.json({
                    data: article
                })
            } else {
                res.status(404).json({
                    msg: "Article not found",
                })
            }
        })
}

exports.update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const id = req.params.id

    Article.findByPk(id)
        .then(async article => {
            if (article) {
                await article.update(req.body)
                res.status(200).json({
                    data: article
                })
            } else {
                res.status(404).json({
                    msg: "Article not found"
                })
            }
        })
        .catch(error => {
            res.status(400).json({
                msg: error
            })
        })
}

exports.like = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const id = req.params.id

    Article.findByPk(id)
        .then(async article => {
            if (article) {
                await article.update({ likes: article.likes + 1})
                res.status(200).json({
                    data: article
                })
            } else {
                res.status(404).json({
                    msg: "Article not found"
                })
            }
        })
        .catch(error => {
            res.status(400).json({
                msg: error
            })
        })
}


exports.delete = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const id = req.params.id

    Article.findByPk(id)
        .then(async article => {
            if (article) {
                await article.destroy()
                res.status(200).json({
                    msg: "Article deleted successfully"
                })
            } else {
                res.status(404).json({
                    msg: "Article not found"
                })
            }
        })
        .catch(error => {
            res.status(400).json({
                msg: error
            })
        })
}

// exports.testMail = async (req, res) => {
//     const mailOptions = {
//         from: 'testname@gmail.com',
//         to: 'azizgoni01@gmail.com',
//         subject: 'Sending Email using Node.js',
//         text: 'That was easy!'
//     };

//     transport.sendMail(mailOptions, (error, info) => {
//         if (error)
//             console.log(error)
//         else {
//             console.log("email sent successfully")
//             console.log(info)
//         }
//     })
// }