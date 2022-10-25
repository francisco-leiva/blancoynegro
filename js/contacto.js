const formulario = document.getElementById("form");
const nombre = document.getElementById("inputNombre");
const apellido = document.getElementById("inputApellido");
const email = document.getElementById("inputEmail");
const mensaje = document.getElementById("inputMensaje");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    validarCampos();
})

const validarCampos = () => {
    const valorNombre = nombre.value.trim();
    const valorApellido = apellido.value.trim();
    const valorEmail = email.value.trim();
    const valorMensaje = mensaje.value.trim();

    // Validar campo nombre
    if (valorNombre == "") {
        errorValidacion(nombre, "*Campo incompleto");
    } else {
        validacionCorrecta(nombre);
    }

    // Validar campo apellido
    if (valorApellido == "") {
        errorValidacion(apellido, "*Campo incompleto");
    } else {
        validacionCorrecta(apellido);
    }

    // Validar campo email
    if (valorEmail == "") {
        errorValidacion(email, "*Campo incompleto");
    } else {
        validacionCorrecta(email);
    }

    // Validar campo mensaje
    if (valorMensaje == "") {
        errorValidacion(mensaje, "*Campo incompleto");
    } else {
        validacionCorrecta(mensaje);
    }
}


const errorValidacion = (input, mensaje) => {
    const padre = input.parentElement;
    const parrafo = padre.querySelector("p")
    parrafo.innerText = mensaje;
    input.className = "error";
}

const validacionCorrecta = (input) => {
    const padre = input.parentElement;
    const parrafo = padre.querySelector("p")
    parrafo.innerText = "";
    input.classList.remove("error");
}