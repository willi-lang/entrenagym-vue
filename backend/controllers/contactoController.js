const Contacto = require('../models/Contacto');

exports.sendMessage = async (req, res) => {
  const { nombre, email, asunto, mensaje } = req.body;
  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  try {
    const nuevo = new Contacto({ nombre, email, asunto, mensaje });
    await nuevo.save();
    res.status(201).json({ message: 'Mensaje enviado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al enviar mensaje' });
  }
};