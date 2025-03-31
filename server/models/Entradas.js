const mongoose = require('mongoose');

const entradaSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  evento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Evento',
    required: true
  },
  tipo: {
    type: String,
    enum: ['general', 'vip'],
    required: true
  },
  precio: {
    type: Number,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'fecha_compra'
  }
});

module.exports = mongoose.model('Entrada', entradaSchema);