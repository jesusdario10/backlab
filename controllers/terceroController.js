'use strict';
var TerceroModel = require('../models/terceroModel');
var mongossePaginate = require('mongoose-pagination');


//crear Tercero
function crearTercero(req, res){
    var body = req.body;
    var nit = body.nit;
    console.log(body);

    if(body.nit && body.nombre  ){

        TerceroModel.findOne({nit:nit}).exec((err, terceroEncontrado)=>{
            if(err) return res.status(500).send({message:"error al buscar el tercero"});
            if(terceroEncontrado) return res.status(404).send({message:"Tercero ya existe"});
            if(!terceroEncontrado){
                var Tercero = new TerceroModel();
                Tercero.nit = body.nit;
                Tercero.nombre = body.nombre;
                Tercero.direccion = body.direccion;
                Tercero.telefono = body.telefono;
                Tercero.contacto = body.contacto;
                Tercero.usuario_creador = req.user.sub;
                Tercero.save((err, TerceroGuardado)=>{
                    if(err) return res.status(500).send({message:"error al guardar el tercero"});
                    if(!TerceroGuardado) return res.status(404).send({message:"No se pudo guardad"});
                    return res.status(200).send({message:"Exito", tercero:TerceroGuardado})
                });
            }
        })
    }
}

//Listar un tercero
function listarUnTercero(req, res){
    var id = req.params.id;
    TerceroModel.findById(id, (err, tercero)=>{
        if(err) return res.status(500).send({message:"error al realizar operacion"});
        if(!tercero) return res.status(404).send({message:"no se encontro tercero"});
        return res.status(200).send({message:"Exito", tercero:tercero})
    });
}

//Listar todos los terceros
function listarTerceros(req, res){
    var page = 1;
    if(req.params.page){
        page = req.params.page;
    }
    var itemsPerPage = 5;

    TerceroModel.find({}).paginate(page, itemsPerPage,(err, terceros, total)=>{
        if(err) return res.status(500).send({message:"error al realizar operacion"});
        if(!terceros) return res.status(404).send({message:"no se encontraron terceros"});
        return res.status(200).send({message:"Exito", terceros:terceros, total:total, pages : Math.ceil(total/itemsPerPage)})   
    });
}

//listar terceros sin paginado
function listarTercerosSinPaginado(req, res){
    var tercero = req.user.tercero;

    TerceroModel.find({}).sort({nombre:1})
    .exec((err, terceros)=>{
        if(err) return res.status(500).send({message:"error al procesar la peticion", error:err});
        if(!terceros) return res.status(404).send({message: "no se pudo generar"});
        if(terceros) return res.status(200).send({message: "Exitoo", terceros:terceros});
    })
}



module.exports = {
    crearTercero,
    listarUnTercero,
    listarTerceros,
    listarTercerosSinPaginado
}