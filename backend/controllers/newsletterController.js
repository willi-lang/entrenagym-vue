const Newsletter = require('../models/Newsletter');

exports.subscribe = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email requerido' });
  try {
    const nuevo = new Newsletter({ email });
    await nuevo.save();
    res.status(201).json({ message: '¡Gracias por suscribirte!' });
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar el email' });
  }
};