const inquirer = require('inquirer').default;
const Tarea = require('./tarea');

class Tareas {
    _listado = {};

    get listadoArr() {
        return Object.values(this._listado);
    }

    constructor() {
        this._listado = {};
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    async eliminarTarea() {
        const choices = this.listadoArr.map((tarea) => ({
            value: tarea.id,
            name: tarea.desc
        }));

        choices.unshift({
            value: '0',
            name: 'Cancelar'
        });

        const { id } = await inquirer.prompt([
            {
                type: 'list',
                name: 'id',
                message: 'Seleccione la tarea a eliminar:',
                choices
            }
        ]);

        if (id === '0') return; // Si selecciona cancelar, no elimina nada

        delete this._listado[id]; // Elimina la tarea del objeto _listado
        console.log('\nTarea eliminada correctamente.\n');
    }

    listarTareas(estado = null) {
        const tareas = estado === null 
            ? this.listadoArr 
            : this.listadoArr.filter(tarea => (estado ? tarea.completadoEn : !tarea.completadoEn));
        
        console.log(); // Espacio para claridad
        tareas.forEach((tarea, i) => {
            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estadoTarea = completadoEn ? 'Completada'.green : 'Pendiente'.red;

            console.log(`${idx}. ${desc} :: ${estadoTarea}`);
        });
    }
}

module.exports = Tareas;