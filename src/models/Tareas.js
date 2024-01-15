const mongoose = require('mongoose'); 

const   TareaSchema = mongoose.Schema({

    id: {
        type: String,
        required: false
    },
    nombre: {
        type: String,
        required: true
    },
    prioridad: {
        type: String,
        required: true
    },
    fechaVencimiento: {
        type: Date,
        required: true,
        default: Date.now
    },
    idPropietario: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Tarea', TareaSchema);