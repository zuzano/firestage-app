const Aforo = require('../models/Aforo');
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

// Obtener aforo por fecha
obtenerAforo = async (req, res) => {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const { fecha, tipo, subtipo } = req.body; // ahora usa req.body para recibir estos parámetros

        if (!fecha || !tipo) {
            return res.status(400).json({ error: "Los parámetros 'fecha' y 'tipo' son obligatorios" });
        }
        
        // Convertir fecha string a Date
        const fechaDate = new Date(fecha);

        // Validación subtipo solo si es VIP
        if (tipo === 'vip' && !['plata', 'oro', 'diamante'].includes(subtipo)) {
            return res.status(400).json({ error: 'Debes especificar un subtipo válido para entradas VIP.' });
        }

        let aforo;
        let capacidad;
        if (tipo === 'vip') {
            aforo = await Aforo.findOne({ tipo: tipo, subtipo: subtipo, fecha: fechaDate });
            capacidad = await Capacidad.findOne({ tipo: tipo, subtipo: subtipo });
        } else {
            aforo = await Aforo.findOne({ tipo: tipo, fecha: fechaDate });
            capacidad = await Capacidad.findOne({ tipo: tipo });
        }

        res.status(200).json({ entradasVendidas: aforo ? aforo.entradasVendidas : 0, capacidadTotal: capacidad.capacidadTotal });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const fechasConAforoLleno = async (req, res) => {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });


        const { tipo, subtipo } = req.body;

        if (!tipo) {
            return res.status(400).json({ error: "El parámetro 'tipo' es obligatorio" });
        }

        const capacidad = await Capacidad.findOne(tipo === 'vip'
            ? { tipo, subtipo }
            : { tipo });

          if (!capacidad) {
            return res.status(404).json({ error: "No se encontró capacidad para el tipo dado." });
        }

        // Buscar todos los aforos con ese tipo (y subtipo si es VIP)
        const aforos = await Aforo.find(
            tipo === 'vip'
                ? { tipo, subtipo }
                : { tipo }
        );

        const fechasLlenas = [];

        for (const aforo of aforos) {
            if (aforo.entradasVendidas === capacidad.capacidadTotal) {
                fechasLlenas.push(aforo.fecha);
            }
        }


        res.status(200).json({ fechasAgotadas: fechasLlenas });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    obtenerAforo,
    fechasConAforoLleno
};