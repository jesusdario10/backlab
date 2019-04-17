'use strict';

var express = require('express');
var bodyParser = require('body-parser');


//inicializar variables
var app = express();

//carga de middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//configuracion de Cors(cabeceras http)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//Cargar ficheros de rutas 
var userRoutes = require('./routes/userRoutes');
var terceroRoutes = require('./routes/terceroRoutes');
var ubicacionRoutes = require('./routes/ubicacionRoutes');
var equipoRoutes = require('./routes/equipoRoutes');
var consecutivoRoutes = require('./routes/consecutivoRoutes');
var ordenRoutes = require('./routes/ordenRoutes');
var recepcionRoutes = require('./routes/receptionRoutes');


//middleware para definir la rutra base
app.use('/user', userRoutes);
app.use('/tercero',terceroRoutes);
app.use('/ubicacion', ubicacionRoutes);
app.use('/equipo', equipoRoutes);
app.use('/conse', consecutivoRoutes);
app.use('/order', ordenRoutes);
app.use('/reception', recepcionRoutes);






module.exports = app;