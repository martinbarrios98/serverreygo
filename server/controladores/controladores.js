const jwt = require('jwt-simple');
const moment = require('moment');
const { secret1 } = require('../config/secret');
const Categorias = require('../modelos/Categorias');
const Productos = require('../modelos/Productos');
const Usuarios  = require('../modelos/Usuarios');

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
            informacion: 'Se listo correctamente los usuarios'
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