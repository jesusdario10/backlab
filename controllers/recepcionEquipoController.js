'use strict';
var recepcionModel = require('../models/recepcionModel');
var consecutivoModel = require('../models/consecutivoModel');

function saveReception(req, res){
    var body = req.body;
    var recepcion = new recepcionModel;

    if(body.fecha)                  recepcion.fecha = body.fecha;
    if(body.tipo_servicio)          recepcion.tipo_servicio = body.tipo_servicio;
    if(body.solicitante)            recepcion.solicitante = body.solicitante;
    if(body.tercero)                recepcion.tercero = body.tercero;
    if(body.tag)                    recepcion.tag = body.tag;
    if(body.serial)                 recepcion.serial = body.serial;
    if(body.intervalo_medicion)     recepcion.intervalo_medicion = body.intervalo_medicion;
    if(body.tipo_medicion)          recepcion.tipo_medicion = body.tipo_medicion;
    if(body.tipo_indicacion)        recepcion.tipo_indicacion = body.tipo_indicacion;
    if(body.intervalo_calibracion)  recepcion.intervalo_calibracion = body.intervalo_calibracion;
    if(body.estado)                 recepcion.estado = body.estado;
    if(body.apto)                   recepcion.apto = body.apto;
   

    consecutivoModel.findOne({prefijo:'Recepcion'}).exec((err, consecutivo)=>{
        if(err) return res.status(500).send({message:"Error al generar operacion de consecutivos"});
        if(!consecutivo) return res.status(404).send({message:"no se encontraron consecutivos"});
        if(consecutivo){
            consecutivo.consecutivo++;
            recepcion.no_recepcion = consecutivo.consecutivo;

            consecutivo.save((err, updateConsecutivo)=>{
                if(err) return res.status(500).send({message:"error al actualizar el consecutivo"});
                if(!updateConsecutivo) return res.status(404).send({message:"no se actualizo el consecutivo"});
                if(updateConsecutivo){
                    recepcion.save((err, recepcionSave)=>{
                        if(err) return res.status(500).send({message:"Error al generar operacion de guardado"});
                        if(!recepcionSave) return res.status(404).send({message:"no se pudo guardar la recepcion"});
                        if(recepcionSave) return res.status(200).send({message:"Exito", recepcion:recepcionSave});
                    });
                };
            });
        };
    });
}

//List reception
function listsRecepction(req, res){
    recepcionModel.find({}).exec((err, receptions)=>{
        if(err) return res.status(500).send({message:"error al listar las recepciones"});
        if(!receptions) return res.status(404).send({message:"no hay recepciones"});
        if(receptions) return res.status(200).send({message:'Exito', recepciones:receptions});
    });
}
//list one reception
function listOneRecepction(req, res){
    var id = req.params.id;
    recepcionModel.findById({_id:id}).exec((err, recepcion)=>{
        if(err) return res.status(500).send({message:"error listar la recepcion"});
        if(!recepcion) return res.status(404).send({message:"no hay recepcion"});
        if(recepcion) return res.status(200).send({message:'Exito', recepciones:recepcion});
    });
}
//update recepcion
function updateReception(req, res){
    var id = req.params.id;
    var body = req.body;
    recepcionModel.findById({_id:id}).exec((err, recepcion)=>{
        if(err) return res.status(500).send({message:"error listar la recepcion"});
        if(!recepcion) return res.status(404).send({message:"no hay recepcion"});
        if(recepcion){
            if(body.fecha)                  recepcion.fecha = body.fecha;
            if(body.tipo_servicio)          recepcion.tipo_servicio = body.tipo_servicio;
            if(body.solicitante)            recepcion.solicitante = body.solicitante;
            if(body.tercero)                recepcion.tercero = body.tercero;
            if(body.tag)                    recepcion.tag = body.tag;
            if(body.serial)                 recepcion.serial = body.serial;
            if(body.intervalo_medicion)     recepcion.intervalo_medicion = body.intervalo_medicion;
            if(body.tipo_medicion)          recepcion.tipo_medicion = body.tipo_medicion;
            if(body.tipo_indicacion)        recepcion.tipo_indicacion = body.tipo_indicacion;
            if(body.intervalo_calibracion)  recepcion.intervalo_calibracion = body.intervalo_calibracion;
            if(body.estado)                 recepcion.estado = body.estado;
            if(body.apto)                   recepcion.apto = body.apto;

            recepcion.save((err, recepcionUpdate)=>{
                if(err) return res.status(500).send({message:"Error al generar operacion de guardado"});
                if(!recepcionUpdate) return res.status(404).send({message:"no se pudo guardar la recepcion"});
                if(recepcionUpdate) return res.status(200).send({message:"Exito", recepcion:recepcionUpdate});
            });
        };
    });
}

module.exports ={
    saveReception,
    listsRecepction,
    listOneRecepction,
    updateReception
}