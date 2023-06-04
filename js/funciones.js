//Importar clases
import Citas from './clases/Citas.js';
import UI from './clases/UI.js';

// Importar selectores
import { 
    mascotaInput,
    propietarioInput, 
    telefonoInput, 
    fechaInput, 
    horaInput, 
    sintomasInput, 
    formulario 
} from './selectores.js'

// Instanciar
const ui = new UI();
const administrarCitas = new Citas();

let editando;

// Objeto con la información de la cita
const citasObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

// Agrega datos al objeto de citas
export function datosCitas(e) {
    citasObj[e.target.name] = e.target.value; // Los name de los inputs
    //citasObj.mascota = e.target.value = citasObj[e.target.name] = e.target.value; pero no sera necesario hacerlo con todos los input, ya que e.target.name es dinámico, toma el name
}

// Valida y agrega una nueva cita a la clase
export function nuevaCita(e) {
    e.preventDefault();

    // Extraer información del objeto de cita
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citasObj;

    // Validar
    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return
    }

    // Comprobar modo edicion
    if (editando) {
        console.log('Editando');
        ui.imprimirAlerta('Editado correctamente')

        // Pasar el objeto de al cita a edicion
        administrarCitas.editarCita({...citasObj}) // Le pasamos un copia

        // Cambiar texto del botón
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita'

        // Deshabilitar el modo edicion
        editando = false;

    } else { // Cuando se crea la cita
        console.log('Nueva cita');
        // General un id único
        citasObj.id = Date.now();

        // Creando una nueva cita
        administrarCitas.agregarCita({...citasObj}) // Crea un copia

        // Mensaje de agregado correctamente
        ui.imprimirAlerta('Se agrego correctamente');
    }



    // Reiniciar objeto para la validación
    reiniciarObjeto();

    // Reiniciar formulario
    formulario.reset();

    // Mostrar el HTML de las citas
    ui.imprimirCitas(administrarCitas);
}

export function reiniciarObjeto() {
    citasObj.mascota = '';
    citasObj.propietario = '';
    citasObj.telefono = '';
    citasObj.fecha = '';
    citasObj.hora = '';
    citasObj.sintomas = '';
}

export function eliminarCita(id) {
    // Eliminar la cita
    administrarCitas.eliminarCita(id)

    // Muestre un mensaje
    ui.imprimirAlerta('La cita se elimino correctamente')

    // Refrescar las citas
    ui.imprimirCitas(administrarCitas)
}

// Carga los datos y el modo edicion
export function cargarEdicion(cita) {
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

    // Llenar los input
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    // Llenar el objeto
    citasObj.mascota = mascota;
    citasObj.propietario = propietario;
    citasObj.telefono = telefono;
    citasObj.fecha = fecha;
    citasObj.hora = hora;
    citasObj.sintomas = sintomas;
    citasObj.id = id;

    // Modificar el texto del botón
    formulario.querySelector('button[type=submit]').textContent = 'Guardar cambios';

    editando = true;
}