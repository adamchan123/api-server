// Require and initialize outside of your main handler
const {Sequelize} = require("sequelize");

const sequelize = new Sequelize('router_events', process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    port: 3306,
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    pool: {
        max: 15,
        min: 5,
        idle: 20000,
        evict: 15000,
        acquire: 30000
    },
});

module.exports = sequelize
