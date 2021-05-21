require('dotenv').config({path: 'variables.env'});
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.BD_NAME, process.env.BD_USER, process.env.BD_PASS, {
    host: process.env.BD_HOST,
    dialect: 'mysql',
    port: process.env.BD_PORT,
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
