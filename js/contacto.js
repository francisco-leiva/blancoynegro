// variables formulario
const formulario = document.getElementById("form");
const nombre = document.getElementById("user_name");
const apellido = document.getElementById("user_lastname");
const email = document.getElementById("user_email");
const mensaje = document.getElementById("message");
const btn = document.getElementById('button');


formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    validarCampos();
})

// validación de campos del formulario
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

    if (valorNombre != "" && valorApellido != "" && valorEmail != "" && valorMensaje != "") {
        Swal.fire(
            'Su mensaje ha sido enviado con éxito!',
            'Responderemos a la brevedad!',
            'success'
        );
        
        formulario.reset()
    }
}


// función error, campos vacíos
const errorValidacion = (input, mensaje) => {
    const padre = input.parentElement;
    const parrafo = padre.querySelector("p")
    parrafo.innerText = mensaje;
    input.className = "error";
}

// función campos completos
const validacionCorrecta = (input) => {
    const padre = input.parentElement;
    const parrafo = padre.querySelector("p")
    parrafo.innerText = "";
    input.classList.remove("error");
}