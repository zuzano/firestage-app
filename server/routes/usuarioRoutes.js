let express = require('express');
let router = express.Router();
const ctrlUsuarios = require("../controllers/login.js");

router.post('/registrarUsuario',ctrlUsuarios.registrarUsuario);
router.post('/iniciarSesion', ctrlUsuarios.iniciarSesionUsuario);



module.exports = router;