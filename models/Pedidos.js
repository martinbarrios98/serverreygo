const { Sequelize } = require('sequelize');
const db = require('../config/db');

const Pedidos = db.define('pedidos', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario: Sequelize.STRING,
    estado_pedido: Sequelize.STRING,
    fecha: Sequelize.STRING,
    total: Sequelize.STRING,
    direccion: Sequelize.STRING,
    referencias: Sequelize.STRING,
    productos: Sequelize.STRING,
    postal: Sequelize.STRING,
    ciudad: Sequelize.STRING,
    estado: Sequelize.STRING,
    modalidad: Sequelize.STRING,
    numero_guia: Sequelize.STRING,
    paqueteria: Sequelize.STRING,
    envio: Sequelize.STRING,
    id_transacion: Sequelize.STRING,
    comision_paypal: Sequelize.STRING,
    peso: Sequelize.STRING
},{
    hooks:{
        beforeCreate(pedido){
            pedido.numero_guia = 'En proceso';
            pedido.paqueteria = 'En proceso'
        }
    }
});

module.exports = Pedidos;