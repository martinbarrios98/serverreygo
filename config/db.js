require('dotenv').config({path: 'variables.env'});
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('reygocafe', 'admin', '8qEs9mJ6', {
    host: 'mysql-31663-0.cloudclusters.net',
    dialect: 'mysql',
    port: '31663',
    define:{
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
  });

  module.exports = sequelize;
