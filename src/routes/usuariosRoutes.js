// rutas para los usuarios
const express = require('express');
const router = express.Router();
const usuarioCotroller = require("../controllers/usuarioControllers");

router.put('/ActualizarUsuario/:id', usuarioCotroller.ActualizarUsuario);

router.post('/CrearUsuario', usuarioCotroller.CrearUsuario);

router.delete('/EliminarUsuario/:id', usuarioCotroller.EliminarUsuario);

router.get('/ConsultarUsuario/:id', usuarioCotroller.ConsultarUsuarioPorId);

module.exports = router;