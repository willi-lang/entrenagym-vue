const express = require('express');
const router = express.Router();
const citasController = require('../controllers/citasController');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

// Middleware simple de autenticación JWT
function auth(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token requerido' });
  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
}

router.get('/', auth, citasController.getCitas);
router.post('/', auth, citasController.createCita);
router.put('/:id', auth, citasController.updateCita);
router.delete('/:id', auth, citasController.deleteCita);

module.exports = router;