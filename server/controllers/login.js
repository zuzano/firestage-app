const mongoose = require("mongoose");
require('dotenv').config();
const Usuario = require("../models/Usuario");


const dbURI = process.env.MONGODB_URI;
console.log(dbURI)
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());

/* solo acepta datos simples (como nombre=Juan&edad=25), no objetos complejos anidados.
Convierte esos datos en un objeto JavaScript accesible en req.body. */
app.use(bodyParser.urlencoded({ extended: false }));
/* establece un tamaño máximo de 10 megabytes para el cuerpo de la petición, evitando que se cuelgue el servidor con datos muy grandes.
Convierte el JSON recibido en un objeto JavaScript accesible en req.body. */
app.use(bodyParser.json({ limit: '10mb' }));

registrarUsuario = async function (req,res){
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const {
            nombre,
            apellidos,
            email,
            contraseña
        } = req.body;

        const usuarioExistente = await Usuario.findOne({email});

        if(usuarioExistente){
            return res.status(400).json({mensaje: 'El email ya está registrado'});
        }

        const nuevoUsuario = new Usuario({nombre, apellidos, email, contraseña});

        await nuevoUsuario.save();

        res.status(201).json({ mensaje: 'Usuario registrado con éxito', usuario: nuevoUsuario });
    }catch(error){
        return res.status(500).json({
            error: "Error al registrar el usuario",
            mensaje: error.message
        });
    }
}

iniciarSesionUsuario = async function (req,res){
    try{
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const {
            email,
            contraseña
        } = req.body;

        const usuario = await Usuario.findOne({email: email, contraseña: contraseña});
        if(!usuario){
            res.status(404).json({error: "Usuario no encontrado", mensaje: error.message})
        }

        res.status(200).json({mensaje: "Sesión Iniciada", usuario: {usuario}});
    }catch(error){
        return res.status(500).json({
            error: "Error al iniciar sesion",
            mensaje: error.message
        });
    }
}


module.exports = {
    registrarUsuario,
    iniciarSesionUsuario
}