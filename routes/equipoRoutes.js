'use strict';

var equipoController = require('../controllers/EquiposController');

var md_auth = require('../middlewares/autenticated');

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

module.exports = app;