let express = require('express');
let router = express.Router();
const ctrlUsuarios = require("../controllers/usuarios.js");

router
	.route('/autenticacion')
	.post(ctrlUsuarios.autenticacion);



module.exports = router;