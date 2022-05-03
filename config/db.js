module.exports = {
    HOST: process.env.NODE_ENV == 'testing' ? process.env.TEST_DB_HOST: process.env.DB_HOST,
    USER: process.env.NODE_ENV == 'testing' ? process.env.TEST_DB_USER: process.env.DB_USER,
    PASSWORD: process.env.NODE_ENV == 'testing' ? process.env.TEST_DB_PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.NODE_ENV == 'testing' ? process.env.TEST_DB_NAME: process.env.DB_NAME,
    dialect: process.env.NODE_ENV == 'testing' ? process.env.TEST_DB_DIALECT: process.env.DB_DIALECT,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
