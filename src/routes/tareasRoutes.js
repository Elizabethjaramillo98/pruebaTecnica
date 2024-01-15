const express = require('express');
const router = express.Router();
const tareasController = require("../controllers/tareaController");

router.post('/CrearTarea', tareasController.CrearTarea);

router.get('/ConsultarTareaPorId/:id', tareasController.ConsultarTareaPorId);

router.get('/ConsultarTareasPorIdUsuario/:id', tareasController.ConsultarTareaPorIdUsuario);

router.put('/ActualizarTarea/:id', tareasController.ActualizarTarea);

router.delete('/EliminarTarea/:id', tareasController.EliminarTarea);

module.exports = router;