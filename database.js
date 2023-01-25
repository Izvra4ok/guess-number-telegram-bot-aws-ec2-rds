require("dotenv").config()
const {Sequelize} = require('sequelize');


module.exports = new Sequelize(process.env.DB_DB, process.env.DB_USER, process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        logging: console.log,
        dialect: "postgres",
        ssl: "Amazon RDS",
    }
)
