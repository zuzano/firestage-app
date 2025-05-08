let express = require('express');
let router = express.Router();
const ctrlLogin = require("../controllers/login.js");

router.post('/registrarUsuario',ctrlLogin.registrarUsuario);
router.post('/iniciarSesion', ctrlLogin.iniciarSesionUsuario);
router.post('/verificarCodigo', ctrlLogin.verificarCodigo);

module.exports = router;