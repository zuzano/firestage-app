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

enviarCorreo = async function (req, res) {
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

mostrarUsuarios = async function (req, res) {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

   

    const usuarios = await Usuario.find();

    if (usuarios.length === 0) {
      return res.status(404).json({ mensaje: 'No existe ningún usuario.' });
    }

   
    res.status(200).json({ mensaje: 'Se encontraron usuarios.', usuarios: usuarios});


  } catch (error) {
    return res.status(500).json({
      error: "Error al registrar el usuario",
      mensaje: error.message
    });
  }

}

editarUsuario = async function(req,res) {
  try {
   
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const _idusuario = req.params.id;
    const {
     nombre,email,rol,puntos
    } = req.body;


    if (!_idusuario) {
      return res.status(400).json({ error: "El ID del usuario es necesario." });
    }

    // Campos requeridos para la actualizaci�n
    const requiredFields = ["nombre","email","rol","puntos"];
    if (requiredFields.some(field => !req.body[field])) {
      return res.status(400).json({ error: "Faltan campos por rellenar." });
    }

    // Actualizacion del usuario
    const actualizarUsuario = {
      nombre,email,rol,puntos
    };

    const actualizacionUsuario = await Producto.findOneAndUpdate(
      {_id:_idusuario},
      actualizarUsuario,
      { new: true, runValidators: true }
    );

    if (!actualizacionUsuario) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    res.json("Usuario actualizado");

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Error al editar el usuario",
      mensaje: error.message
    });
  }
}

eliminarUsuario = async function (req,res){
  try {
    // Conectar a la base de datos
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Obtener el ID del usuario a eliminar
    const _id = req.params.id;
    // Intentar eliminar el usuario
    const resultado = await Usuario.findByIdAndDelete(_id);

    // Verificar si se encontró y eliminó el usuario
    if (!resultado) {
      return res.status(404).json({
        mensaje: "No se encontró el usuario con ese ID"
      });
    }

    // Respuesta de éxito si se eliminó
    return res.status(200).json({
      mensaje: "Usuario eliminado"
    });
  } catch (error) {
    // Manejar errores generales
    return res.status(500).json({
      mensaje: "Error al eliminar el usuario",
      error: error.message
    });
  }
}

module.exports = {
  enviarCorreo,
  mostrarUsuarios,
  editarUsuario,
  eliminarUsuario
}

