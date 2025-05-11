const express = require('express');
const router = express.Router();
const contactoController = require('../controllers/contactoController');

router.post('/', contactoController.sendMessage);

module.exports = router;