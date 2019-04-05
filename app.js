'use strict';

var express = require('express');
var bodyParser = require('body-parser');


//inicializar variables
var app = express();

//carga de middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//Cargar ficheros de rutas 
var userRoutes = require('./routes/userRoutes');
var terceroRoutes = require('./routes/terceroRoutes');
var ubicacionRoutes = require('./routes/ubicacionRoutes');
var equipoRoutes = require('./routes/equipoRoutes');


//middleware para definir la rutra base
app.use('/user', userRoutes);
app.use('/tercero',terceroRoutes);
app.use('/ubicacion', ubicacionRoutes);
app.use('/equipo', equipoRoutes);



module.exports = app;