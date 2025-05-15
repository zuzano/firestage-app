const mongoose = require("mongoose");
require('dotenv').config();
const Premios = require("../models/Premios");
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



    const premios = await Premios.find({ estado: 'activo' });

    if (premios.length === 0) {
      return res.status(404).json({ mensaje: 'No hay premios activos en este momento.' });
    }



    res.status(200).json({ premios: premios });


  } catch (error) {
    return res.status(500).json({
      error: "Error al mostrar los premios",
      mensaje: error.message
    });
  }

}

mostrarPremiosAdmin = async function (req, res) {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });



    const premios = await Premios.find();

    if (premios.length === 0) {
      return res.status(404).json({ mensaje: 'No hay premios  en este momento.' });
    }



    res.status(200).json({ premios: premios });


  } catch (error) {
    return res.status(500).json({
      error: "Error al mostrar los premios",
      mensaje: error.message
    });
  }

}

anadirPremioUsuario = async function (req, res) {
  try {

    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const {
      _idusuario,
      premio
    } = req.body;


    if (!_idusuario || !premio) {
      return res.status(400).json({ error: "Faltan datos requeridos." });
    }

    const actualizacionUsuario = await Usuario.findOneAndUpdate(
      { _id: _idusuario },
      { $set: { premios: premio } },  // Aquí solo actualizas el campo 'premio'
      { new: true, runValidators: true }
    );

    // Marcar el premio como inactivo
    await Premios.findOneAndUpdate(
      { descripcion: premio },        
      { $set: { estado: 'finalizado' } },
      { new: true }
    );

    if (!actualizacionUsuario) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    res.json({ mensaje: "El premio se ha añadido a tu cuenta. " + premio + ". Solo puedes obtener un premio por mes, si no lo gastas antes del mes y ganas otro, solo te quedará el premio más reciente." });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Error al añadir el premio al usuario",
      mensaje: error.message
    });
  }
}

validarTiradas = async function (req, res) {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });


    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    // Verificar si hay que reiniciar tiradas
    const ahora = new Date();
    const mesActual = ahora.getMonth();

    const ultimoReinicio = usuario.ultimoReinicio || new Date(0);
    const mesUltimo = ultimoReinicio.getMonth();

    if (mesActual !== mesUltimo) {
      usuario.tiradas = 1; //número de tiradas mensuales
      usuario.ultimoReinicio = ahora;
      await usuario.save();
    }

    //Guardarlo para obtener las tiradas original antes de la resta y mostrar solo las que quedan
    const tiradas = usuario.tiradas;

    if (usuario.tiradas <= 0) {
      return res.status(403).json({ error: "No te quedan tiradas este mes." });
    } else {

      usuario.tiradas -= 1;
      await usuario.save();
    }

    return res.status(200).json({
      tiradas: tiradas
    });




  } catch (error) {
    return res.status(500).json({
      error: "Error al obtener el numero de tiradas.",
      mensaje: error.message
    });
  }
}

editarPremio = async function (req, res) {
  try {

    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const _idpremio = req.params.id;
    const {
     descripcion, estado
    } = req.body;


    if (!_idpremio) {
      return res.status(400).json({ error: "El ID del premio es necesario." });
    }

    // Campos requeridos para la actualizaci�n
    const requiredFields = ["descripcion", "estado"];
    const campoFaltante = requiredFields.find(field => !req.body[field]);
    if (campoFaltante) {
      return res.status(400).json({ error: "Faltan campos por rellenar.", mensaje: `El campo que te falta por rellenar es ${campoFaltante}` });
    }

    // Actualizacion del premio
    const actualizarPremio = {
      descripcion,estado
    };

    const actualizacionPremio = await Premios.findOneAndUpdate(
      { _id: _idpremio },
      actualizarPremio,
      { new: true, runValidators: true }
    );

    if (!actualizacionPremio) {
      return res.status(404).json({ error: "Premio no encontrado." });
    }

    res.status(200).json({ mensaje: "Premio actualizado correctamente" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Error al editar el premio",
      mensaje: error.message
    });
  }
}

eliminarPremio = async function (req, res) {
  try {
    // Conectar a la base de datos
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Obtener el ID del premio a eliminar
    const _id = req.params.id;
    // Intentar eliminar el premio
    const resultado = await Premios.findByIdAndDelete(_id);

    // Verificar si se encontró y eliminó el usuario
    if (!resultado) {
      return res.status(404).json({
        mensaje: "No se encontró el premio con ese ID"
      });
    }

    // Respuesta de éxito si se eliminó
    return res.status(200).json({
      mensaje: "Premio eliminado."
    });
  } catch (error) {
    // Manejar errores generales
    return res.status(500).json({
      mensaje: "Error al eliminar el premio",
      error: error.message
    });
  }
}


module.exports = {
  añadirPremios,
  anadirPremioUsuario,
  mostrarPremios,
  mostrarPremiosAdmin,
  validarTiradas,
  editarPremio,
  eliminarPremio
}