const Cita = require('../models/Cita');

exports.getCitas = async (req, res) => {
  try {
    const citas = await Cita.find({ usuario: req.userId });
    res.json(citas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener citas' });
  }
};

exports.createCita = async (req, res) => {
  try {
    const cita = new Cita({ ...req.body, usuario: req.userId });
    await cita.save();
    res.status(201).json(cita);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear cita' });
  }
};

exports.updateCita = async (req, res) => {
  try {
    const cita = await Cita.findOneAndUpdate(
      { _id: req.params.id, usuario: req.userId },
      req.body,
      { new: true }
    );
    if (!cita) return res.status(404).json({ error: 'Cita no encontrada' });
    res.json(cita);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar cita' });
  }
};

exports.deleteCita = async (req, res) => {
  try {
    const cita = await Cita.findOneAndDelete({ _id: req.params.id, usuario: req.userId });
    if (!cita) return res.status(404).json({ error: 'Cita no encontrada' });
    res.json({ message: 'Cita eliminada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar cita' });
  }
};