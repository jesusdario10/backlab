'use strict';

var equipoController = require('../controllers/equiposController');

var md_auth = require('../middlewares/autenticated');
var multipart = require('connect-multiparty');
//creamos el middleware multiparty
var md_upload = multipart({uploadDir : './uploads/equipos'});

const express = require('express');
var app = express.Router();


//guardar equipo
app.post('/save', md_auth.ensureAuth, equipoController.saveEquipo);
//listar equipo
app.get('/listartodos', md_auth.ensureAuth, equipoController.listarEquipostodos);
//listar un equipo
app.get('/listar/:id', md_auth.ensureAuth, equipoController.listarUnEquipo);
//update un equipo
app.post('/update/:id', md_auth.ensureAuth, equipoController.updateEquipo);
//update serial equipo
app.post('/updateserial/:id', md_auth.ensureAuth, equipoController.updateSerial);
//update tag equipo
app.post('/updatetag/:id', md_auth.ensureAuth, equipoController.updateTag);
//Subir imagen de equipo
app.post('/uploadimage/:id', [md_auth.ensureAuth, md_upload], equipoController.uploadImage);
//Obtener la imagen del equipo
app.get('/get-image/:id', md_auth.ensureAuth,  equipoController.getImageFile);

module.exports = app;