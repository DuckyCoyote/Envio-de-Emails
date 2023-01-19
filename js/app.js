const formulario = document.querySelector('#formulario');
const inputEmail = document.querySelector('#email');
const inputAsunto = document.querySelector('#asunto');
const inputMensaje = document.querySelector('#mensaje');
const btnSubmit = document.querySelector('#botones button[type="submit"]');
const btnReset = document.querySelector('#botones button[type="reset"]');
const spinner = document.querySelector('#spinner')

document.addEventListener('DOMContentLoaded', () => {
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    btnSubmit.addEventListener('click', enviarEmail);
    btnReset.addEventListener('reset', resetForm);
});

const email = {
    email: "",
    asunto: "",
    mensaje: ""
}

function enviarEmail(e) {
    e.preventDefault();
    spinner.classList.remove('hidden');
    
    setTimeout(() => {
        spinner.classList.add('hidden');
        
        resetForm();

        const mensajeExito = document.createElement('p');
        mensajeExito.textContent = 'Email Enviado';
        mensajeExito.classList.add('bg-green-500', 'text-white', 'text-center', 'p-3', 'font-bold', 'uppercase')
        formulario.insertBefore(mensajeExito, formulario.firstChild);

        btnSubmit.classList.add('opacity-50');
        btnSubmit.disabled = true;
        setTimeout(() => {
            mensajeExito.remove();
        }, 3000);

    }, 3000);
}

function validar(e) {
    if (e.target.value.trim() === '') {
        mostrarAlerta(`El campo ${e.target.id} no puede ser vacio`, e.target.id);
        console.log(e.target.id)
        email[e.target.id] = '';
        comprobarEmail();
        return;
    }
    if (e.target.id === 'email' && !validarEmail(e.target.value)) {
        mostrarAlerta('Email no valido', e.target.id);
        email[e.target.name] = '';
        comprobarEmail();
        return;
    }

    limpiarAlerta();
    email[e.target.id] = e.target.value.trim().toLowerCase();

    comprobarEmail();
}

function validarEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const resultado = re.test(email);
    return resultado;
}

function comprobarEmail() {
    if (Object.values(email).includes('')) {
        btnSubmit.classList.add('opacity-50');
        btnSubmit.disabled = true;
        return;
    }
    btnSubmit.classList.remove('opacity-50');
    btnSubmit.disabled = false;
}

function mostrarAlerta(mensaje, referencia) {
    limpiarAlerta(referencia);
    console.log(referencia)
    const error = document.createElement('P');
    error.classList.add('bg-red-600', 'text-white', 'font-sm', 'text-center', 'p-3', 'uppercase', referencia)
    error.textContent = mensaje;
    formulario.insertBefore(error, formulario.firstChild);
}

function resetForm() {
    formulario.reset();
}

function limpiarAlerta() {
    const alerta = formulario.querySelector('.bg-red-600');
    if (alerta) {
        alerta.remove();
    }
}