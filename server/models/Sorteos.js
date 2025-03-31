const mongoose = require('mongoose');

const sorteoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  fecha_inicio: {
    type: Date,
    default: null
  },
  fecha_fin: {
    type: Date,
    default: null
  },
  estado: {
    type: String,
    enum: ['activo', 'finalizado'],
    default: 'activo'
  },
  participaciones: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Sorteo', sorteoSchema);