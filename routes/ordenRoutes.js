'use strict';

var ordenController = require('../controllers/ordenController');
var md_auth = require('../middlewares/autenticated');
const express = require('express');
var app = express.Router();

//save Order
app.post('/save', md_auth.ensureAuth, ordenController.saveOrden);
//get Orders
app.get('/list', md_auth.ensureAuth, ordenController.orderLists);
//get Order
app.get('/list/:id', md_auth.ensureAuth, ordenController.orderListOne);



module.exports = app;