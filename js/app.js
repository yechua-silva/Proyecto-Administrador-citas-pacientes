import App from './clases/App.js'
import { crearDB } from './DB/DB.js'

const app = new App()

// Crear DB
window.onload = () => {
    console.log('Documento listo ');

    crearDB();
}