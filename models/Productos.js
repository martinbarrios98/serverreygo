const { Sequelize } = require('sequelize');
const db = require('../config/db');

const Productos = db.define('productos', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING(60),
    descripcion: Sequelize.STRING,
    precio: Sequelize.STRING,
    url: Sequelize.STRING,
    peso: Sequelize.STRING,
    categoria: Sequelize.INTEGER 
});

module.exports = Productos;