const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const createError = require('http-errors');
require('dotenv').config();

const cron = require('node-cron');
const Entradas = require('./models/Entradas');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conectado a MongoDB')
        //Tarea automatizada para borrar entradas cada dia cuando se conecte a la base de datos
        // Ejecutar todos los días a las 00:00
        cron.schedule('0 0 * * *', async () => {
            try {
                await Entradas.deleteMany({});
                console.log('Entradas reiniciadas correctamente');
            } catch (error) {
                console.error('Error al reiniciar entradas:', error);
            }
        });
    })
    .catch(err => console.error('Error al conectar a MongoDB:', err));

// Importar routes
const loginRouter = require('./routes/loginRoutes');
const usuariosRouter = require('./routes/usuarioRoutes');
const premiosRouter = require('./routes/premiosRoutes');
const entradasRouter = require('./routes/entradasRoutes');

const app = express();

// Permite que tu frontend (como React) haga peticiones al backend desde diferentes dominios.
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
