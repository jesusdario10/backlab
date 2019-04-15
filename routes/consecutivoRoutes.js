'use strict'
const express = require('express'); 
var app = express.Router();
var ConsecutivoController = require('../controllers/consecutivoController');
var md_auth = require('../middlewares/autenticated');

//Crear Consecutivos
app.post('/save', md_auth.ensureAuth, ConsecutivoController.crearConsecutivos);
app.get('/listar', md_auth.ensureAuth, ConsecutivoController.listarTodosConsecutivos);
app.get('/listarUno/:nombre', md_auth.ensureAuth, ConsecutivoController.listarUnConsecutivo);

module.exports = app;
