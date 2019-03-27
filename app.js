'use strict';

var express = require('express');
var bodyParser = require('body-parser');


//inicializar variables
var app = express();

//carga de middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//Cargar rutas
app.get('/', (req, res)=>{
    console.log(req.body);
    res.status(200).json({message: "Prueba server Nodejs"});
})


module.exports = app;