const mongoose = require('mongoose');

const aforoSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    required: true,
  },
  tipo: {
    type: String,
    enum: ['general', 'vip', 'premium'],
    required: true,
  },
  subtipo: {
    type: String,
    enum: ['plata', 'oro', 'diamante'],
    default: null,
    required: function () {
      return this.tipo === 'vip';
    },
  },
  entradasVendidas: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
});

//No se pueden crear dos documentos en la colección aforos que tengan la misma combinación de fecha, tipo y subtipo. Por eso se crea este indice para evitar duplicados , unicamente hara falta actualizarlo
aforoSchema.index({ fecha: 1, tipo: 1, subtipo: 1 }, { unique: true });

module.exports = mongoose.model('Aforo', aforoSchema);
