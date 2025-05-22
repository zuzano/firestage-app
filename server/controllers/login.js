const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
require('dotenv').config();
const Usuario = require("../models/Usuario");

const twoFactor = require('node-2fa');
const QRCode = require('qrcode');
const nodemailer = require('nodemailer')

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
            res.status(404).json({ error: "Usuario no encontrado", mensaje: "Email incorrecto." })
        }
        // Comparar contraseña ingresada con la almacenada
        const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!contraseñaValida) {
            return res.status(401).json({ mensaje: "Contraseña incorrecta" });
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
            mensaje:"Hubo un error al solicitar tu peticion"
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

recuperarContraseña = async function (req, res) {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const { email } = req.body;

        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        const expiracion = Date.now() + 3600000; // 1 hora

        usuario.expiraContraseña = expiracion;

        await usuario.save()

        const link = `http://localhost:5173/restablecerContraseña/${usuario._id}`;


        // Configura tu transporte de correo
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'odesxd1934@gmail.com',
                pass: 'kjlh cecz tzhc rxbm'
            }
        });

        await transporter.sendMail({
            from: 'odesxd1934@gmail.com',
            to: email,
            subject: 'Recuperar contraseña',
            html: `<p>Haz clic <a href="${link}">aquí</a> para restablecer tu contraseña. Este enlace expirará en 1 hora.</p>`
        });

        res.status(200).json({ mensaje: "Correo de recuperación enviado" });

    } catch (error) {
        res.status(500).json({
            error: "Error al recuperar contraseña",
            mensaje: error.message
        });
    }
}

restablecerContraseña = async function (req, res) {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const { usuarioID, nuevaContraseña } = req.body;

        const usuario = await Usuario.findOne({ _id: usuarioID, expiraContraseña: { $gt: Date.now() } });

        if (!usuario) {
            return res.status(400).json({ mensaje: "ID inválido o expirado" });
        }

        const hash = await bcrypt.hash(nuevaContraseña, 10);
        usuario.contraseña = hash;
        usuario.expiraContraseña = null;

        await usuario.save();

        res.status(200).json({ mensaje: "Contraseña restablecida correctamente" });
    } catch (err) {
        res.status(500).json({ error: "Error al restablecer", mensaje: err.message });
    }
}

validarID = async function (req, res) {
    try {
        const { usuarioID} = req.body;

        const usuario = await Usuario.findById(usuarioID);
        if (!usuario) {
            return res.status(403).json({ error: "ID inválido o expirado" });
        }

        res.sendStatus(200); 
    } catch (err) {
         res.status(500).json({ error: "Error en la solicitud", mensaje: err.message })
    }
}

module.exports = {
    registrarUsuario,
    iniciarSesionUsuario,
    verificarCodigo,
    recuperarContraseña,
    restablecerContraseña,
    validarID
}