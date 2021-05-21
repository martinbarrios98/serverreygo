const express = require('express');

const rutas = express.Router();

const { body } = require('express-validator/check');

const controladores = require('../controladores/controladores.js');

module.exports = () => {

    //Principal//contactos
    rutas.get('/', controladores.inicio);
    //Categorias
    rutas.get('/categorias', controladores.verCategorias);
    rutas.get('/categorias/:id', controladores.verCategoria);
    //Productos
    rutas.get('/productos/:id', controladores.verProductosCat);
    rutas.get('/productos', controladores.verProductos);
    rutas.get('/productos/unico/:id', controladores.verProducto);
    //usuarios
    rutas.get('/usuarios', controladores.verUsuarios);
    rutas.post('/usuarios/nuevo', body(['nombre', 'apellido', 'correo', 'telefono', 'password']), controladores.crearUsuario);
    rutas.put('/usuarios/editar/:id', controladores.editarUsuario);
    rutas.get('/usuarios/unico/:id', controladores.obtenerUsuario);
    //Sesiones
    rutas.post('/usuarios/sesion', body(['correo', 'password']) ,controladores.sesionUsuario);
    rutas.get('/products/ultimos', controladores.verUltimosProdutos);
    return rutas;

};