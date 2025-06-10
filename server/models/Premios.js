const mongoose = require('mongoose');

const premioSchema = new mongoose.Schema({
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
  codigoPremio: { 
    type: String,
    trim: true,
    unique: true,
    default: null 
  },
});

module.exports = mongoose.model('Premio', premioSchema);