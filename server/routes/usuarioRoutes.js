let express = require('express');
let router = express.Router();
const ctrlUsuarios = require("../controllers/usuarios.js");

router.post('/contactar',ctrlUsuarios.enviarCorreo);


module.exports = router;