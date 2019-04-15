'use strict'
var ConsecutivoModel = require('../models/consecutivoModel');
var mongossePaginate = require('mongoose-pagination');

//Crear Consecutivos
function crearConsecutivos(req, res){
    var body = req.body;
    var tercero = body.tercero;
    var Consecutivo = new ConsecutivoModel();
    if(body.prefijo && body.tercero){
        ConsecutivoModel.findOne({prefijo:body.prefijo}).exec((err, consecutivo)=>{
            if(err) return res.status(500).send({message:"error al procesar la peticion", error:err});
            if(consecutivo) return res.status(200).send({message: "Usted ya Tiene un Consecutivo Asignado no es Posible Asigar Mas"});
            if(!consecutivo){
                Consecutivo.prefijo = body.prefijo;
                Consecutivo.tercero = body.tercero;
                Consecutivo.usuario_creador = body.usuario_creador;
                Consecutivo.save((err, ConsecutivoCreado)=>{
                    if(err) return res.status(500).send({message:"error aprocesar la peticion"});
                    if(!ConsecutivoCreado) return res.status(404).send({message: "no se pudo actualizar"});
                    if(ConsecutivoCreado) return res.status(200).send({message: "Exitoo", consecutivo:ConsecutivoCreado});
                });
            }
        })

    }else{
        return res.status(200).send({message: "Ingrese los campos requeridos"});
    }
}
function listarTodosConsecutivos(req, res){
    ConsecutivoModel.find({}).exec((err, consecutivos)=>{
        if(err) return res.status(500).send({message:"error al procesar la peticion", error:err});
        if(!consecutivos) return res.status(404).send({message: "No existen consecutivos"});
        if(consecutivos){
          return  res.status(200).send({consecutivos});
        }
    })
}

function listarUnConsecutivo(req, res){
    var nombre = req.params.nombre
    ConsecutivoModel.findOne({prefijo:nombre}).exec((err, consecutivo)=>{
        if(err) return res.status(500).send({message:"error al procesar la peticion", error:err});
        if(!consecutivo) return res.status(404).send({message: "No existe consecutivo"});
        if(consecutivo) return  res.status(200).send({consecutivo});
    })
}


module.exports = {
    crearConsecutivos,
    listarTodosConsecutivos,
    listarUnConsecutivo

}