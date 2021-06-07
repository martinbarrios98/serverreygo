require('dotenv').config({path: 'variables.env'});
const jwt = require('jwt-simple');
const moment = require('moment');
const paypal = require('paypal-rest-sdk');
const { secret1 } = require('../config/secret');
const transporter = require('../config/nodemailer');
const Categorias = require('../models/Categorias');
const Productos = require('../models/Productos');
const Usuarios  = require('../models/Usuarios');
const Pedidos = require('../models/Pedidos');
const Administradores = require('../models/Administradores');

exports.inicio = (req, res, next) =>{

    res.send({
        respuesta: 'correcto',
        informacion: 'Bienenido Servidor Reygo-Cafe'
    })

}
//categorias

exports.verCategorias = async (req, res, next) =>{

    const categorias = await Categorias.findAll();

    if(categorias.length){
        res.send({
            respuesta: 'correcto',
            informacion: 'Se encontro la lista de categorias',
            categorias
        })
    }else{
        res.send({
            respuesta: 'correcto',
            informacion: 'No hay categorias insertadas'
        })
    }

}

exports.verCategoria = async (req, res) =>{

    const { id } = req.params;

    if(!id || id === null || id === undefined || id === ''){
        res.send({
            respuesta: 'error',
            informacion: 'No se encontro los parametros necesarios'
        });
    }else{

        const categoria = await Categorias.findOne({where: {id: id}});

        if(categoria.dataValues){

            res.send({
                respuesta: 'correcto',
                informacion: 'Se encontro correctamente la categoria',
                categoria
            })

        }else{
            res.send({
                respuesta: 'correcto',
                informacion:'No se encontro la categoria'
            })
        }

    } 

}

exports.editarCategoria = async (req, res) => {

    const { id } = req.params;
    const { nombre, url } = req.body;

    if(!id || id === null || id === undefined || !nombre || nombre === undefined || nombre === null || !url || url === undefined || url === null){

        res.status(400).send({
            respuesta: 'error',
            informacion: 'No se detectaron los parametros o campos necesarios'
        });

    }else{

        const categoria = await Categorias.update({nombre: nombre, url: url}, {where:{id: id}});

        if(categoria.length > 0){
            res.send({
                respuesta: 'correcto',
                informacion: 'Se edito correctamente la categoria'
            });
        }else{
            res.status(400).send({
                respuesta: 'error',
                informacion: 'Ocurrio un error durante el proceso'
            });
        }

    }

}

//productos
exports.verProductos = async (req, res, next) =>{

    const data = await Productos.findAll();
    const categorias = await Categorias.findAll();

    if(data.length){

        const productos = [];

        data.forEach(async dat =>{
            const producto = {
                id: dat.id,
                nombre: dat.nombre,
                descripcion: dat.descripcion,
                precio: dat.precio,
                url: dat.url,
                categoria: dat.categoria
            }

            categorias.forEach(async categoria =>{
                if(parseInt(categoria.id) === parseInt(dat.categoria)){
                    producto.categoria_nombre = categoria.nombre;
                }
            });

            productos.push(producto);
        });

        res.send({
            respuesta :'correcto',
            informacion: 'Se listo correctamente los productos',
            productos
        });


    }else{
        res.send({
            respuesta: 'correcto',
            informacion: 'No hay elementos insertados'
        })
    }

}

exports.verProductosCat = async (req, res, next) =>{

    const { id } = req.params;

    if(!id || id === null || id === undefined || id === ''){

        res.send({
            respuesta: 'error',
            informacion: 'No se detecto los parametros necesarios'
        });

    }else{

        const data = await Productos.findAll({where:{categoria: id}});
        const categorias = await Categorias.findAll();

        if(data.length){

            const productos = [];

            data.forEach(async dat =>{

                const producto = {
                    id: dat.id,
                    nombre: dat.nombre,
                    descripcion: dat.descripcion,
                    precio: dat.precio,
                    url: dat.url,
                    categoria: dat.categoria
                }

                categorias.forEach(async categoria =>{
                    if(parseInt(categoria.id) === parseInt(dat.categoria)){
                        producto.categoria_nombre = categoria.nombre;
                    }
                });

                productos.push(producto);
            });

            res.send({
                respuesta :'correcto',
                informacion: 'Se listo correctamente los productos',
                productos
            });


        }else{
            res.send({
                respuesta: 'correcto',
                informacion: 'No hay elementos insertados'
            })
        }

    }

}

exports.verProducto = async (req, res) => {

    const { id } = req.params;

    if(!id || id === undefined || id === null || id === ''){
        res.status(400).send({
            respuesta: 'error',
            informacion: 'No se detecto los parametros necesarios'
        });
    }else{

        const data = await Productos.findOne({where:{id: id}});
        const categorias = await Categorias.findAll();

        if(data.length || data.dataValues){

            const producto = {
                id: data.id,
                nombre: data.nombre,
                descripcion: data.descripcion,
                precio: data.precio,
                url: data.url,
                categoria: data.categoria
            }

            categorias.forEach(async categoria =>{
                if(parseInt(categoria.id) === parseInt(data.categoria)){
                    producto.categoria_nombre = categoria.nombre;
                }
            });

            res.send({
                respuesta :'correcto',
                informacion: 'Se listo correctamente el producto',
                producto
            });


        }else{
            res.status(400).send({
                respuesta: 'correcto',
                informacion: 'No se encontro el producto'
            })
        }



    }

}

exports.crearProducto = async (req, res) =>{
    
    const { nombre, descripcion, precio, url, categoria } = req.body;

    if(!nombre || nombre === undefined || nombre === null || !descripcion || descripcion === undefined || descripcion === null || !precio || precio === undefined || precio === null || !url || url === undefined || url === null || !categoria || categoria === undefined || categoria === null){
        res.status(400).send({
            respuesta: 'error',
            informacion: 'No se detecto los campos necesarios'
        });
    }else{

        const producto = await Productos.create({nombre: nombre, descripcion: descripcion, precio: precio, url: url, categoria: categoria});

        if(producto.dataValues){
            res.send({
                respuesta: 'correcto',
                informacion: 'Se creo correctamente el producto'
            });
        }else{

            res.status(400).send({
                respuesta: 'error',
                informacion: 'Ocurrio un error durante el proceso'
            });

        }

    }

}

exports.editarProducto = async (req, res) => {

    const { id } = req.params;
    const { nombre, descripcion, precio, url, categoria } = req.body;

    if(!nombre || nombre === undefined || nombre === null || !descripcion || descripcion === undefined || descripcion === null || !precio || precio === undefined || precio === null || !url || url === undefined || url === null || !categoria || categoria === undefined || categoria === null || !id || id === undefined || id === null){
        res.status(400).send({
            respuesta: 'error',
            informacion: 'No se detecto los campos o parametros necesarios'
        });
    }else{

        const producto = await Productos.update(
            {nombre: nombre, descripcion: descripcion, precio: precio, url: url, categoria: categoria},
            {where:{id: id}}
        );

        if(producto.length > 0){
            res.send({
                respuesta: 'correcto',
                informacion: 'Se edito correctamente el producto'
            });
        }else{
            res.status(400).send({
                respuesta: 'error',
                informacion: 'Ocurrio un error durante el proceso'
            });
        }

    }
}

exports.eliminarProducto = async (req, res) =>{

    const { id } = req.params;

    if(!id || id === undefined || id === null){
        res.status(400).send({
            respuesta: 'error',
            informacion: 'No se detectaron los parametros necesarios'
        });
    }else{

        const producto = await Productos.destroy({where:{id: id}});

        if(producto === 1){
            res.send({
                respuesta: 'correcto',
                informacion: 'Se elimino correctamente el producto'
            });
        }else{
            res.status(400).send({
                respuesta: 'error',
                informacion: 'Ocurrio un error durante el proceso'
            });
        }

    }

}

//Usuarios

exports.crearUsuario = async (req, res) =>{
    const { nombre, apellido, correo, direccion, password, telefono } = req.body;

    if(!nombre || !apellido || !correo || !direccion || !password || !telefono || nombre === '' || apellido === '' || correo === '' || direccion === '' || password === '' || telefono === ''){
        res.status(400).send({
            respuesta: 'error',
            informacion: 'No se encontraron los campos necesarios'
        });
    }else{

        const usuario = await Usuarios.create({nombre: nombre, apellido: apellido, correo: correo, direccion: direccion, password: password, telefono: telefono});

        if(usuario.dataValues){
            res.send({
                respuesta: 'correcto',
                informacion: 'Se creo correctamente el usuario'
            });
        }else{
            res.status(400).send({
                respuesta: 'error',
                informacion: 'Ocurrio un error durante el proceso'
            })
        }

    }

}

exports.editarUsuario = async (req, res) =>{

    const { nombre, apellido, correo, direccion, password, telefono } = req.body;
    const { id } = req.params;

    if(!id || id === null || id === '' || id === undefined){
        res.status(400).send({
            respuesta: 'error',
            informacion: 'No se detecto el id como parametro o esta vacio'
        })
    }else{
        if(!nombre || !apellido || !correo || !direccion || !password || !telefono || nombre === '' || apellido === '' || correo === '' || direccion === '' || password === '' || telefono === ''){
            res.status(400).send({
                respuesta: 'error',
                informacion: 'Los campos estan vacios o no existen'
            })
        }else{

            const usuario = await Usuarios.update({nombre: nombre, apellido: apellido, correo: correo, direccion: direccion, password: password, telefono: telefono}, {where:{id : id}});

            if(usuario.length > 0){

                res.send({
                    respuesta: 'correcto',
                    informacion: 'Se edito correctamente el usuario'
                })

            }else{

                res.status(400).send({
                    respuesta: 'error',
                    informacion: 'ocurrio un error en la operacion'
                })

            }

        }
    }

}

exports.obtenerUsuario =async (req, res) =>{
    const { id } = req.params;

    if(!id || id === null || id === ''){
        res.status(400).send({
            respuesta: 'error',
            informacion: 'No se detecto los paremtros necesarios'
        });
    }else{

        const usuario = await Usuarios.findOne({where:{id: id} });

        if(usuario.dataValues) {

            res.send({
                respuesta: 'correcto',
                informacion: 'Se encontro el usuario',
                usuario
            })

        }else{

            res.status(400).send({
                respuesta: 'error',
                informacion: 'No se encontro el usuario'
            });

        }

    }
}

exports.verUsuarios = async (req, res) =>{

    const usuarios = await Usuarios.findAll();

    if(usuarios.length){
        res.send({
            respuesta: 'correcto',
            informacion: 'Se listo correctamente los usuarios',
            usuarios
        });
    }else{
        res.send({
            respuesta: 'correcto',
            informacion: 'No hay usuarios creados'
        })
    }

}

exports.sesionUsuario = async (req, res) =>{
    const { correo, password } = req.body;

    if(correo === undefined || password === undefined || correo === '' || password === ''){
        res.status(400).send({
            respuesta: 'error',
            informacion: 'No se detecto los campos requeridos'
        });
    }else{

            const resultado = await Usuarios.findOne({
                where:{
                    correo: correo
                }
            });

            if(resultado !== null){
                if(resultado.password === password){

                    const payload = {
                        id: resultado.id,
                        usuario: resultado.nombre,
                        tipo: resultado.perfil,
                        iat: moment().get('date')
                        
                    }

                    const token = jwt.encode(payload, secret1);
                    const prueba = jwt.decode(token, secret1);

                    res.send({
                        respuesta: 'correcto',
                        informacion: 'Inicio sesion correctamente',
                        resultado,
                        token
                    });


                }else{ 
                    res.status(400).send({
                        respuesta: 'error',
                        informacion: 'El password no coincide'
                    })
                }
            }else{

                res.status(400).send({
                    respuesta: 'error',
                    informacion: 'No se encontro el usuario'
                })

            }
    }
}

exports.eliminarUsuario = async (req, res) =>{

    const { id } = req.params;

    if(!id || id === undefined || id === null){
        res.status(400).send({
            respuesta: 'error',
            informacion: 'No se detecta los parametros necesarios'
        });
    }else{

        const usuario = await Usuarios.destroy({where:{id: id}});

        if(usuario === 1){
            res.send({
                respuesta: 'correcto',
                informacion: 'Se elimino correctamente el usuario'
            });
        }else{
            res.status(400).send({
                respuesta: 'error',
                informacion: 'Ocurrio un error durante el proceso'
            });
        }

    }

}

exports.verUltimosUsuarios = async (req, res) => {
    const usuarios = await Usuarios.findAll({
        order:[
            ['id','DESC']
        ],
        limit: 3
    });

    if(usuarios.length){
        res.send({
            respuesta: 'correcto',
            informacion: 'Se listo correctamente los usuarios',
            usuarios
        });
    }else{
        res.send({
            respuesta: 'correcto',
            informacion: 'No hay usuarios creados'
        })
    }
}
 
exports.verUltimosProdutos = async (req, res) =>{
    const data = await Productos.findAll({
        order:[
            ['id','DESC']
        ],
        limit: 3
    });

    const categorias = await Categorias.findAll();

    if(data.length){

        const productos = [];

        data.forEach(async dat =>{
            const producto = {
                id: dat.id,
                nombre: dat.nombre,
                descripcion: dat.descripcion,
                precio: dat.precio,
                url: dat.url,
                categoria: dat.categoria
            }

            categorias.forEach(async categoria =>{
                if(parseInt(categoria.id) === parseInt(dat.categoria)){
                    producto.categoria_nombre = categoria.nombre;
                }
            });

            productos.push(producto);
        });

        res.send({
            respuesta :'correcto',
            informacion: 'Se listo correctamente los productos',
            productos
        });


    }else{
        res.send({
            respuesta: 'correcto',
            informacion: 'No hay elementos insertados'
        })
    }
}

//Pagos-pedidos

exports.crearPedido = async (req, res) => {
    
    const { pedido } = req.body;

    if(!pedido || pedido === undefined || pedido === null){
        res.status(400).send({
            respuesta: 'error',
            informacion: 'No se detecto los parametros necesarios'
        });

    }else{

        const pedidoParse = JSON.parse(pedido);
        const { total, envio, productos } = pedidoParse;
        const totalInt = (total+envio);

        const clientId = process.env.PAYPAL_KEY;
        const clientSecret = process.env.PAYPAL_SECRET;

        paypal.configure({
            'mode': 'sandbox', //sandbox or live
            'client_id': clientId,
            'client_secret': clientSecret
        });
        //http://127.0.0.1:5500/
        //http://127.0.0.1:5500/
        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "https://nifty-hopper-f2907f.netlify.app/front/v2/success.html",
                "cancel_url": "https://nifty-hopper-f2907f.netlify.app/front/v2/pago.html"
            },
            "transactions": [{
                "amount": {
                    "currency": "MXN",
                    "total": (total+envio)
                },
                "description": "Los mejores productos Insumos ReygoCoffe"
            }]
        };
        
        paypal.payment.create(create_payment_json, function (error, payment) {
          if (error) {
              res.status(400).send({
                  respuesta: 'error',
                  informacion: 'Ocurrio un error durante el proceso',
                  error
              });
          } else {
            res.send({
                payment
            });
          }
        });


    }

}

exports.validarPago = async (req, res) => {

    const { paymentId, payerId, total } = req.body;

    if(!paymentId || paymentId === undefined || paymentId === null || !payerId || payerId === undefined || payerId === null || !total || total === undefined || total === null){

        res.status(400).send({
            respuesta: 'error',
            informacion: 'No se detectaron todos lo campos necesarios'
        });

    }else{

        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "MXN",
                    "total": total
                }
            }]
        };

        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                res.status(400).send({
                    respuesta: 'error',
                    informacion: 'Ocurrio un error durante el proceso',
                    error
                });
            } else {
                res.send({
                    respuesta: 'correcto',
                    informacion: 'Proceso de validacion correctamente',
                    payment
                });
            }
        });

    }

}

exports.successPedido = async (req, res) => {
    const { usuario, estado_pedido, fecha, total, direccion, referencias, productos, postal, ciudad, estado, modalidad, envio, id_transacion, comision_paypal } = req.body;

    if(!usuario || usuario === undefined || usuario === null  || !estado_pedido || estado_pedido === undefined || estado_pedido === null, !fecha || fecha === undefined || fecha  === null || !total || total === undefined || total === null || !direccion || direccion === undefined || direccion === null || !referencias || referencias === undefined || referencias === null || !productos || productos === undefined || productos === null || !postal || postal === undefined || postal === null || !ciudad || ciudad === undefined || ciudad === null || !estado ||  estado === undefined || estado === null || !modalidad || modalidad === undefined || modalidad === null || !envio || envio === undefined || envio === null || !id_transacion || id_transacion === undefined || id_transacion === null ||!comision_paypal || comision_paypal === undefined || comision_paypal === null){

        res.status(400).send({
            respuesta: 'Error',
            informacion: 'No se detecto los campos necesarios'
        });

    }else {

        const usuarioParse = JSON.parse(usuario);

        const pedido = await Pedidos.create({usuario: usuario, estado_pedido: estado_pedido, fecha: fecha, total: total, direccion: direccion, referencias: referencias, productos: productos, postal: postal, ciudad: ciudad, estado: estado, modalidad: modalidad, envio: envio, id_transacion: id_transacion, comision_paypal: comision_paypal});
        const infoUsuario = await Usuarios.findOne({where:{id: usuarioParse.id}});
        const correoUsuario = await infoUsuario.correo;
        const nombreUsuario = await infoUsuario.nombre;
        const telefonoUsuario = await infoUsuario.telefono;
        const totalInt = parseInt(total);
        const envioInt = parseInt(envio);

        const output = `
            <p>Tu Resumen de Compra</p>
            <h3>Detalles</h3>
            <ul>  
                <li>Nombre: ${nombreUsuario}</li>
                <li>Telefono: ${telefonoUsuario}</li>
            </ul>
            <h3>Mensaje</h3>
            <p>¡Tu compra se registro correctamente con un total de $${(totalInt+envioInt)}, un administrador de ReygoCoffe se pondra en contacto con usted al numero de su celular lo mas pronto posible, agradecemos su compra y su confianza con nosotros!</p>
        `;

        let mailOptions = {
            from: '"ReygoCoffe Contact" <reygocoffe@hotmail.com>', // sender address
            to: correoUsuario, // list of receivers
            subject: 'ReygoCoffe Resumen de Compra', // Subject line
            text: 'Hello world?', // plain text body
            html: output // html body
        };
      
        // Mnadamos el objeto al email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);   
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });

        if(pedido.dataValues){
            res.send({
                respuesta: 'correcto',
                informacion: 'Se creo correctamente el pedido'
            });
        }else{
            res.status(400).send({
                respuesta: 'error',
                informacion: 'Ocurrio un error durante el proceso'
            });
        }

    }
}

exports.verPedidos = async (req, res) => {

    const pedidos = await Pedidos.findAll();
    
    pedidos.forEach( async pedido => {

        const identificadorUsuario = await JSON.parse(pedido.usuario);
        const usuario = await Usuarios.findOne({where:{
            id: identificadorUsuario.id
        }});
        identificadorUsuario.informacionUsuario = usuario;
        pedido.usuario = await identificadorUsuario;

        const productosParse = await JSON.parse(pedido.productos);
        productosParse.forEach(async productoParse => {
            const producto = await Productos.findOne({where:{ id: productoParse.id}});
            productoParse.informacionProducto = producto;
        });
        pedido.productos = await productosParse;

    });

    setTimeout(() => {
        if(pedidos.length){
            res.send({
                respuesta: 'correcto',
                informacion: 'Se listo correctamente los pedidos',
                pedidos
            });
        }else{
            res.send({
                respuesta: 'correcto',
                informacion: 'No hay pedidos registrados'
            })
        }
    }, 1000);

}

exports.editarPedidos = async (req, res) => {

    const { id } = req.params;
    const { estado_pedido, numero_guia, paqueteria } = req.body;

    if(!numero_guia || numero_guia === undefined || numero_guia === null || !paqueteria || paqueteria === undefined || paqueteria === null || !estado_pedido || estado_pedido === null || estado_pedido === undefined){
        res.status(400).send({
            respuesta: 'Error',
            informacion: 'No se detecto los campos o parametros necesarios'
        });
    }else{

        const pedido = await Pedidos.update({estado_pedido: estado_pedido, numero_guia: numero_guia, paqueteria: paqueteria}, {where: {id: id}});

        if(pedido.length > 0){
            res.send({
                respuesta: 'correcto',
                informacion: 'Se edito correctamente el pedido'
            });
        }else{

            res.status(400).send({
                respuesta: 'error',
                informacion: 'Ocurrio un error durante el proceso'
            });
        }

    }


}

exports.verUltimosPedidos = async (req, res) => {

    const pedidos  = await Pedidos.findAll({
        order:[
            ['id','DESC']
        ],
        limit: 3
    });

    pedidos.forEach( async pedido => {

        const identificadorUsuario = await JSON.parse(pedido.usuario);
        const usuario = await Usuarios.findOne({where:{
            id: identificadorUsuario.id
        }});
        identificadorUsuario.informacionUsuario = usuario;
        pedido.usuario = await identificadorUsuario;

        const productosParse = await JSON.parse(pedido.productos);
        productosParse.forEach(async productoParse => {
            const producto = await Productos.findOne({where:{ id: productoParse.id}});
            productoParse.informacionProducto = producto;
        });
        pedido.productos = await productosParse;

    });

    setTimeout(() => {
        if(pedidos.length){
            res.send({
                respuesta: 'correcto',
                informacion: 'Se listo correctamente los pedidos',
                pedidos
            });
        }else{
            res.send({
                respuesta: 'correcto',
                informacion: 'No hay pedidos registrados'
            })
        }
    }, 1000);
}

//Administradores

exports.crearAdministrador = async (req, res) => {

    const { nombre, correo, password, url } = req.body;

    if(nombre === '' || !nombre || correo === '' || !correo || password === '' || !password || url === '' || !url){
        res.status(400).send({
            respuesta: 'error',
            informacion: 'No se detecto los campos necesarios'
        });
    }else{

        const administrador = await Administradores.create({nombre: nombre, correo: correo, password: password, url: url});

        if(administrador.dataValues){
            res.send({
                respuesta: 'correcto',
                informacion: 'Se creo correctamente el administrador'
            });
        }else{
            
            res.status(400).send({
                respuesta: 'error',
                informacion: 'Ocurrio un error durante el proceso'
            });

        }

    }

}

exports.editarAdministrador = async (req, res) => {

    const { id } = req.params;
    const { nombre, correo, password, url } = req.body;

    if(nombre === '' || !nombre || correo === '' || !correo || password === '' || !password || url === '' || !url || !id || id === ''){
        res.status(400).send({
            respuesta: 'error',
            informacion: 'No se detecto los campos o parametros necesarios'
        });
    }else{

        const administrador = await Administradores.update({nombre: nombre, correo: correo, password: password, url: url}, {where:{id : id}});

        if(administrador.length > 0){
            res.send({
                respuesta: 'correcto',
                informacion: 'Se modifico correctamente el administrador'
            });
        }else{

            res.stauts(400),send({
                respuesta: 'error',
                informacion: 'Ocurrio un error durante el proceso'
            });

        }

    }
 
}

exports.eliminarAdministradores = async (req, res) => {

    const { id } = req.params;

    if(!id || id === undefined || id === null){
        res.status(400).send({
            respuesta: 'error',
            informacion: 'No se detecta los parametros necesarios'
        });
    }else{

        const administrador = await Administradores.destroy({where:{id: id}});

        if(administrador === 1){
            res.send({
                respuesta: 'correcto',
                informacion: 'Se elimino correctamente el administrador'
            });
        }else{
            res.status(400).send({
                respuesta: 'error',
                informacion: 'Ocurrio un error durante el proceso'
            });
        }

    }

}

exports.verAdministradores = async (req, res) =>{

    const administradores = await Administradores.findAll();

    if(administradores.length){
        res.send({
            respuesta: 'correcto',
            informacion: 'Se listo correctamente los administradores',
            administradores
        });
    }else{
        res.send({
            respuesta: 'correcto',
            informacion: 'No hay registros de administradores'
        })
    }

}

exports.verAdministrador = async (req, res) =>{

    const { id } = req.params;

    const administrador = await Administradores.findOne({where:{id: id}});

    if(administrador !== null){
        res.send({
            respuesta: 'correcto',
            informacion: 'Se encontro correctamente el administrador',
            administrador
        });
    }else{
        res.send({
            respuesta: 'correcto',
            informacion: 'No se encontro el administrador'
        })
    }

}

exports.sesionAdministrador = async (req, res) => {
    const { correo, password } = req.body;

    if(correo === undefined || password === undefined || correo === '' || password === ''){
        res.status(400).send({
            respuesta: 'error',
            informacion: 'No se detecto los campos requeridos'
        });
    }else{

            const resultado = await Administradores.findOne({
                where:{
                    correo: correo
                }
            });

            if(resultado !== null){
                if(resultado.password === password){

                    const payload = {
                        id: resultado.id,
                        usuario: resultado.nombre,
                        tipo: resultado.perfil,
                        iat: moment().get('date')
                        
                    }

                    const token = jwt.encode(payload, secret1);
                    const prueba = jwt.decode(token, secret1);

                    res.send({
                        respuesta: 'correcto',
                        informacion: 'Inicio sesion correctamente',
                        resultado,
                        token
                    });


                }else{ 
                    res.status(400).send({
                        respuesta: 'error',
                        informacion: 'El password no coincide'
                    })
                }
            }else{

                res.status(400).send({
                    respuesta: 'error',
                    informacion: 'No se encontro el administrador'
                })

            }
    }
}