const mongoose = require("mongoose");
require('dotenv').config();
const Usuario = require("../models/Usuario");
const Entradas = require("../models/Entradas");

const nodemailer = require('nodemailer');
const QRCode = require('qrcode');

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

enviarEntradaConQR = async function (email, datosEntrada) {
    const textoQR = `Entrada: ${datosEntrada._id} - Tipo: ${datosEntrada.tipo}`;
    const qrDataURL = await QRCode.toDataURL(textoQR);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'odesxd1934@gmail.com',
            pass: 'kjlh cecz tzhc rxbm'
        }
    });

    const mailOptions = {
        from: 'odesxd1934@gmail.com',
        to: email,
        subject: 'Tu entrada para la discoteca 🎉',
        html: `
        <h2>Gracias por tu compra</h2>
        <p>Tipo de entrada: <strong>${datosEntrada.tipo}</strong></p>
        ${datosEntrada.subtipo ? `<p>Subtipo: <strong>${datosEntrada.subtipo}</strong></p>` : ''}
        <p>Presenta este código QR en la entrada:</p>
        <img src="${qrDataURL}" alt="Código QR" />
      `,
    };

    await transporter.sendMail(mailOptions);
}


comprarEntrada = async function (req, res) {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const { tipo, subtipo, compradorId, email } = req.body;

        // Contadores por tipo
        const limites = {
            general: 50,
            vip: 10,
            premium: 5,
        };

        // Validación de límite 
        const cantidadActual = await Entradas.countDocuments({ tipo });
        if (cantidadActual >= limites[tipo]) {
            return res.status(400).json({ error: `Ya no hay entradas disponibles para el tipo: ${tipo}` });
        }

        // Validación subtipo solo si es VIP
        if (tipo === 'vip' && !['plata', 'oro', 'diamante'].includes(subtipo)) {
            return res.status(400).json({ error: 'Debes especificar un subtipo válido para entradas VIP.' });
        }

        const entrada = new Entradas({
            tipo,
            subtipo: tipo === 'vip' ? subtipo : undefined,
            comprador: compradorId,
        });

        await entrada.save();
        try {
            await enviarEntradaConQR(email, entrada);
            res.status(201).json({
                mensaje: "Entrada comprada y correo enviado con éxito"
            });
        } catch (emailError) {
            // Si falla el envío del correo, borramos la entrada
            await Entradas.findByIdAndDelete(entrada._id);
            return res.status(500).json({
                error: "Error al enviar el correo con el código QR",
                detalle: emailError.message
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: "Error al comprar una entrada",
            mensaje: error.message
        });
    }

}

module.exports = {
    comprarEntrada
}