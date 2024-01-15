const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({

    id: {
        type: String,
        required: false
    },
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    clave: {
        type: String,
        required: true
    },
    tipoDocumento: {
        type: String,
        required: true
    },
    documento: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Usuarios', UsuarioSchema);