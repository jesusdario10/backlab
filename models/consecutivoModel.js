'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ConsecutivoSchema = new Schema({
    prefijo:{type:String, required:[true, 'El prefijo es requerido']},
    consecutivo: {type:Number, default:0, required:[true, 'El consecutivo empieza en cero y va sumando 1 a 1']},
    tercero :{type:Schema.ObjectId, ref:'Tercero',   required:[true, 'El tercero es el cliente o proveedor a quien le pertenece el consecutivo']},
    usuario_creador :{type:Schema.ObjectId, ref:'Usuario' }
})
module.exports = mongoose.model('Consecutivo', ConsecutivoSchema);
/*---------------------------------------------------------------------------------
    prefijo : Caracteres que antecederan al numero en la actividad
    consecutivo: empieza en cero y sumara 1 cada que el tercero cree una actividad
    tercero : PROVEEDOR O CLIENTE que se asociaran a los consecutivos
-----------------------------------------------------------------------------------*/