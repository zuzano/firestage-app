const Aforo = require('../models/Aforo');
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

crearOActualizarAforo = async (req, res) => {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const { fecha, tipo, subtipo, capacidadTotal } = req.body;

        const aforo = await Aforo.findOneAndUpdate(
            { fecha, tipo, subtipo },
            { $set: { capacidadTotal } },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        res.status(200).json({ message: 'Aforo creado o actualizado', aforo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener aforo por fecha
obtenerAforo = async (req, res) => {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const { fecha } = req.params;
        const aforos = await Aforo.find({ fecha });

        res.status(200).json(aforos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    crearOActualizarAforo,
    obtenerAforo
};