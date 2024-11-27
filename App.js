const { menu, pause, leerInput } = require('./helpers/menu'); // Importación correcta
const Tareas = require('./models/tareas');
const { guardarDB } = require('./helpers/guardarDB');

const principal = async () => {
    let opt = '';
    const tareas = new Tareas();

    do {
        opt = await menu();

        switch (opt) {
            case '1': // Crear tarea
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
                guardarDB(tareas.listadoArr);
                break;

            case '2': // Listar todas las tareas
                tareas.listarTareas();
                break;

            case '3': // Listar tareas completas
                tareas.listarTareas(true);
                break;

            case '4': // Listar tareas pendientes
                tareas.listarTareas(false);
                break;

            case '5': // Completar tareas
                await tareas.completarTareas();
                guardarDB(tareas.listadoArr);
                break;

            case '6': // Eliminar tarea
                await tareas.eliminarTarea();
                guardarDB(tareas.listadoArr);
                break;

            default:
                break;
        }

        await pause();
    } while (opt !== '0');
};

principal();