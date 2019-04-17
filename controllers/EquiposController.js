'use strict';

var equipoModel = require('../models/equipoModel');
var mongossePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require('path');


function saveEquipo(req, res){
    var body = req.body;
    console.log(req.user.tercero);

    if(body.serial && body.tag){
        equipoModel.findOne({serial: body.serial, tercero:req.user.tercero}).exec((err, EqEncontrado)=>{
            if(err) return res.status(500).send({message:"error al buscar el equipo"});
            if(EqEncontrado) return res.status(404).send({message:"Equipo ya existe"});
            if(!EqEncontrado){
                equipoModel.findOne({tag:body.tag,tercero:req.user.tercero}).exec((err, EqEncontradoTag)=>{
                    if(err) return res.status(500).send({message:"error al buscar el equipo"});
                    if(EqEncontradoTag) return res.status(404).send({message:"Equipo ya existe"});
                    if(!EqEncontradoTag){
                        var equipoNew = new equipoModel();

                        equipoNew.tag = body.tag;
                        equipoNew.serial = body.serial;
        
                        if(body.nombre) equipoNew.nombre = body.nombre;
                        if(body.marca) equipoNew.marca = body.marca;
                        if(body.modelo) equipoNew.modelo = body.modelo;
                        if(body.tipo_equipo) equipoNew.tipo_equipo = body.tipo_equipo;
                        if(body.fabricante) equipoNew.fabricante = body.fabricante;
                        if(body.ubicacion) equipoNew.ubicacion = body.ubicacion;
                        if(body.estado) equipoNew.estado = body.estado;
                        if(body.tipo_indicacion) equipoNew.tipo_indicacion = body.tipo_indicacion;
                        if(body.intervalo_indicacion) equipoNew.intervalo_indicacion = body.intervalo_indicacion;
                        if(body.resolucion) equipoNew.resolucion = body.resolucion;
                        if(body.anexos) equipoNew.anexos = body.anexos;
                        if(body.img) equipoNew.img = body.img;
        
                        equipoNew.tercero = req.user.tercero;
                        equipoNew.usuario_creador = req.user.sub;
                    
                        equipoNew.save((err, equipoSave)=>{
                            if(err) return res.status(500).send({message:"error al procesar la operacion", error:err});
                            if(!equipoSave) return res.status(404).send({message:"Error al guardar el equipo"});
                            if(equipoSave){
                                res.status(200).send({message:'Exito se guardo correctamente', equipo : equipoSave});
                            }
                        });
                    }
                });
            }
        })
    }else{
        res.status(200).send({message:"Llene los datos necesarios"});
    }
}

//Listar todos los equipos
function listarEquipostodos(req, res){
    equipoModel.find({}).exec((err, equipos)=>{
        if(err) return res.status(500).send({message:"error al ejecutar la peticion"});
        if(!equipos) return res.status(404).send({message:"no existen equipos"});
        if(equipos) return res.status(200).send({message:"Exito", equipos:equipos});
    })
}

//Listar un solo equipo
function listarUnEquipo(req, res){
    var id = req.params.id
    equipoModel.findById(id).exec((err, equipo)=>{
        if(err) return res.status(500).send({message:"error aprocesar la peticion", error:err});
        if(!equipo) return res.status(404).send({message: "no se pudo generar"});
        if(equipo) return res.status(200).send({message: "Exitoo", equipo:equipo});
    });
}

//Actualizar un equipo
function updateEquipo(req, res){
    var body = req.body;
    var id = req.params.id;
    equipoModel.findById({_id:id}).exec((err, equipo)=>{
        if(err) return res.status(500).send({message:"error aprocesar la peticion", error:err});
        if(!equipo) return res.status(404).send({message: "no se pudo generar"});
        console.log(equipo);
        if(equipo){
            if(body.nombre) equipo.nombre = body.nombre;
            if(body.marca) equipo.marca = body.marca;
            if(body.modelo) equipo.modelo = body.modelo;
            if(body.tipo_equipo) equipo.tipo_equipo = body.tipo_equipo;
            if(body.fabricante) equipo.fabricante = body.fabricante;
            if(body.ubicacion) equipo.ubicacion = body.ubicacion;
            if(body.estado) equipo.estado = body.estado;
            if(body.tipo_indicacion) equipo.tipo_indicacion = body.tipo_indicacion;
            if(body.intervalo_indicacion) equipo.intervalo_indicacion = body.intervalo_indicacion;
            if(body.resolucion) equipo.resolucion = body.resolucion;
            if(body.anexos) equipo.anexos = body.anexos;
            if(body.img) equipo.img = body.img;

            equipo.save((err, equipoUpdate)=>{
                if(err) return res.status(500).send({message:"error aprocesar la peticion", error:err});
                if(!equipoUpdate) return res.status(404).send({message: "no se pudo generar la actualizacion"});
                if(updateEquipo) return res.status(200).send({message:'Exito', equipo:equipoUpdate});
            });
        };
    });
};
//Actualizar el serial del equipo
function updateSerial(req, res){
    var idEquipo = req.params.id;
    var serialnuevo = req.body.serial;
    console.log(idEquipo, serialnuevo);

    if(serialnuevo){
        equipoModel.findOne({serial:serialnuevo, tercero:req.user.tercero}).exec((err, serial)=>{
            if(err) return res.status(500).send({message:"error aprocesar la peticion", error:err});
            if(serial) return res.status(404).send({message:"Serial ya existe"});
            if(!serial){
                equipoModel.findById({_id:idEquipo, tercero:req.user.tercero}).exec((err, equipo)=>{
                    equipo.serial = serialnuevo;

                    equipo.save((err, equipoUpdateSerial)=>{
                        if(err) return res.status(500).send({message:"error aprocesar la peticion", error:err});
                        if(!equipoUpdateSerial) return res.status(404).send({message: "no se pudo generar la actualizacion"});
                        if(equipoUpdateSerial) return res.status(200).send({message:'Exito serial actualizado', equipo:equipoUpdateSerial});
                    });
                })
            }

            
        });
    }else{
        res.status(404).send({message:'no ingreso ningun serial'});
    }
};

//Actualizar el tag del equipo
function updateTag(req, res){
    var idEquipo = req.params.id;
    var tagnuevo = req.body.tag;
    console.log(idEquipo, tagnuevo);

    if(tagnuevo){
        equipoModel.findOne({tag:tagnuevo, tercero:req.user.tercero}).exec((err, tag)=>{
            if(err) return res.status(500).send({message:"error aprocesar la peticion", error:err});
            if(tag) return res.status(404).send({message:"Tag ya existe"});
            if(!tag){
                equipoModel.findById({_id:idEquipo, tercero:req.user.tercero}).exec((err, equipo)=>{
                    equipo.tag = tagnuevo;

                    equipo.save((err, equipoUpdateTag)=>{
                        if(err) return res.status(500).send({message:"error aprocesar la peticion", error:err});
                        if(!equipoUpdateTag) return res.status(404).send({message: "no se pudo generar la actualizacion"});
                        if(equipoUpdateTag) return res.status(200).send({message:'Exito tag actualizado', equipo:equipoUpdateTag});
                    });
                })
            }

            
        });
    }else{
        res.status(404).send({message:'no ingreso ningun tag'});
    }
}

//subir imagen de equipo para hoja de vida
function uploadImage(req, res){
    var equipoId = req.params.id;
    if(req.files.image != undefined){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        console.log(ext_split);
        var file_ext = ext_split[1];

        if(file_ext == 'png' || file_ext == "jpg" || file_ext == "jpeg" || file_ext == "gif"){
            equipoModel.findById(equipoId, (err, equipoImage)=>{
                if(err) return res.status(500).json({message:"error en la peticion."});
                if(!equipoImage) return res.status(404).json({message:"eno se encontro el equipo"});
                if(equipoImage){
                    var pathViejo = "./uploads/equipos/"+equipoImage.image;
                    // ====en caso de que ya exista una imagen la borramos ===== //
                    if(fs.existsSync(pathViejo)){
                        fs.unlink(pathViejo, (err)=>{
                            console.log("imagen antigua borrada");
                        })
                    }
                    //guardamos
                    equipoImage.image = file_name;
                    equipoImage.save((err, equipo)=>{
                        if(err) return res.status(500).send({message:"Error en la peticion"});
                        if(!equipo) return res.status(404).send({message:"error imagen no guardada"});
                        return res.status(200).json({equipo});
                    });
                }     
            });
        }else{
                removeFileUploads(res, file_path, "Tipo de archivo no valido");
            }
        }
}
//Eliminar imagen de equipo
function removeFileUploads(res, file_path, message){
    fs.unlink(file_path, (err)=>{//elimina el archivo subido de la ruta
        return res.status(200).json({message:message});
    });
}

//Devolver Imagen del equipo
function getImageFile(req, res){
    var equipoId = req.params.id;

    equipoModel.findById(equipoId, (err, equipo)=>{
        if(err) return res.status(500).send({message:"Error en la peticion"});
        if(!equipo) return res.status(404).send({message:"Error usuario no existe"});
        if(equipo){
            var path_file = './uploads/equipos/'+equipo.image;
            fs.exists(path_file, (exists)=>{
                if(exists){
                    return res.sendFile(path.resolve(path_file))
                }else{
                    return res.status(200).json({message:"No existe la imagen"});
                }
            });
        }
    });
}

module.exports = {
    saveEquipo,
    listarEquipostodos,
    listarUnEquipo,
    updateEquipo,
    updateSerial,
    updateTag,
    uploadImage,
    getImageFile
}