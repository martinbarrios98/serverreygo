const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('id14955862_reygocafe', 'id14955862_reygoroot', '4V\TK2/cxF=0L3Qd', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    operatorsAliases: false,
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