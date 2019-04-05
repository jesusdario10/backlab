'use strict';

var equipoModel = require('../models/equipoModel');
var mongossePaginate = require('mongoose-pagination');


function saveEquipo(req, res){
    var body = req.body;
    console.log(req.user.tercero);

    if(body.serial && body.tag){
        equipoModel.findOne({serial: body.serial, tercero:req.user.tercero}).exec((err, EqEncontrado)=>{
            if(err) return res.status(500).send({message:"error al buscar el equipo"});
            if(EqEncontrado) return res.status(404).send({message:"Equipo ya existe"});
            if(!EqEncontrado){
                equipoModel.findOne({tag:body.tag,tercero:req.user.tercero}).exec((err, EqEncontradoTag)=>{
                    if(err) return res.status(500).send({message:"error al buscar el equipo"});
                    if(EqEncontradoTag) return res.status(404).send({message:"Equipo ya existe"});
                    if(!EqEncontradoTag){
                        var equipoNew = new equipoModel();

                        equipoNew.tag = body.tag;
                        equipoNew.serial = body.serial;
        
                        if(body.nombre) equipoNew.nombre = body.nombre;
                        if(body.marca) equipoNew.marca = body.marca;
                        if(body.modelo) equipoNew.modelo = body.modelo;
                        if(body.tipo_equipo) equipoNew.tipo_equipo = body.tipo_equipo;
                        if(body.fabricante) equipoNew.fabricante = body.fabricante;
                        if(body.ubicacion) equipoNew.ubicacion = body.ubicacion;
                        if(body.estado) equipoNew.estado = body.estado;
                        if(body.tipo_indicacion) equipoNew.tipo_indicacion = body.tipo_indicacion;
                        if(body.intervalo_indicacion) equipoNew.intervalo_indicacion = body.intervalo_indicacion;
                        if(body.resolucion) equipoNew.resolucion = body.resolucion;
                        if(body.anexos) equipoNew.anexos = body.anexos;
                        if(body.img) equipoNew.img = body.img;
        
                        equipoNew.tercero = req.user.tercero;
                        equipoNew.usuario_creador = req.user.sub;
                    
                        equipoNew.save((err, equipoSave)=>{
                            if(err) return res.status(500).send({message:"error al procesar la operacion", error:err});
                            if(!equipoSave) return res.status(404).send({message:"Error al guardar el equipo"});
                            if(equipoSave){
                                res.status(200).send({message:'Exito se guardo correctamente', equipo : equipoSave});
                            }
                        });
                    }
                });
            }
        })
    }else{
        res.status(200).send({message:"Llene los datos necesarios"});
    }
}

//Listar todos los equipos
function listarEquipostodos(req, res){
    equipoModel.find({}).exec((err, equipos)=>{
        if(err) return res.status(500).send({message:"error al ejecutar la peticion"});
        if(!equipos) return res.status(404).send({message:"no existen equipos"});
        if(equipos) return res.status(200).send({message:"Exito", equipos:equipos});
    })
}

//Listar un solo equipo
function listarUnEquipo(req, res){
    var id = req.params.id
    equipoModel.findById(id).exec((err, equipo)=>{
        if(err) return res.status(500).send({message:"error aprocesar la peticion", error:err});
        if(!equipo) return res.status(404).send({message: "no se pudo generar"});
        if(equipo) return res.status(200).send({message: "Exitoo", equipo:equipo});
    });
}

//Actualizar un equipo
function updateEquipo(req, res){
    var body = req.body;
    var id = req.params.id;
    equipoModel.findById({_id:id}).exec((err, equipo)=>{
        if(err) return res.status(500).send({message:"error aprocesar la peticion", error:err});
        if(!equipo) return res.status(404).send({message: "no se pudo generar"});
        console.log(equipo);
        if(equipo){
            if(body.nombre) equipo.nombre = body.nombre;
            if(body.marca) equipo.marca = body.marca;
            if(body.modelo) equipo.modelo = body.modelo;
            if(body.tipo_equipo) equipo.tipo_equipo = body.tipo_equipo;
            if(body.fabricante) equipo.fabricante = body.fabricante;
            if(body.ubicacion) equipo.ubicacion = body.ubicacion;
            if(body.estado) equipo.estado = body.estado;
            if(body.tipo_indicacion) equipo.tipo_indicacion = body.tipo_indicacion;
            if(body.intervalo_indicacion) equipo.intervalo_indicacion = body.intervalo_indicacion;
            if(body.resolucion) equipo.resolucion = body.resolucion;
            if(body.anexos) equipo.anexos = body.anexos;
            if(body.img) equipo.img = body.img;

            equipo.save((err, equipoUpdate)=>{
                if(err) return res.status(500).send({message:"error aprocesar la peticion", error:err});
                if(!equipoUpdate) return res.status(404).send({message: "no se pudo generar la actualizacion"});
                if(updateEquipo) return res.status(200).send({message:'Exito', equipo:equipoUpdate});
            });
        };
    });
};
//Actualizar el serial del equipo
function updateSerial(req, res){
    var idEquipo = req.params.id;
    var serialnuevo = req.body.serial;
    console.log(idEquipo, serialnuevo);

    if(serialnuevo){
        equipoModel.findOne({serial:serialnuevo, tercero:req.user.tercero}).exec((err, serial)=>{
            if(err) return res.status(500).send({message:"error aprocesar la peticion", error:err});
            if(serial) return res.status(404).send({message:"Serial ya existe"});
            if(!serial){
                equipoModel.findById({_id:idEquipo, tercero:req.user.tercero}).exec((err, equipo)=>{
                    equipo.serial = serialnuevo;

                    equipo.save((err, equipoUpdateSerial)=>{
                        if(err) return res.status(500).send({message:"error aprocesar la peticion", error:err});
                        if(!equipoUpdateSerial) return res.status(404).send({message: "no se pudo generar la actualizacion"});
                        if(equipoUpdateSerial) return res.status(200).send({message:'Exito serial actualizado', equipo:equipoUpdateSerial});
                    });
                })
            }

            
        });
    }else{
        res.status(404).send({message:'no ingreso ningun serial'});
    }
};

//Actualizar el tag del equipo
function updateTag(req, res){
    var idEquipo = req.params.id;
    var tagnuevo = req.body.tag;
    console.log(idEquipo, tagnuevo);

    if(tagnuevo){
        equipoModel.findOne({tag:tagnuevo, tercero:req.user.tercero}).exec((err, tag)=>{
            if(err) return res.status(500).send({message:"error aprocesar la peticion", error:err});
            if(tag) return res.status(404).send({message:"Tag ya existe"});
            if(!tag){
                equipoModel.findById({_id:idEquipo, tercero:req.user.tercero}).exec((err, equipo)=>{
                    equipo.tag = tagnuevo;

                    equipo.save((err, equipoUpdateTag)=>{
                        if(err) return res.status(500).send({message:"error aprocesar la peticion", error:err});
                        if(!equipoUpdateTag) return res.status(404).send({message: "no se pudo generar la actualizacion"});
                        if(equipoUpdateTag) return res.status(200).send({message:'Exito tag actualizado', equipo:equipoUpdateTag});
                    });
                })
            }

            
        });
    }else{
        res.status(404).send({message:'no ingreso ningun tag'});
    }
};






module.exports = {
    saveEquipo,
    listarEquipostodos,
    listarUnEquipo,
    updateEquipo,
    updateSerial,
    updateTag
}