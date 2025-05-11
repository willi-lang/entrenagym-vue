const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  entrenador: { type: String, required: true },
  fecha: { type: String, required: true },
  hora: { type: String, required: true },
  descripcion: { type: String },
  tipo: { type: String, enum: ['presencial', 'virtual'], default: 'presencial' }
});

module.exports = mongoose.model('Cita', citaSchema);