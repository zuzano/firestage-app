const mongoose = require("mongoose");
require('dotenv').config();
const Entradas = require("../models/Entradas");
const Usuario = require("../models/Usuario");

const nodemailer = require('nodemailer');
const QRCode = require('qrcode');

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

  // Correo al administrador
  const mailToAdmin = {
    from: 'odesxd1934@gmail.com',
    to: 'santi.casalv@hotmail.com', // correo del administrador
    subject: 'Nueva entrada comprada',
    text: `Se ha realizado una compra:\n\nTipo: ${datosEntrada.tipo}\n${datosEntrada.subtipo ? 'Subtipo: ' + datosEntrada.subtipo + '\n' : ''}Email comprador: ${email}`
  };

  await transporter.sendMail(mailToAdmin);
}

fechasAgotadas = async function (req, res) {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });


    // Contadores por tipo
    const limites = {
      general: 2,
      vip: 3,
      premium: 2,
    };

    /*Solo se agruparán juntos los datos que tengan:
    El mismo tipo de entrada, y La misma fecha (ignorando la hora). */
    // Agrupamos por fecha y tipo, contando cuántas hay en total
    const resultados = await Entradas.aggregate([
      {
        $group: {
          _id: {
            tipo: "$tipo",
            fecha: {
              $dateToString: { format: "%Y-%m-%d", date: "$fechaCompra" },
            },
          },
          cantidad: { $sum: 1 },
        },
      },
    ]);

    // Filtramos los que lleguen al límite de entradas segun el tipo
    const fechasExcedidas = resultados.filter(({ _id, cantidad }) => {
      const limite = limites[_id.tipo];
      return cantidad >= limite;
    });


    return res.status(200).json({ fechas: fechasExcedidas });
  } catch (error) {
    return res.status(500).json({
      error: "Error al contar las fechas excedidas",
      mensaje: error.message
    });
  }
}

comprarEntrada = async function (req, res) {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const { tipo, subtipo, compradorId, email, fechaCompra } = req.body;

    // Validación subtipo solo si es VIP
    if (tipo === 'vip' && !['plata', 'oro', 'diamante'].includes(subtipo)) {
      return res.status(400).json({ error: 'Debes especificar un subtipo válido para entradas VIP.' });
    }

    const entrada = new Entradas({
      tipo,
      subtipo: tipo === 'vip' ? subtipo : undefined,
      comprador: compradorId,
      fechaCompra: fechaCompra
    });

    await entrada.save();
    try {
      await enviarEntradaConQR(email, entrada);
      return res.status(201).json({
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

mostrarEntradas = async function (req, res) {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const entradas = await Entradas.find();

    if (entradas.length === 0) {
      return res.status(404).json({ mensaje: 'De momento no hay entradas.' });
    }


    return res.status(200).json({ entradas: entradas });


  } catch (error) {
    return res.status(500).json({
      error: "Error al mostrar los entradas",
      mensaje: error.message
    });
  }

}

editarEntrada = async function (req, res) {
  try {

    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const _identrada = req.params.id;

    const {
      tipo, subtipo, comprador, fechaCompra
    } = req.body;


    if (!_identrada) {
      return res.status(400).json({ error: "El ID de la entrada es necesario." });
    }

    // Campos requeridos para la actualizaci�n
    const requiredFields = ['tipo', 'comprador', 'fechaCompra'];
    const campoFaltante = requiredFields.find(field => !req.body[field]);
    if (campoFaltante) {
      return res.status(400).json({ error: "Faltan campos por rellenar.", mensaje: `El campo que te falta por rellenar es ${campoFaltante}` });
    }

    if (tipo === 'vip' && !['plata', 'oro', 'diamante'].includes(subtipo)) {
      return res.status(400).json({ error: 'Debes especificar un subtipo válido para entradas VIP.' });
    }

    const compradorExiste = await Usuario.findById({ _id: comprador }); 

    if (!compradorExiste) {
      return res.status(400).json({ error: "El usuario  no existe." , mensaje: 'Asegurate de introducir un usuario que exista.'});
    }

    // Actualizacion del usuario
    const actualizarEntrada = {
      tipo, subtipo, comprador, fechaCompra
    };


    const actualizacionEntrada = await Entradas.findOneAndUpdate(
      { _id: _identrada },
      actualizarEntrada,
      { new: true, runValidators: true }
    );

    if (!actualizacionEntrada) {
      return res.status(404).json({ error: "Entrada no encontrada." });
    }

    return res.status(200).json({ mensaje: "Entrada actualizada correctamente" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Error al editar la entrada",
      mensaje: "Hubo un error al procesar la solicitud."
    });
  }
}

eliminarEntrada = async function (req, res) {
  try {
    // Conectar a la base de datos
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Obtener el ID del usuario a eliminar
    const _id = req.params.id;
    // Intentar eliminar el usuario
    const resultado = await Entradas.findByIdAndDelete(_id);

    // Verificar si se encontró y eliminó el usuario
    if (!resultado) {
      return res.status(404).json({
        mensaje: "No se encontró la entrada con ese ID"
      });
    }

    // Respuesta de éxito si se eliminó
    return res.status(200).json({
      mensaje: "Entrada eliminada"
    });
  } catch (error) {
    // Manejar errores generales
    return res.status(500).json({
      mensaje: "Error al eliminar la entrada",
      error: error.message
    });
  }
}

module.exports = {
  comprarEntrada,
  fechasAgotadas,
  mostrarEntradas,
  editarEntrada,
  eliminarEntrada
}