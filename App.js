const { menu, pause, leerInput } = require('./helpers/menu'); 
const Tareas = require('./models/tareas'); 

const principal = async () => {

    let opt = '';
    const tareas = new Tareas();

    do {
        opt = await menu();

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
                break;

            case '2':
                console.log(tareas.listadoArr);
                break;

            case '6':
                await tareas.eliminarTarea(); 
                break;

            default:
                break;
        }

        await pause(); 

    } while (opt !== '0');

}

principal();