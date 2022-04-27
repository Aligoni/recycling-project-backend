const dbConfig = require('../config/db.js')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
    dialectOptions: {
        decimalNumbers: true
    }
})

const admins = require('./admins.model.js')(sequelize, Sequelize)

// Relationships

module.exports = {
    Sequelize,
    sequelize,
    admins,
}