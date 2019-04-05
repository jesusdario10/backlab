'use strict';
const express = require('express');
var TerceroController = require('../controllers/terceroController');
var md_auth = require('../middlewares/autenticated');
var app = express.Router();

//Creando un tercero
app.post('/save', md_auth.ensureAuth, TerceroController.crearTercero);
//Listar un tercero
app.get('/tercero/:id', md_auth.ensureAuth, TerceroController.listarUnTercero);
//Listar todos los terceros
app.get('/terceros/:page?', md_auth.ensureAuth, TerceroController.listarTerceros);
//Listar terceros sin paginacion
app.get('/tercerossinpaginado', md_auth.ensureAuth, TerceroController.listarTercerosSinPaginado);

module.exports = app;