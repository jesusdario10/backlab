'use strict';

const express = require('express');

var userController = require('../controllers/userController');

var multipart = require('connect-multiparty');
//creamos el middleware multiparty
var md_upload = multipart({uploadDir : './uploads/users'});
var md_auth = require('../middlewares/autenticated');

var app = express.Router();

app.get('/prueba', userController.prueba);
app.post('/save',  userController.guardarUser);
app.post('/login', userController.loginUser);
//Listar un Usuario
app.get('/user/:id', md_auth.ensureAuth,  userController.listUser);
//Listar todos los Usuarios
app.get('/users', md_auth.ensureAuth,  userController.listUsers);
//Cambiar el Estado del usuqario
app.post('/change/:id', md_auth.ensureAuth,  userController.cambioEstadoUsuario);
//Actualizar un usuario
app.post('/update/:id', md_auth.ensureAuth,  userController.updateUser);
//Subir imagen de usuario
app.post('/uploadimage/:id', [md_auth.ensureAuth, md_upload], userController.uploadImage);
//Obtener la imagen del usuario
app.get('/get-image/:id', md_auth.ensureAuth,  userController.getImageFile);

module.exports = app;