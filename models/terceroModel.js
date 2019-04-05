'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TerceroSchema = new Schema({
    nit:            {type: String, required:[true, 'el nit es requerido']},
    nombre:         {type : String, required:[true, 'el nomlbre es requerido']},
    direccion:      {type: String},
    telefono:       {type: String},
    contacto:       {type: String},
    usuario_creador:{type: Schema.ObjectId, ref:'User'}
});

module.exports = mongoose.model('Tercero', TerceroSchema);