'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UbicacionSchema = new Schema({
    nombre:         {type: String, required:[true, 'el nombre de la ubicacion es requerido']},
    codigo:         {type: String, required:[true, 'el codigo de la ubicacion es requerido'], unique:true},
    usuario_creador:{type: Schema.ObjectId, ref:'User'},
    usuario_modificador:{type: Schema.ObjectId, ref:'User'},
    fecha_creacion : {type :Date, default:Date.now}
})

module.exports = mongoose.model('Ubicacion', UbicacionSchema);