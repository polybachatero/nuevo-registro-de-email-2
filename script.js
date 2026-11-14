const formulario = document.getElementById("formulario-registro");
const nombreInput = document.getElementById("nombre");
const apellidoInput = document.getElementById("apellido");
const edadInput = document.getElementById("edad");
const fechaNacimientoInput = document.getElementById("fecha-nacimiento");
const generoInput = document.getElementById("genero");
const estadoCivilInput = document.getElementById("estado-civil");
const domicilioInput = document.getElementById("domicilio");
const localidadInput = document.getElementById("localidad");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmacionInput = document.getElementById("confirmacion");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const camposRegistro = [
  nombreInput,
  apellidoInput,
  edadInput,
  fechaNacimientoInput,
  generoInput,
  estadoCivilInput,
  domicilioInput,
  localidadInput,
  emailInput,
  passwordInput,
  confirmacionInput,
];

const validarDatos = () => {
  if (!formulario || camposRegistro.some((campo) => !campo)) {
    alert("Faltan campos obligatorios en el formulario.");
    return false;
  }

  if (!formulario.reportValidity()) {
    return false;
  }

  const campoVacio = [nombreInput, apellidoInput, domicilioInput, localidadInput]
    .find((campo) => !campo.value.trim());

  if (campoVacio) {
    alert("Complete todos los campos obligatorios.");
    campoVacio.focus();
    return false;
  }

  if (!emailRegex.test(emailInput.value.trim())) {
    alert("Ingrese un email válido.");
    emailInput.focus();
    return false;
  }

  if (confirmacionInput.value !== passwordInput.value) {
    alert("Las contraseñas no coinciden.");
    confirmacionInput.focus();
    return false;
  }

  return true;
};

const registrarUsuario = (event) => {
  event.preventDefault();

  if (!validarDatos()) {
    return;
  }

  const email = emailInput.value.trim();
  const registro = {
    nombre: nombreInput.value.trim(),
    apellido: apellidoInput.value.trim(),
    edad: Number(edadInput.value),
    fechaNacimiento: fechaNacimientoInput.value,
    genero: generoInput.value,
    estadoCivil: estadoCivilInput.value,
    domicilio: domicilioInput.value.trim(),
    localidad: localidadInput.value.trim(),
    email,
  };

  localStorage.setItem("registroUsuario", JSON.stringify(registro));
  localStorage.setItem("emailRegistrado", email);
  window.location.href = "bienvenida.html";
};

const mostrarBienvenida = () => {
  const emailRegistrado = localStorage.getItem("emailRegistrado");
  const mensaje = document.querySelector(".mensaje-bienvenida");

  if (mensaje) {
    const nombreUsuario = emailRegistrado ? emailRegistrado.split("@")[0] : "usuario";
    mensaje.textContent = `¡Bienvenid@, ${nombreUsuario}!`;
  }
};

const salir = () => {
  localStorage.removeItem("registroUsuario");
  localStorage.removeItem("emailRegistrado");
  window.location.href = "index.html";
};

if (formulario) {
  formulario.addEventListener("submit", registrarUsuario);
}

if (document.body.classList.contains("pagina-bienvenida")) {
  mostrarBienvenida();

  const botonSalir = document.getElementById("boton-salir");

  if (botonSalir) {
    botonSalir.addEventListener("click", salir);
  }
}
