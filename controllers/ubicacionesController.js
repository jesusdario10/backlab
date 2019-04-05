'use strict';

var UbicacionModel = require('../models/ubicacionModel');

//Crear ubicacion fisica
function crearUbicacionFisica(req, res){
    var body = req.body;
    if(body.nombre && body.codigo){
        var UbicacionFisica = new UbicacionModel();

        UbicacionFisica.codigo = body.codigo;
        UbicacionFisica.nombre = body.nombre;
        UbicacionFisica.usuario_creador = body.usuario_creador;
        UbicacionFisica.save((err, ubicacion)=>{
            if(err) return res.status(500).send({message:"error aprocesar la peticion", error:err});
            if(!ubicacion) return res.status(404).send({message: "no se pudo crear"});
            if(ubicacion) return res.status(200).send({message: "Exitoo", ubicacion:ubicacion});
        });
    }
}

//Update ubicacion fisica(incluye la actualziacion del estado
function updateUbicacion(req, res){
    var id = req.params.id;
    var body = req.body;
    
    UbicacionModel.findById(id, (err, ubicacion)=>{
        ubicacion.nombre = body.nombre;
        ubicacion.usuario_modificador = req.user.sub;

        ubicacion.save((err, ubicacionUpdate)=>{
            if(err) return res.status(500).send({message:"error aprocesar la peticion", error:err});
            if(!ubicacionUpdate) return res.status(404).send({message: "no se pudo actualizar"});
            if(ubicacionUpdate) return res.status(200).send({message: "Exitoo", ubicacionUpdate:ubicacionUpdate});
        });

    }); 
}

//Listar las ubicaciones fisicas en orden alfabetico para supersu
function listarUbicaciones(req, res){
    UbicacionModel.find({}).sort({nombre: 1}).exec((err, ubicaciones)=>{
        if(err) return res.status(500).send({message:"error al procesar la peticion", error:err});
        if(!ubicaciones) return res.status(404).send({message: "no se pudo generar"});
        if(ubicaciones) return res.status(200).send({message: "Exitoo", ubicaciones:ubicaciones});
    });
}

//Listar una sola ubicacion fisica para supersu
function listarUbicacion(req, res){
    var id = req.params.id
    UbicacionModel.findById(id).exec((err, ubicacion)=>{
        if(err) return res.status(500).send({message:"error aprocesar la peticion", error:err});
        if(!ubicacion) return res.status(404).send({message: "no se pudo generar"});
        if(ubicacion) return res.status(200).send({message: "Exitoo", ubicacion:ubicacion});
    });
}


module.exports = {
    crearUbicacionFisica,
    updateUbicacion,
    listarUbicaciones,
    listarUbicacion
}