const express = require ('express');
const mongoConnection = require ('./config/MongoAdapter');
require('dotenv').config({ path: 'variables.env' });

// Creación del servidor 
const app = express();

// Conexión a base de datos
mongoConnection();

// permitir entrada Json
app.use(express.json());

// enrutar usuarios
app.use('/api/usuarios', require('./routes/usuariosRoutes'));

// enrutar tareas 
app.use('/api/tareas', require('./routes/tareasRoutes'));

// escuchar puerto
app.listen(process.env.PORT, () => {
    console.log("Servidor --> desplegado correctamente");
    console.log(`Escuchando en el puerto: ${process.env.PORT}`)
});