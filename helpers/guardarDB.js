const fs = require('fs');
const path = require('path');

const archivo = path.join(__dirname, '../db/tareas.json');

const guardarDB = (data) => {
    const dir = path.dirname(archivo);

    // Crear la carpeta si no existe
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(archivo, JSON.stringify(data, null, 2), 'utf8');
};

module.exports = { guardarDB };