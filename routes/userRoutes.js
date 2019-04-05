'use strict';

const express = require('express');

var userController = require('../controllers/userController');


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

module.exports = app;