const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
require('dotenv').config();
const Usuario = require("../models/Usuario");

const twoFactor = require('node-2fa');
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



registrarUsuario = async function (req, res) {
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

        const usuarioExistente = await Usuario.findOne({ email });

        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'El email ya está registrado' });
        }

        const nuevoSecreto = twoFactor.generateSecret({
            name: "MiApp",
            account: email
        });

        // Encriptar contraseña antes de guardar
        const saltRounds = 10;
        const contraseñaEncriptada = await bcrypt.hash(contraseña, saltRounds);

        const nuevoUsuario = new Usuario({
            nombre,
            apellidos,
            email,
            contraseña: contraseñaEncriptada,
            twoFASecret: nuevoSecreto.secret,
            twoFAHabilitado: true
        });


        await nuevoUsuario.save();

        res.status(201).json({ mensaje: 'Usuario registrado con éxito', usuario: nuevoUsuario });
    } catch (error) {
        return res.status(500).json({
            error: "Error al registrar el usuario",
            mensaje: error.message
        });
    }
}

iniciarSesionUsuario = async function (req, res) {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const {
            email,
            contraseña
        } = req.body;

        const usuario = await Usuario.findOne({ email: email });

        if (!usuario) {
            res.status(404).json({ error: "Usuario no encontrado", mensaje: error.message })
        }
        // Comparar contraseña ingresada con la almacenada
        const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!contraseñaValida) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        // No iniciar sesión aún. Verificamos 2FA.
        if (usuario.twoFAHabilitado) {
            const totpUri = `otpauth://totp/MiApp:${email}?secret=${usuario.twoFASecret}&issuer=MiApp`;
            QRCode.toDataURL(totpUri, (err, imageUrl) => {
                if (err) {
                    return res.status(500).json({ error: "Error generando el QR" });
                }

                res.status(200).json({
                    requiere2FA: true,
                    qr: imageUrl
                });
            });
        } else {
            res.status(200).json({ mensaje: "Sesión Iniciada", usuario });
        }

    } catch (error) {
        return res.status(500).json({
            error: "Error al iniciar sesion",
            mensaje: error.message
        });
    }
}

verificarCodigo = async function (req, res) {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const { email, token } = req.body;

        const usuario = await Usuario.findOne({ email });

        if (!usuario || !usuario.twoFASecret) {
            return res.status(400).json({ error: "Usuario o secreto no válido" });
        }

        const resultado = twoFactor.verifyToken(usuario.twoFASecret, token);

        if (!resultado || resultado.delta !== 0) {
            return res.status(401).json({ error: "Código inválido o expirado" });
        }

        // Código válido → login completado
        res.status(200).json({ mensaje: "Autenticación 2FA correcta", usuario });
    } catch (error) {
        return res.status(500).json({
            error: "Error al iniciar sesion",
            mensaje: error.message
        });
    }
}


module.exports = {
    registrarUsuario,
    iniciarSesionUsuario,
    verificarCodigo
}