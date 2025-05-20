let express = require('express');
let router = express.Router();
const ctrlEntrada = require("../controllers/entradas.js");

router.post('/comprarEntrada',ctrlEntrada.comprarEntrada);
router.get('/fechasAgotadas',ctrlEntrada.fechasAgotadas);
router.get('/mostrarEntradas',ctrlEntrada.mostrarEntradas);
router.put('/editarEntrada/:id',ctrlEntrada.editarEntrada);
router.delete('/eliminarEntrada/:id',ctrlEntrada.eliminarEntrada);


module.exports = router;