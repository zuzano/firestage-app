let express = require('express');
let router = express.Router();
const ctrlUsuarios = require("../controllers/usuarios.js");

router.post('/contactar',ctrlUsuarios.enviarCorreo);
router.get('/mostrarUsuarios',ctrlUsuarios.mostrarUsuarios);
router.get('/actualizar/:id',ctrlUsuarios.actualizarUsuario);
router.put('/editarUsuario/:id',ctrlUsuarios.editarUsuario);
router.delete('/eliminarUsuario/:id',ctrlUsuarios.eliminarUsuario);


module.exports = router;