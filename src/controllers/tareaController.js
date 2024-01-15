const TareaUseCase = require("../useCase/tareaUseCase");
const UsuarioUseCase = require("../useCase/usuarioUseCase");

exports.CrearTarea = async (req, res) =>
{
    try
    {
        let respuestaUsuario = await UsuarioUseCase.ObtenerUsuarioPorId(req.body.idPropietario);

        if(!respuestaUsuario)
        {
            res.status(404).json({msg: 'Para crear una tarea se debe de asociar con un usuario existente.'});
        }else
        {
            let respuestaTarea = await TareaUseCase.CrearTarea(req.body);
    
            res.json(respuestaTarea);
        }

    }catch(error)
    {
        console.log(error);
        res.status(500).send("Error al crear la tarea.");
    }
}

exports.ConsultarTareaPorId = async (req, res) =>
{
    try
    {
        let respuestaTarea = await TareaUseCase.ConsultarTareaPorId(req.params.id);

        if(!respuestaTarea)
        {
            res.status(404).json({msg: 'La tarea no existe.'});
            res.setHeader('Content-Type', 'text/html');
        }

        res.json(respuestaTarea);


    }catch(error)
    {
        console.log(error);
        res.status(500).send(`Error al obtener la tarea con id: ${req.params.id}`);
    }
}

exports.ConsultarTareaPorIdUsuario = async (req, res) =>
{
    try
    {
        let usuario = await UsuarioUseCase.ObtenerUsuarioPorId(req.params.id);

        if(!usuario)
            res.status(404).json({msg: 'El usuario no existe.'});

        let tareas = await TareaUseCase.ConsultarListaTareasPorIdPropietario(req.params.id);

        if(!tareas.length > 0)
        {
            res.status(404).json({msg: 'El usuario no tiene tareas'});
            res.setHeader('Content-Type', 'text/html');
        }

        res.json(tareas);

    }catch(error)
    {
        console.log(error);
        res.status(500).send(`Error obteniendo las tareas del usuario con idUsuario: ${req.params.id}`);
    }
}

exports.ActualizarTarea = async (req, res) =>
{
    try
    {
        const id = req.params.id;
        const {nombre, prioridad, fechaVencimiento, idPropietario} = req.body;
        let tarea = await TareaUseCase.ConsultarTareaPorId(id);

        if (!tarea)
            res.status(404).json({msg: 'La tarea no existe.'});

        tarea.nombre = nombre;
        tarea.prioridad = prioridad;
        tarea.fechaVencimiento = fechaVencimiento;
        tarea.idPropietario = idPropietario;

        tarea = await TareaUseCase.ActualizarTarea(tarea, id);

        res.json(tarea);

    }catch(error)
    {
        console.log(error);
        res.status(500).send(`Error actualizando la tarea con id: ${id}`);
    }
}

exports.EliminarTarea = async (req, res) => 
{
    try
    {
        let respuestaTarea = await TareaUseCase.ConsultarTareaPorId(req.params.id);

        if (!respuestaTarea)
            res.status(404).json({msg: 'La tarea no existe.'});

        let tareaDelete = await TareaUseCase.EliminarTarea(req.params.id);

        if(tareaDelete)
            res.json({msg: "Tarea eliminada con éxito."});


    }catch(error)
    {
        console.log(error);
        res.status(500).send(`Error eliminando tarea con id: ${req.params.id}`);
    }
}