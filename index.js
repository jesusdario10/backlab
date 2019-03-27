'use strict'
var mongoose = require('mongoose');
var app = require('./app');
var port = 5000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/laboratorio', {useNewUrlParser: false})
    .then(()=>{
        console.log("conectado a la db laboratorio");
        app.listen(port, ()=>{
            console.log("express server corriendo en pueto 5000 online");
        })
    })
    .catch(err=>{
        console.log("Error al conectarse a la db");
})
