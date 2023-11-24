// form variables
const form = document.getElementById('form')
const formName = document.getElementById('user_name')
const formLastName = document.getElementById('user_lastname')
const formEmail = document.getElementById('user_email')
const formMessage = document.getElementById('message')
const btn = document.getElementById('button')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  validateFields()
})

// validate form fields
function validateFields() {
  const name = formName.value.trim()
  const lastName = formLastName.value.trim()
  const email = formEmail.value.trim()
  const message = formMessage.value.trim()

  // validate name
  name == '' ? error(formName) : success(formName)

  // validate last name
  lastName == '' ? error(formLastName) : success(formLastName)

  // validate email
  email == '' ? error(formEmail) : success(formEmail)

  // validate message
  message == '' ? error(formMessage) : success(formMessage)

  if (name && lastName && email && message) {
    Swal.fire(
      'Su mensaje ha sido enviado con éxito!',
      'Responderemos a la brevedad!',
      'success'
    )

    form.reset()
  }
}

// error function
function error(input) {
  const parent = input.parentElement
  const paragraph = parent.querySelector('p')
  paragraph.innerText = '*Campo incompleto'
  input.className = 'error'
}

// success function
function success(input) {
  const parent = input.parentElement
  const paragraph = parent.querySelector('p')
  paragraph.innerText = ''
  input.classList.remove('error')
}
