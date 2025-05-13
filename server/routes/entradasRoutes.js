let express = require('express');
let router = express.Router();
const ctrlEntrada = require("../controllers/entradas.js");

router.post('/comprarEntrada',ctrlEntrada.comprarEntrada);
router.get('/fechasAgotadas',ctrlEntrada.fechasAgotadas);


module.exports = router;