const juegos = [
  {
    nombre: "Horizonte Perdido",
    categoria: "aventura",
    categoriaNombre: "Aventura",
    descripcion: "Una expedición por ruinas antiguas donde cada decisión cambia el camino.",
    plataformas: "PC, PlayStation 5",
    precio: "$149.900 COP",
    imagen: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80",
    alt: "Control retro sobre una consola de videojuegos"
  },
  {
    nombre: "Neon Circuit",
    categoria: "accion",
    categoriaNombre: "Acción",
    descripcion: "Compite a toda velocidad en una ciudad futurista llena de desafíos.",
    plataformas: "PC, Xbox Series",
    precio: "$119.900 COP",
    imagen: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
    alt: "Persona jugando videojuegos frente a una pantalla"
  },
  {
    nombre: "Reinos de Ceniza",
    categoria: "rol",
    categoriaNombre: "Rol",
    descripcion: "Forma tu equipo, explora un reino en guerra y decide su futuro.",
    plataformas: "PC, Nintendo Switch",
    precio: "$169.900 COP",
    imagen: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=900&q=80",
    alt: "Escritorio con monitor y accesorios para videojuegos"
  }
];

const catalogo = document.querySelector("#catalogo-grid");
const videojuegoSelect = document.querySelector("#videojuego");

function crearTarjeta(juego) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "game-card";
  tarjeta.innerHTML = `
    <img src="${juego.imagen}" alt="${juego.alt}" loading="lazy">
    <div class="game-card-content">
      <p class="game-category">${juego.categoriaNombre}</p>
      <h3>${juego.nombre}</h3>
      <p>${juego.descripcion}</p>
      <p>Plataformas: ${juego.plataformas}</p>
      <p class="game-price">${juego.precio}</p>
      <a href="#contacto">Solicitar información</a>
    </div>
  `;
  return tarjeta;
}

function mostrarJuegos() {
  juegos.forEach((juego) => {
    catalogo.append(crearTarjeta(juego));
  });
}

function cargarOpcionesFormulario() {
  juegos.forEach((juego) => {
    const opcion = document.createElement("option");
    opcion.value = juego.nombre;
    opcion.textContent = juego.nombre;
    videojuegoSelect.append(opcion);
  });
}

const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu-principal");

menuToggle.addEventListener("click", () => {
  const abierto = menu.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(abierto));
});

menu.addEventListener("click", () => {
  menu.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
});

const formulario = document.querySelector("form");

function mostrarError(campo, mensaje) {
  const entrada = document.querySelector(`#${campo}`);
  const error = document.querySelector(`#${campo}-error`);
  entrada.setAttribute("aria-invalid", String(Boolean(mensaje)));
  error.textContent = mensaje;
  return !mensaje;
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const nombre = document.querySelector("#nombre");
  const correo = document.querySelector("#correo");
  const videojuego = document.querySelector("#videojuego");
  const mensaje = document.querySelector("#mensaje");
  let formularioValido = true;

  formularioValido = mostrarError("nombre", nombre.value.trim().length < 2 ? "Escribe tu nombre completo." : "") && formularioValido;
    formularioValido = mostrarError("correo", !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value.trim()) ? "Escribe un correo válido." : "") && formularioValido;
  formularioValido = mostrarError("videojuego", videojuego.value === "" ? "Selecciona un videojuego." : "") && formularioValido;
  formularioValido = mostrarError("mensaje", mensaje.value.trim().length < 10 ? "Escribe al menos 10 caracteres." : "") && formularioValido;

  const estado = document.querySelector("#form-status");
  if (formularioValido) {
    estado.textContent = "Tu consulta está lista para ser enviada.";
    estado.className = "form-status is-success";
    formulario.reset();
    nombre.removeAttribute("aria-invalid");
    correo.removeAttribute("aria-invalid");
    videojuego.removeAttribute("aria-invalid");
    mensaje.removeAttribute("aria-invalid");
  } else {
    estado.textContent = "Revisa los campos marcados antes de enviar.";
    estado.className = "form-status is-error";
  }
});

mostrarJuegos();
cargarOpcionesFormulario();