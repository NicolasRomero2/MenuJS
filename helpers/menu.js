var colors = require('colors');
const inquirer = require('inquirer');

const questions = {
    type: 'list',
    name: 'options',
    message: 'Escoje la acción a realizar',
    choices: [
        {
            value: '1',
            name: '1. Crear tarea'
        },
        {
            value: '2',
            name: '2. Listar las tareas'
        },
        {
            value: '3',
            name: '3. Listar tareas completas'
        },
        {
            value: '4',
            name: '4. Listar tareas pendientes'
        },
        {
            value: '5',
            name: '5. Completar tarea(s)'
        },
        {
            value: '6',
            name: '6. Eliminar tarea'
        },
        {
            value: '0',
            name: '0. Salir'
        }
    ]
};

const menu = async () => {
    console.clear();
    console.log(`${'||||||||||||||||||||||||||||||||||||||||||||||'}`);
    console.log(`${'|             Bienvenido al Menú             |'}`);
    console.log(`${'||||||||||||||||||||||||||||||||||||||||||||||'}`);

    const { options } = await inquirer.default.prompt(questions);
    return options;
};

const pause = async () => {
    const questions = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione la tecla ${'ENTER'.green} para continuar`
        }
    ];
    console.log('\n');
    await inquirer.default.prompt(questions);
};

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.default.prompt(question);
    return desc;
};

module.exports = {
    menu,
    pause, 
    leerInput
};
