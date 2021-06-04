const { Sequelize } = require('sequelize');
const db = require('../config/db');

const Administradores = db.define('administradores', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING(60),
    correo: Sequelize.STRING,
    password: Sequelize.STRING,
    url: Sequelize.STRING
});

module.exports = Administradores;