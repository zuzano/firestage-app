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
Convierte el JSON recibido en un objeto JavaScript */


const nodemailer = require('nodemailer');

enviarCorreo = async function(req,res) {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const {
            asunto,
            mensaje,
            email
        } = req.body;

        const usuarioExistente = await Usuario.findOne({ email });

        if (!usuarioExistente) {
            return res.status(404).json({ mensaje: 'Debes estar registrado para realizar esta acción.' });
        }

        // https://myaccount.google.com/apppasswords para crear una contraseña de aplicacion
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'odesxd1934@gmail.com',
              pass: 'kjlh cecz tzhc rxbm'
            }
          });
          
          const mailOptions = {
            from: email,
            to: 'santi.casalv@hotmail.com',
            subject: asunto,
            text: `${mensaje}`
          };
          
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return res.status(404).json({
                error: "Error al enviar el correo",
                mensaje: error
            });
            } else {
              res.status(200).json({ mensaje: 'Correo enviado', info: info.response });
            }
          });


    } catch (error) {
        return res.status(500).json({
            error: "Error al registrar el usuario",
            mensaje: error.message
        });
    }
}

module.exports = {
    enviarCorreo,
}

