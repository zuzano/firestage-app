const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  apellidos: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  contraseña: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    enum: ['cliente', 'admin'],
    default: 'cliente'
  },
  puntos: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Usuario', usuarioSchema);