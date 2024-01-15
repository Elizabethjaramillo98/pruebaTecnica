const UsuarioUseCase = require("../useCase/usuarioUseCase");
const TareasUseCase = require("../useCase/tareaUseCase");

exports.ActualizarUsuario = async (req, res) =>
{
    try
    {
        const id = req.params.id;
        const {nombre, correo, clave, tipoDocumento, documento} = req.body;
        let usuario = await UsuarioUseCase.ObtenerUsuarioPorId(id);

        if (!usuario)
            res.status(404).json({msg: 'El usuario no existe.'});

        usuario.nombre = nombre;
        usuario.correo = correo;
        usuario.clave = clave;
        usuario.tipoDocumento = tipoDocumento;
        usuario.documento = documento;

        usuario = await UsuarioUseCase.ActualizarUsuario(usuario, id);

        res.json(usuario);

    }catch(error)
    {
        console.log(error);
        res.status(500).send(`Error actualizando el usuario con documento: ${documento}`);
    }
}

exports.CrearUsuario = async (req, res) =>
{
    try
    {
        let validarCorreo = await UsuarioUseCase.ValidarEmailUsuario(req.body.correo);

        if(validarCorreo)
        {
            res.status(404).json({msg: 'El correo ingresado ya existe.'});
        }
        else
        {
            let respuestaUsuario = await UsuarioUseCase.CrearUsuario(req.body);

            res.json(respuestaUsuario);
        }

    }catch(error)
    {
        console.log(error);
        res.status(500).send("Error al crear el usuario.");
    }
}

exports.EliminarUsuario = async (req, res) => 
{
    try
    {
        let usuarioRespuesta = await UsuarioUseCase.ObtenerUsuarioPorId(req.params.id);

        let consultaTarea = await TareasUseCase.ConsultarListaTareasPorIdPropietario(req.params.id);

        
        if (!usuarioRespuesta)
        {
            res.status(404).send('El usuario no existe.');
            
        }else if(consultaTarea)
        {
            res.status(404).json({msg: 'No puede eliminar un usuario con tareas asociadas.'});

        }else
        {
            let eliminacionUsuario = await UsuarioUseCase.EliminarUsuarioPorId(req.params.id);
          
            if(eliminacionUsuario)
                res.json({msg: "Usuario eliminado con éxito."});
        }
        
    }catch(error)
    {
        console.log(error);
        res.status(500).send(`Error eliminando usuario con id: ${req.params.id}`);
    }
}

exports.ConsultarUsuarioPorId = async (req, res) =>
{
    try
    {
        let usuarioRespuesta = await UsuarioUseCase.ObtenerUsuarioPorId(req.params.id);

        if(!usuarioRespuesta)
        {
            res.status(404).json({msg: 'El usuario no existe.'});
            res.setHeader('Content-Type', 'text/html');
        }

        res.json(usuarioRespuesta);


    }catch(error)
    {
        console.log(error);
        res.status(500).send(`Error obteniendo usuario con id: ${req.params.id}`);
    }
}