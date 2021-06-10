const express = require('express');

const rutas = express.Router();

const { body } = require('express-validator/check');

const controladores = require('../controllers/controladores.js');

module.exports = () => {

    //Principal//contactos
    rutas.get('', controladores.inicio);
    //Categorias
    rutas.get('/categorias', controladores.verCategorias);
    rutas.get('/categorias/:id', controladores.verCategoria);
    rutas.post('/categorias/nuevo', body(['nombre', 'url']), controladores.Autenticacion, controladores.agregarCategoria);
    rutas.put('/categorias/editar/:id', body(['nombre', 'url']), controladores.Autenticacion ,controladores.editarCategoria);
    rutas.delete('/categorias/elimnar/:id', controladores.Autenticacion, controladores.eliminarCategoria);
    //Productos
    rutas.get('/productos/:id', controladores.verProductosCat);
    rutas.get('/productos', controladores.verProductos);
    rutas.get('/productos/unico/:id', controladores.verProducto);
    rutas.post('/productos/nuevo', body(['nombre', 'descripcion', 'precio', 'url', 'categoria']), controladores.Autenticacion, controladores.crearProducto);
    rutas.put('/productos/editar/:id', body(['nombre', 'descripcion', 'precio', 'url', 'categoria']), controladores.Autenticacion, controladores.editarProducto);
    rutas.delete('/productos/eliminar/:id', controladores.Autenticacion, controladores.eliminarProducto);
    //usuarios
    rutas.get('/usuarios', controladores.verUsuarios);
    rutas.post('/usuarios/nuevo', body(['nombre', 'apellido', 'correo', 'telefono', 'password']), controladores.crearUsuario);
    rutas.put('/usuarios/editar/:id', controladores.editarUsuario);
    rutas.get('/usuarios/unico/:id', controladores.obtenerUsuario);
    rutas.delete('/usuarios/eliminar/:id', controladores.Autenticacion, controladores.eliminarUsuario);
    rutas.get('/usuarios/ultimos', controladores.verUltimosUsuarios);
    //Pedidos
    rutas.post('/pedido/nuevo', body(['pedido']), controladores.crearPedido);
    rutas.post('/pedido/validacion', body(['paymentId', 'payerId', 'total']), controladores.validarPago);
    rutas.post('/pedido/success', body(['usuario', 'estado_pedido', 'fecha', 'total', 'direccion', 'referencias', 'productos', 'postal', 'ciudad', 'estado', 'modalidad', 'envio', 'id_transacion', 'comision_paypal']), controladores.successPedido);
    rutas.get('/pedidos', controladores.verPedidos);
    rutas.put('/pedidos/editar/:id', controladores.Autenticacion, body(['estado_pedido', 'numero_guia', 'paqueteria']) ,controladores.editarPedidos);
    rutas.get('/pedidos/ultimos', controladores.verUltimosPedidos);
    //Administradores
    rutas.get('/administradores', controladores.verAdministradores);
    rutas.post('/administradores/nuevo', body(['nombre', 'correo', 'password', 'url']), controladores.Autenticacion, controladores.crearAdministrador);
    rutas.put('/administradores/editar/:id', body(['nombre', 'correo', 'password', 'url']), controladores.Autenticacion, controladores.editarAdministrador);
    rutas.delete('/administradores/eliminar/:id', controladores.Autenticacion, controladores.eliminarAdministradores);
    rutas.get('/administradores/unico/:id', controladores.verAdministrador);
    //Sesiones
    rutas.post('/usuarios/sesion', body(['correo', 'password']) ,controladores.sesionUsuario);
    rutas.post('/administradores/sesion', body(['correo', 'password']), controladores.sesionAdministrador);
    rutas.get('/products/ultimos', controladores.verUltimosProdutos);
    return rutas;

};