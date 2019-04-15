'use strict';
var md_auth = require('../middlewares/autenticated');
const express = require('express');
var app = express.Router();

var recepcionController = require('../controllers/recepcionEquipoController');

//save receptrions
app.post('/save', md_auth.ensureAuth, recepcionController.saveReception);
//List receptions
app.get('/lists', md_auth.ensureAuth, recepcionController.listsRecepction);
//List One reception
app.get('/one/:id', md_auth.ensureAuth, recepcionController.listOneRecepction);
//update receptrions
app.post('/update/:id', md_auth.ensureAuth, recepcionController.updateReception);


module.exports = app;