const User = require('../models/User');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

// Controlador de autenticación (login, registro, etc.)
exports.register = async (req, res) => {
  const { nombre, email, password } = req.body;
  if (!nombre || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  try {
    const existe = await User.findOne({ email });
    if (existe) return res.status(400).json({ error: 'El email ya está registrado' });
    const user = new User({ nombre, email, password });
    await user.save();
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email y contraseña requeridos' });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: 'Credenciales inválidas' });
    const token = jwt.sign({ id: user._id, email: user.email }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });
    res.json({ token, user: { id: user._id, nombre: user.nombre, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};