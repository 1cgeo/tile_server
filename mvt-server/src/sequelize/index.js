const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(
    `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
)

module.exports = sequelize; 
