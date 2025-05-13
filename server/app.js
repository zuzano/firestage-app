const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const createError = require('http-errors');
require('dotenv').config();


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conectado a MongoDB')
    })
    .catch(err => console.error('Error al conectar a MongoDB:', err));

// Importar routes
const loginRouter = require('./routes/loginRoutes');
const usuariosRouter = require('./routes/usuarioRoutes');
const premiosRouter = require('./routes/premiosRoutes');
const entradasRouter = require('./routes/entradasRoutes');

const app = express();

// Permite que el frontend haga peticiones al backend desde diferentes dominios.
app.use(cors());
// Procesa datos enviados desde formularios HTML. Convierte cosas como "email=ejemplo@correo.com" en un objeto usable.
app.use(bodyParser.urlencoded({ extended: false }));
// Procesa datos JSON enviados en las peticiones. Convierte JSON como {"email": "ejemplo@correo.com"} en un objeto de JavaScript.
app.use(bodyParser.json());

//Archivos estaticos
app.use(express.static('public'));

// Routes
app.use('/autenticacion', loginRouter);
app.use('/usuarios', usuariosRouter);
app.use('/sorteos', premiosRouter);
app.use('/reservas', entradasRouter);


// 404 ERROR
app.use((req, res, next) => {
    next(createError(404, 'Recurso no encontrado'));
});

//Manejador de errores
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({
        error: {
            message: err.message,
            status: status
        }
    });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
