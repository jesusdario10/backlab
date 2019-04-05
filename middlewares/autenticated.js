'use strict';
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'Noraver_Igora_es_$%.una{clave78/paraDR_xa+loque{´+}Raton_Think.PeligfoCargaPesadayLargeada';

exports.ensureAuth = function(req, res, next){
    if( !req.headers.authorization){
        return res.status(403).send({message:"la peticion no tiene cabecera de autenticacion"});
    }
    //aqui cargamos el token 
    var token = req.headers.authorization.replace(/['"]+/g,'');//);//remplaza cualquier comilla doble o simple por vacio
    try{
        //decodificando el token
        var payload = jwt.decode(token, secret);/* el payload es sencible a errores y exepciones que 
        causa que la aplicacion pare por eso lo meto en un try cacth*/

        if(payload.exp <= moment.unix()){
            return res.status(401).send({message:"token Expiro"});
        }
    }catch(ex){
        return res.status(404).send({message:"el token no es valido"});
    }
    //adjuntamos el payload a la req para tener siempre a la mano dentro de los controladores el objeto del usuario logeado
    req.user = payload;
    next();
}
//Estos middlewares los usaremos en las rutas de modo que deberemos cargarlos allí vamos a userRoutes.js 