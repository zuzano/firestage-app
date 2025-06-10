let express = require('express');
let router = express.Router();
const ctrlPremios = require("../controllers/premios.js");

router.post('/anadirPremios',ctrlPremios.añadirPremios);
router.post('/anadirPremioUsuario',ctrlPremios.anadirPremioUsuario);
router.get('/mostrarPremios',ctrlPremios.mostrarPremios);
router.get('/mostrarPremiosAdmin',ctrlPremios.mostrarPremiosAdmin);
router.get('/comprobarTiradas/:id',ctrlPremios.validarTiradas);
router.put('/editarPremio/:id',ctrlPremios.editarPremio);
router.delete('/eliminarPremio/:id',ctrlPremios.eliminarPremio);
router.post('/obtenerCodigo',ctrlPremios.obtenerCodigoPremio);


module.exports = router;