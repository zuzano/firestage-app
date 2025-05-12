let express = require('express');
let router = express.Router();
const ctrlPremios = require("../controllers/premios.js");

router.post('/anadirPremios',ctrlPremios.añadirPremios);
router.post('/anadirPremioUsuario',ctrlPremios.anadirPremioUsuario);
router.get('/mostrarPremios',ctrlPremios.mostrarPremios);
router.get('/comprobarTiradas/:id',ctrlPremios.validarTiradas);


module.exports = router;