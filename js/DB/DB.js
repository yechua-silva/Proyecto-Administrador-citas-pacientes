import UI from '../clases/UI.js';
import { ui } from '../funciones.js';

export let DB;

export function crearDB() {
    // Crear DB version 1.0
    const crearDB = window.indexedDB.open('citas', 1);

    // Si hay un error
    crearDB.onerror = () => {
        console.log('Hubo un error');
    };

    // Si todo sale bien
    crearDB.onsuccess = () => {
        console.log('Base de datos creada');

        DB = crearDB.result;

        console.log(DB);

        // Mostrar citas al cargar
        ui.imprimirCitas();
    };

    // Definir schema
    crearDB.onupgradeneeded = function(e) {
        const db = e.target.result;

        const objectStore = db.createObjectStore('citas', {
            keyPath: 'id',
            autoIncrement: true
        });

        // Definir columnas
        objectStore.createIndex('mascota', 'mascota' , { unique: false });
        objectStore.createIndex('propietario', 'propietario' , { unique: false });
        objectStore.createIndex('telefono', 'telefono' , { unique: false });
        objectStore.createIndex('fecha', 'fecha' , { unique: false });
        objectStore.createIndex('hora', 'hora' , { unique: false });
        objectStore.createIndex('sintomas', 'sintomas' , { unique: false });
        objectStore.createIndex('id', 'id' , { unique: true });


        console.log('DB creada..');
    };
}