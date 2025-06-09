const Capacidad = require('../models/Capacidad');
const mongoose = require("mongoose");

const dbURI = process.env.MONGODB_URI;

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

// Inserta capacidades iniciales (una sola vez)
const insertarCapacidadesIniciales = async (req, res) => {
    try {
        const existentes = await Capacidad.find();
        if (existentes.length > 0) {
            console.log('Los datos ya han sido insertados.');
        }

        const datosIniciales = [
            { tipo: 'general', subtipo: null, capacidadTotal: 100 },
            { tipo: 'vip', subtipo: 'plata', capacidadTotal: 3 },
            { tipo: 'vip', subtipo: 'oro', capacidadTotal: 2 },
            { tipo: 'vip', subtipo: 'diamante', capacidadTotal: 1 },
            { tipo: 'premium', subtipo: null, capacidadTotal: 3 }
        ];

        await Capacidad.insertMany(datosIniciales);
        console.log('Datos iniciales insertados correctamente');
    } catch (error) {
        console.error(error.message);
    }
};

module.exports = {
    insertarCapacidadesIniciales,
};
