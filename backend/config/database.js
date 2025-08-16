const config = require('./index');
// const path = require('path');
// const path = require('dotenv').config() (??)

const db = config.db;
// const username = db.username;
// const password = db.password;
// const database = db.database;
// const host = db.host;
const schema = db.schema;

module.exports = {
    development: {
        // username,
        // password,
        // database,
        // host,
        // storage: process.env.DB_STORAGE,
        storage: config.dbFile,
        // storage: path.resolve(__dirname, '../db/dev.db'),
        dialect: 'sqlite',
        seederStorage: 'sequelize',
        // logQueryParameters: true,
        // typeValidation: true
    },
    production: {
        use_env_variable: 'DATABASE_URL',
        dialect: 'postgres',
        seederStorage: 'sequelize',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        define: {
            schema: process.env.SCHEMA
        }
    }
};
