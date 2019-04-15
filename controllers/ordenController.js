'use strict';
var ordenModel = require('../models/ordenModel');
var consecutivoModel = require('../models/consecutivoModel');

function saveOrden(req, res){
    var body = req.body;
    var tercero = req.user.tercero;
    var newOrden = new ordenModel();

    if(body.fecha_solicitud) newOrden.fecha_solicitud = new Date(body.fecha_solicitud);
    if(body.fecha_requerida) newOrden.fecha_requerida = new Date(body.fecha_requerida);
    if(body.oti_cliente) newOrden.oti_cliente = body.oti_cliente;
    if(body.centro_costo) newOrden.centro_costo = body.centro_costo;
    if(body.ubicacion) newOrden.ubicacion = body.ubicacion;
    if(body.solicitante) newOrden.solicitante = body.solicitante;
    if(body.tercero) newOrden.tercero = body.tercero;

    consecutivoModel.findOne({prefijo:'Oti'}).exec((err, consecutivo)=>{
        if(err) return res.status(500).send({message:"error al consultar el consecutivo", error:err});
        if(!consecutivo) return res.status(404).send({message: "no se encontro el consecutivo"});
        if(consecutivo){
            consecutivo.consecutivo ++;
            newOrden.oti = consecutivo.consecutivo;
            newOrden.usuario_creador = req.user.sub;
            consecutivo.save((err, consecutivoActualizado)=>{
                if(err) return res.status(500).send({message:"error al ejecutar la accion en consecutivosn", error:err});
                if(!consecutivoActualizado) return res.status(404).send({message: "no se actualizo el consecutivo"});
                if(consecutivoActualizado){
                    newOrden.save((err, orden)=>{
                        if(err) return res.status(500).send({message:"error al consultar la orden", error:err});
                        if(!orden) return res.status(404).send({message: "no se encontro la orden"});
                        if(orden) return res.status(200).send({message:"Exito", orden});
                    }); 
                };
            });
        ;} 
    }); 
}
//Listar todas las ordenes
function orderLists(req, res){
    ordenModel.find({}).exec((err, orders)=>{
        if(err) return res.status(500).send({message:"error alconsultar las ordenes", error:err});
        if(!orders) return res.status(404).send({message: "no se encontraron ordenes"});
        if(orders) return res.status(200).send({message:"Exito", orders});
    });
}
//List one order
function orderListOne(req, res){
    var id = req.params.id;
    ordenModel.findById({_id:id}).exec((err, order)=>{
        if(err) return res.status(500).send({message:"error al consultar la orden", error:err});
        if(!order) return res.status(404).send({message: "no se encontro la orden"});
        if(order) return res.status(200).send({message:"Exito", order});
    });
}




module.exports = {
    saveOrden,
    orderLists,
    orderListOne
}