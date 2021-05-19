const { Sequelize } = require('sequelize');
const db = require('../config/db');

const Usuarios = db.define('usuarios', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING(60),
    apellido: Sequelize.STRING,
    correo: Sequelize.STRING,
    direccion: Sequelize.STRING,
    telefono: Sequelize.STRING,
    password: Sequelize.STRING

});

module.exports = Usuarios;