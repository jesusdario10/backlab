'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecepcionShema = Schema({
    fecha: {type:Date, default: Date.now},
    tipo_servicio : {type:String},
    no_recepcion : {type:Number},
    solicitante : {type:String},
    tercero:      {type:Schema.ObjectId, ref:'Tercero', required:[true, 'requiere un tercero']},
    tag : {type:String},
    serial : {type:String},
    intervalo_medicion : {type:String},
    tipo_medicion : {type:String},
    tipo_indicacion : {type:String},
    intervalo_calibracion : {type:String},
    estado : {type:String},
    apto: {type:String},
    archivo : {type:String}
})

module.exports = mongoose.model('Reception', RecepcionShema);