const Tarea = require("../models/Tareas");

exports.CrearTarea = async (tareaRequest) => 
{
    let tarea = new Tarea(tareaRequest); 

    await tarea.save();

    return tarea;
}

exports.ConsultarTareaPorId = async (idTarea) =>
{
    let consultarTarea = await Tarea.findById(idTarea);

    if(!consultarTarea)
    {
        return 0;
    }

    return consultarTarea;
}

exports.ConsultarListaTareasPorIdPropietario = async (idTarea) =>
{
    let tareas = await Tarea.find({ idPropietario: idTarea});

    if(tareas.length == 0)
    {
        return 0;
    }

    return tareas;
}

exports.ActualizarTarea = async (tareaRequest, id) =>
{
    let tarea = await Tarea.findOneAndUpdate({ _id: id }, tareaRequest, { new: true});

    return tarea;
}

exports.EliminarTarea = async (idTarea) => 
{
    await Tarea.findOneAndDelete({ _id: idTarea });

    return 1;
}