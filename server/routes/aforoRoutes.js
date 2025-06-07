const express = require('express');
const router = express.Router();
const aforoController = require('../controllers/aforo');

router.post('/crear', aforoController.crearOActualizarAforo);
router.get('/fecha/:fecha', aforoController.obtenerAforo);

module.exports = router;