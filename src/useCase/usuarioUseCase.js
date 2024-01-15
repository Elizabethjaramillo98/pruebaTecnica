const Usuario = require("../models/Usuarios");

exports.EliminarUsuarioPorId = async (idUsuario) => 
{
    await Usuario.findOneAndDelete({ _id: idUsuario });

    return 1;
}

exports.ObtenerUsuarioPorId = async (idUsuario) =>
{
    let consultaUsuario = await Usuario.findById(idUsuario);

    if(!consultaUsuario)
    {
        return 0;
    }

    return consultaUsuario;
}

exports.ActualizarUsuario = async (usuarioRequest, id) =>
{
    let usuario = await Usuario.findOneAndUpdate({ _id: id }, usuarioRequest, { new: true});

    return usuario;
}

exports.CrearUsuario = async (usuariorequest) =>
{
    let usuario = new Usuario(usuariorequest);

    await usuario.save();

    return usuario;
}

exports.ValidarEmailUsuario = async (email) => 
{
    let emailUsuario = await Usuario.find({ correo: email});

    if(emailUsuario.length == 0)
    {
        return 0;
    }

    return 1;
}
