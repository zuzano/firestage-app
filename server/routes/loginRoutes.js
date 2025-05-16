let express = require('express');
let router = express.Router();
const ctrlLogin = require("../controllers/login.js");

router.post('/registrarUsuario',ctrlLogin.registrarUsuario);
router.post('/iniciarSesion', ctrlLogin.iniciarSesionUsuario);
router.post('/verificarCodigo', ctrlLogin.verificarCodigo);
router.post('/recuperarContrasena', ctrlLogin.recuperarContraseña);
router.post('/validarID', ctrlLogin.validarID);
router.post('/restablecerContrasena', ctrlLogin.restablecerContraseña);

module.exports = router;