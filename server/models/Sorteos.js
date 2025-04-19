const mongoose = require('mongoose');

const sorteoSchema = new mongoose.Schema({
  descripcion: {
    type: String,
    required: true,
    trim: true
  },
  estado: {
    type: String,
    enum: ['activo', 'finalizado'],
    default: 'activo'
  },
});

module.exports = mongoose.model('Sorteo', sorteoSchema);