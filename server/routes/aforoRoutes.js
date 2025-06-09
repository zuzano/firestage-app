const express = require('express');
const router = express.Router();
const aforoController = require('../controllers/aforo');

router.post('/info', aforoController.obtenerAforo);
router.post('/fechasAgotadas', aforoController.fechasConAforoLleno);


module.exports = router;