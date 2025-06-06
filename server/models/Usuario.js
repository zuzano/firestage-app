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
    dni: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  contraseña: {
    type: String,
    required: true
  },
  twoFASecret: { type: String}, // <- secreto para 2FA
  twoFAHabilitado: { type: Boolean, default: false },
  rol: {
    type: String,
    enum: ['cliente', 'admin'],
    default: 'cliente'
  },
  premios: {
    type: String,
    default: 'Nada'
  },
  tiradas: {
    type: Number,
    default: 1
  },
  ultimoReinicio: {
    type: Date,
    default: null
  },
  expiraContraseña: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Usuario', usuarioSchema);