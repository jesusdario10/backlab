'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Roles Validos
var rolesValidos = {
    values :['ADMIN', 'SUPERSU'],
    message: '{VALUE} no es un rol permitido'
};

var UserSchema = new Schema({
    nombre:     {type: String, required:[true, 'el nombre es requerido']},
    correo:     {type: String, unique:true, required:[true, 'el correo es requerido']},
    role:       {type: String, required:[true, 'el role es requerido'], default:'ADMIN', enum:rolesValidos },
    password:   {type:String, required:[true, 'el password es requerido']},
    usuario_creador : {type: Schema.ObjectId, ref:'User'},
    usuario_modificador : {type: Schema.ObjectId, ref:'User'},
    image:        {type:String},
    estado : {type:String, default:'ACTIVO'},
    tercero : {type: Schema.ObjectId, ref:'Tercero'}
});


//exportando el Schema
module.exports = mongoose.model('Usuario', UserSchema);

