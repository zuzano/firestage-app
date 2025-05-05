const mongoose = require('mongoose');

const entradaSchema = new mongoose.Schema({
  tipo: {
    type: String,
    enum: ['general', 'vip', 'premium', 'cumpleaños'],
    required: true,
  },
  subtipo: {
    type: String,
    enum: ['plata', 'oro', 'diamante'],
    required: function () {
      return this.tipo === 'vip';
    },
  },
  comprador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario', 
    required: true,
  },
  fechaCompra: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Entrada', entradaSchema);