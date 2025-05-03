const mongoose = require("mongoose");
require('dotenv').config();
const Premios = require("../models/Premios");


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
Convierte el JSON recibido en un objeto JavaScript */

añadirPremios = async function (req, res) {
    try {
        // Conectar a la base de datos
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const {
            descripcion,
            estado
        } = req.body;



        const premioExistente = await Premios.findOne({ descripcion });

        if (premioExistente) {
            return res.status(400).json({ mensaje: 'El premio ya existe.' });
        }

        const nuevoPremio = new Premios({ descripcion, estado });

        await nuevoPremio.save();

        return res.status(200).json({
            mensaje: "Premio añadido."
        });
    } catch (error) {
        // Manejar errores generales
        return res.status(500).json({
            mensaje: "Error al añadir Premio",
            error: error.message
        });
    }
}

mostrarPremios = async function (req, res) {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

   

    const premios = await Premios.find();

    if (premios.length === 0) {
      return res.status(404).json({ mensaje: 'No existe ningún premio.' });
    }

   
    res.status(200).json({ premios: premios});


  } catch (error) {
    return res.status(500).json({
      error: "Error al mostrar los premios",
      mensaje: error.message
    });
  }

}


module.exports = {
    añadirPremios,
    mostrarPremios
}