let express = require('express');
let router = express.Router();
const ctrlUsuarios = require("../controllers/login.js");

router
	.route('/registrarUsuario')
	.post(ctrlUsuarios.registrarUsuario);




module.exports = router;