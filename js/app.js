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

let editando;

class Citas {
    constructor() {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita]

        console.log(this.citas);
    }

    eliminarCita(id) {
        this.citas = this.citas.filter(cita => cita.id !== id); // Trae todas las diferentes
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

    imprimirCitas({citas}) { // Se puede aplicar destructuring desde el parámetro
        // LImpiar HTML
        this.limpiarHTML();

        citas.forEach( cita => {
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            // Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder">Propietario: </span> ${propietario}
            `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder">Teléfono: </span> ${telefono}
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder">Fecha: </span> ${fecha}
            `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder">Hora: </span> ${hora}
            `;
            
            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder">Síntomas: </span> ${sintomas}
            `;

            // Botón para eliminar cita
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            `
            btnEliminar.onclick = () => eliminarCita(id);

            // Botón para editar cita
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            `;

            btnEditar.onclick = () => cargarEdicion(cita);

            // Agregar los parrafos al divCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);

            // Agregar botón al div
            divCita.appendChild(btnEliminar);

            // Agregar botón de editar
            divCita.appendChild(btnEditar);

            // Agregar las citas al HTML
            contenedorCitas.appendChild(divCita);
        } ) 
    }

    limpiarHTML() {
        while(contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
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

    // Comprobar modo edicion
    if (editando) {
        console.log('Editando');
        ui.imprimirAlerta('Editado correctamente')

        // Pasar el objeto de al cita a edicion


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

function reiniciarObjeto() {
    citasObj.mascota = '';
    citasObj.propietario = '';
    citasObj.telefono = '';
    citasObj.fecha = '';
    citasObj.hora = '';
    citasObj.sintomas = '';
}

function eliminarCita(id) {
    // Eliminar la cita
    administrarCitas.eliminarCita(id)

    // Muestre un mensaje
    ui.imprimirAlerta('La cita se elimino correctamente')

    // Refrescar las citas
    ui.imprimirCitas(administrarCitas)
}

// Carga los datos y el modo edicion
function cargarEdicion(cita) {
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