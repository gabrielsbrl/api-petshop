const Sequelize = require('sequelize');
const config = require('config');

const instance = new Sequelize(
    config.get('mysql.db'), // database name
    config.get('mysql.user'), // user name
    config.get('mysql.password'), // password
    {
        host: config.get('mysql.host'),
        dialect: 'mysql'
    }, // conetion configuration
);

module.exports = instance;