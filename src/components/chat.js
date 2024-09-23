// Referencias a los elementos del DOM
const nuevoChatBtn = document.getElementById("nuevo-chat-btn");
const sendBtn = document.getElementById("send-btn2");
const messageInput = document.getElementById("message-input");
const chatContainer = document.getElementById("chat-container");

// Función para enviar el mensaje del usuario
function enviarMensaje() {
  const mensaje = messageInput.value.trim();

  if (mensaje !== "") {
    agregarMensajeUsuario(mensaje);
    messageInput.value = ""; // Limpiar campo de entrada
    chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll automático

    // Simular la respuesta de la IA después de un breve intervalo
    setTimeout(responderIA, 1000); // Respuesta después de 1 segundo
  }
}

// Función para agregar el mensaje del usuario al chat
function agregarMensajeUsuario(mensaje) {
  const nuevoMensaje = document.createElement("div");
  nuevoMensaje.classList.add("message-box");
  nuevoMensaje.classList.add("usuario");
  nuevoMensaje.textContent = mensaje;
  chatContainer.appendChild(nuevoMensaje);
}

// Función para agregar la respuesta simulada de la IA
function agregarMensajeIA(mensaje) {
  const respuestaIA = document.createElement("div");
  respuestaIA.classList.add("message-box");
  respuestaIA.classList.add("ia");
  respuestaIA.textContent = mensaje;
  chatContainer.appendChild(respuestaIA);
  chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll automático
}

// Función que simula la respuesta de la IA
function responderIA() {
  const respuestasIA = [
    "Claro, déjame buscar la información para ti.",
    "Lo siento, no entendí eso. ¿Podrías reformularlo?",
    "Buena pregunta, déjame pensar un momento.",
    "¿Puedes proporcionar más detalles sobre eso?",
    "Esa es una consulta interesante, aquí está lo que encontré.",
  ];

  // Seleccionar una respuesta aleatoria
  const respuestaAleatoria =
    respuestasIA[Math.floor(Math.random() * respuestasIA.length)];
  agregarMensajeIA(respuestaAleatoria);
}

// Permitir enviar el mensaje al hacer clic en el botón "Enviar"
sendBtn.addEventListener("click", enviarMensaje);

// Permitir enviar el mensaje al presionar "Enter"
messageInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    enviarMensaje();
  }
});

// Función para limpiar el chat y comenzar uno nuevo
function iniciarNuevoChat() {
  chatContainer.innerHTML = `<div class="message-box">Nuevo chat iniciado</div>`;
  messageInput.value = ""; // Limpiar el campo de entrada
  chatContainer.scrollTop = chatContainer.scrollHeight; // Hacer scroll al inicio
}

// Asignar la función al botón de "Nuevo Chat"
nuevoChatBtn.addEventListener("click", iniciarNuevoChat);
