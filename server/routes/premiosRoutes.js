let express = require('express');
let router = express.Router();
const ctrlPremios = require("../controllers/premios.js");

router.post('/añadirPremios',ctrlPremios.añadirPremios);
router.get('/mostrarPremios',ctrlPremios.mostrarPremios);


module.exports = router;