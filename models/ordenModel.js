'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrdenSchema = new Schema({
    oti:{type:number, required},
    fecha_solicitud:{type:Date},
    fecha_requerida:{type:Date},
    oti_cliente :{type:string},
    cliente:                    {type: Schema.ObjectId, ref:'Orden'},
    centro_costo:               {type:String},
    ubicacion:                  {type:Schema.ObjectId, ref:'Ubicacion'},
    solicitante:                {type:String},
    tercero:                    {type:Schema.ObjectId, ref:'Tercero', required:[true, 'requiere un tercero']},
    usuario_creador:            {type:Schema.ObjectId, ref:'User', required:[true, 'requiere un usuario creador']},
    usuario_modificador:        {type:Schema.ObjectId, ref:'User'},
    items:[{
        tag:                    {type:String},
        nombre:                 {type:String},
        marca:                  {type:String},
        modelo:                 {type:String},
        serial:                 {type:String},
        tipo_equipo:            {type:String},
        fabricante:             {type:String},
        ubicacion:              {type:Schema.ObjectId, ref:'Ubicacion'},
        estado:                 {type:String},
        tipo_indicacion:        {type:String},
        intervalo_indicacion:   {type:String},
        resolucion:             {type:String},
        anexos:                 {type:String},
        img:                    {type:String}
    }]


})