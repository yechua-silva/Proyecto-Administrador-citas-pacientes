// Campos del formulario
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

// UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

class Citas {
    constructor() {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita]

        console.log(this.citas);
    }


}

class UI {
    imprimirAlerta(mensaje, tipo) {
        // Crear el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        // Agregar clase en base al tipo de error
        if(tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        }else {
            divMensaje.classList.add('alert-success');
        }

        // Mensaje de error
        divMensaje.textContent = mensaje;

        // Agregar al HTML
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        // Quitar alerta después de 3 segundos
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }
}

// Instanciar
const ui = new UI();
const administrarCitas = new Citas();

// Registrar eventos
eventListener();
function eventListener() {
    mascotaInput.addEventListener('input', datosCitas); // evento change: Cuando el elemento pierde el foco después de cambiar su valor: para elementos en los que la interacción del usuario es escribir en lugar de seleccionar
    propietarioInput.addEventListener('input',datosCitas);
    telefonoInput.addEventListener('input',datosCitas);
    fechaInput.addEventListener('input',datosCitas);
    horaInput.addEventListener('input',datosCitas);
    sintomasInput.addEventListener('input',datosCitas);

    formulario.addEventListener('submit', nuevaCita);
}

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
function datosCitas(e) {
    citasObj[e.target.name] = e.target.value; // Los name de los inputs
    //citasObj.mascota = e.target.value = citasObj[e.target.name] = e.target.value; pero no sera necesario hacerlo con todos los input, ya que e.target.name es dinámico, toma el name

}

// Valida y agrega una nueva cita a la clase
function nuevaCita(e) {
    e.preventDefault();

    // Extraer información del objeto de cita
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citasObj;

    // Validar
    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return
    }

    // General un id único
    citasObj.id = Date.now();

    // Creando una nueva cita
    administrarCitas.agregarCita({...citasObj}) // Crea un copia

    // Reiniciar objeto para la validación
    reiniciarObjeto();

    // Reiniciar formulario
    formulario.reset();

    // Mostrar el HTML de las citas
}

function reiniciarObjeto() {
    citasObj.mascota = '';
    citasObj.propietario = '';
    citasObj.telefono = '';
    citasObj.fecha = '';
    citasObj.hora = '';
    citasObj.sintomas = '';
}