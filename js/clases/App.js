import { datosCitas, nuevaCita } from '../funciones.js'
import {
    mascotaInput,
    propietarioInput,
    telefonoInput,
    fechaInput,
    horaInput,
    sintomasInput,
    formulario
} from '../selectores.js'

class App {
    constructor() {
        this.initApp();
    }

    initApp() {
        mascotaInput.addEventListener('input', datosCitas); // evento change: Cuando el elemento pierde el foco después de cambiar su valor: para elementos en los que la interacción del usuario es escribir en lugar de seleccionar
        propietarioInput.addEventListener('input',datosCitas);
        telefonoInput.addEventListener('input',datosCitas);
        fechaInput.addEventListener('input',datosCitas);
        horaInput.addEventListener('input',datosCitas);
        sintomasInput.addEventListener('input',datosCitas);

        // Formulario para nuevas citas
        formulario.addEventListener('submit', nuevaCita);
    }
}

export default App;