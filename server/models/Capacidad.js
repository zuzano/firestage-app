const mongoose = require('mongoose');

const capacidadSchema = new mongoose.Schema({
  tipo: {
    type: String,
    enum: ['general', 'vip', 'premium'],
    required: true,
  },
  subtipo: {
    type: String,
    enum: ['plata', 'oro', 'diamante'],
    default: null,
    // El subtipo solo es requerido si el tipo es "vip"
    required: function () {
      return this.tipo === 'vip';
    }
  },
  capacidadTotal: {
    type: Number,
    required: true,
    min: 0
  }
});

// Asegura que no se repita una combinación tipo/subtipo
capacidadSchema.index({ tipo: 1, subtipo: 1 }, { unique: true });

module.exports = mongoose.model('Capacidad', capacidadSchema);