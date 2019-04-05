'use strict'
const express = require('express'); 
var app = express.Router();
var md_auth = require('../middlewares/autenticated');

var ubicacionController = require('../controllers/ubicacionesController');

//Crear ubicacion fisica
app.post('/save', md_auth.ensureAuth,  ubicacionController.crearUbicacionFisica);
//Update Ubicacion
app.post('/update/:id', md_auth.ensureAuth,  ubicacionController.updateUbicacion);

//Listar Ubicaciones
app.get('/listarubicaciones', md_auth.ensureAuth,  ubicacionController.listarUbicaciones);

//Listar una sola ubicacion
app.get('/listarunaubicacion/:id', md_auth.ensureAuth,  ubicacionController.listarUbicacion);


module.exports = app;