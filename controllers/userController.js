'use strict';
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');

var UserModel = require('../models/userModel');

//probando funcion en el controlador de usuarios

function prueba(req, res){
    res.status(200).send({message:"La prueba ha sido un exito"});
}

//Crear usuarios
function guardarUser(req, res){
    var body = req.body;
    if(body.nombre && body.correo && body.password1 && body.password2){
        if(body.password1 == body.password2){
            UserModel.findOne({correo: body.correo.toLowerCase()}).exec((err, user)=>{
                if(err) return res.status(500).send({message:"error al procesar la peticion", error:err});
                if(user) return res.status(404).send({message:"usuario ya existe"});
                console.log(user);
                if(!user){
                    var User = new UserModel();

                    User.nombre = body.nombre;
                    User.correo = body.correo;
                    User.tercero = body.tercero;
                    //User.usuario_creador = req.user.sub;
                    User.image = null;
                    User.tercero = body.tercero;

                    //encriptando el password
                    bcrypt.hash(body.password1, null, null, (err, hash)=>{
                        User.password = hash;
                        //Guardamos el usuario
                        User.save((err, usuarioGuardado)=>{
                            if(err) return res.status(500).send({message:"error al guardar el usuario"});
                            if(usuarioGuardado) return res.status(200).send({user:usuarioGuardado});
                            if(!usuarioGuardado) return res.status(404).send({message: "ha ocurrrido un problema no se guardo el usuario"});
                        })
                    });
                }
            })
        }else{
            res.status({message:'Las contraseñas no son iguales'});
        }
    }else{
        res.status({message:'Por favor llene todos los campos'});
    }
}
//Login de usuarios
function loginUser(req, res){
   var body = req.body;
   var correo = body.correo;
   var password =body.password;
   

   UserModel.findOne({correo:correo.toLowerCase()}).exec((err, user)=>{
        if(err) return res.status(500).send({message:"error al procesar la peticion", error:err});
        if(!user) return res.status(404).send({message:"Usuario no existe"});
        if(user){
            if(user.estado == 'ACTIVO'){
                bcrypt.compare(password, user.password, (er,check)=>{
                    if(check){
                        if(body.gettoken=='true'){
                            return res.status(200).send({token:jwt.crearToken(user)});
                        }else{
                            //devolvemos el usuario normal
                            user.password = undefined;
                            return res.status(200).send({
                                message:"Usuario Logueado Correctamente",
                                user:user,
                                check:check
                            });
                        }
                    }else{
                        //si la contraseña es incorrecta
                        return res.status(404).send({message:"usuario no pudo identificarse"});
                    }
                })
            }else{
                return res.status(200).send({message:'No esta autorizado'});
            }
        }
   })

}

//listar un solo usuario
function listUser(req, res){
    var id = req.params.id;
    console.log(id);
     UserModel.findById(id, (err, user)=>{
         if(err) return res.status(500).send({message:"error al consultar el usuario"});
         if(!user) return res.status(404).send({message: "no se encontro al usuario"});
         if(user) return res.status(200).send({user:user});
     }) 
 }

 //Listar todos  Los Usuarios
function listUsers(req, res){
    UserModel.find({}, (err, users)=>{
        if(err) return res.status(500).send({message:"error al consultar los usuarios"});
        if(!users) return res.status(404).send({message: "no se encontraron  usuarios"});
        if(users) return res.status(200).send({users:users});
    })
}
//Inactivar Usuario
function cambioEstadoUsuario(req, res){
    var id = req.params.id;
    var body = req.body;
    UserModel.findById(id, (err, user)=>{
        if(err) return res.status(500).send({message:"error aprocesar la peticion"});
        if(!user) return res.status(404).send({message: "no se encontraro usuario"});
        user.estado = body.estado;
        user.save((err, usuarioUpdate)=>{
            if(err) return res.status(500).send({message:"error aprocesar la peticion"});
            if(!user) return res.status(404).send({message: "no se encontraro usuario"});
            if(user) return res.status(200).send({user:usuarioUpdate});     
        });
    });
}

//Actualizar un Usuario para el administrador
function updateUser(req, res){
    var id = req.params.id;
    var body = req.body;
    
    UserModel.findById(id)
             .populate('tercero', 'nombre')
             .exec((err, user)=>{
                if(err) return res.status(500).send({message:"error aprocesar la peticion"});
                if(!user) return res.status(404).send({message: "no se encontraro usuario"});
                if(user){
                    user.nombre = body.nombre;
                    user.correo = body.correo;
                    user.estado = body.estado;
                    
                    
                    user.save((err, UserActualizado)=>{
                        if(err) return res.status(500).send({message:"error aprocesar la peticion"});
                        if(!UserActualizado) return res.status(404).send({message: "no se pudo actualizar"});
                        if(UserActualizado) return res.status(200).send({message: "Exitoo", user:UserActualizado});
                    });
                }  
             });
}

module.exports = {
    prueba,
    guardarUser,
    loginUser,
    listUser,
    listUsers,
    cambioEstadoUsuario,
    updateUser
}