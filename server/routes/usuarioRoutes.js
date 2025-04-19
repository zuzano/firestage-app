let express = require('express');
let router = express.Router();
const ctrlUsuarios = require("../controllers/usuarios.js");

router.post('/contactar',ctrlUsuarios.enviarCorreo);
router.get('/mostrarUsuarios',ctrlUsuarios.mostrarUsuarios);


module.exports = router;