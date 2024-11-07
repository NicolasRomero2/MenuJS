const inquirer = require('inquirer'); 
const Tarea = require('../models/tarea'); 

class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    async eliminarTarea() {
        const listadoArr = this.listadoArr;
        
        if (listadoArr.length === 0) {
            console.log('No hay tareas para eliminar'.red);
            return;
        }

        const { index } = await inquirer.default.prompt([
            {
                type: 'list',
                name: 'index',
                message: 'Seleccione la tarea a eliminar:',
                choices: listadoArr.map((tarea, i) => ({
                    value: i,
                    name: `${(i + 1).toString().green}. ${tarea.desc}` 
                }))
            }
        ]);

        const tareaEliminada = this._listado[listadoArr[index].id];
        delete this._listado[listadoArr[index].id]; 
        console.log(`Tarea eliminada: ${tareaEliminada.desc}`.red);
        await pause(); 
    }

}

module.exports = Tareas;