const UsuarioUseCase = require("../useCase/usuarioUseCase");

exports.Login = async (req, res) => 
{
    let usuario = await UsuarioUseCase.ValidarEmailUsuario(req.params.correo);

    if (!usuario)
        res.status(404).json({msg: "El correo ingresado no existe."});

    if(usuario.correo != req.params.correo && usuario.clave != req.params.clave)
        res.status(404).json({msg: "La contraseña o el correo no coinciden."})

    res.json(usuario);
}