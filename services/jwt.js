'use strict';

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'Noraver_Igora_es_$%.una{clave78/paraDR_xa+loque{´+}Raton_Think.PeligfoCargaPesadayLargeada';

exports.crearToken = function(user){
    var payload = {
        sub : user._id,
        tercero : user.tercero,
        nombre : user.nombre,
        email : user.correo,
        image : user.image,
        iat:moment().unix(), // fecha de creacion del token
        exp :moment().add(1, 'days').unix// fecha de expiracion de token, a la fecha actual le agegamos un dia
    }
    console.log(payload);
    return jwt.encode(payload, secret);
}