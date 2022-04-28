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
const articles = require('./articles.model.js')(sequelize, Sequelize)
const subscribers = require('./subscribers.model.js')(sequelize, Sequelize)

// Relationships
admins.hasMany(articles, { as: 'articles' })
articles.belongsTo(admins, {
    foreignKey: 'adminId',
    as: 'admin'
})

module.exports = {
    Sequelize,
    sequelize,
    admins,
    articles,
    subscribers
}