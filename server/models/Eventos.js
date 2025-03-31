const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  fecha: {
    type: Date,
    required: true
  },
  precio: {
    type: Number,
    default: null
  },
  capacidad: {
    type: Number,
    default: null
  },
  imagen: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Evento', eventoSchema);