
        // Referencias a los elementos del DOM
        const nuevoChatBtn = document.getElementById('nuevo-chat-btn');
        const sendBtn = document.getElementById('send-btn2');
        const messageInput = document.getElementById('message-input');
        const chatContainer = document.getElementById('chat-container');
        const modoBtn = document.getElementById('config-btn');
        const modalCont = document.getElementById('modo-modal');
        const closeModal = document.getElementById('closeBtn');
        const lightModeBtn = document.getElementById('light-mode-btn');
        const darkModeBtn = document.getElementById('dark-mode-btn');

        // Cargar el estado del tema al iniciar la página
        function cargarTema() {
            const temaGuardado = localStorage.getItem('tema');
            if (temaGuardado === 'dark') {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
        }

        // Función para enviar el mensaje del usuario
        function enviarMensaje() {
            const mensaje = messageInput.value.trim();

            if (mensaje !== "") {
                agregarMensajeUsuario(mensaje);
                messageInput.value = ''; // Limpiar campo de entrada
                chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll automático

                // Simular la respuesta de la IA después de un breve intervalo
                setTimeout(responderIA, 1000); // Respuesta después de 1 segundo
            }
        }

        // Función para agregar el mensaje del usuario al chat
        function agregarMensajeUsuario(mensaje) {
            const nuevoMensaje = document.createElement('div');
            nuevoMensaje.classList.add('message-box');
            nuevoMensaje.classList.add('usuario');
            nuevoMensaje.textContent = mensaje;
            chatContainer.appendChild(nuevoMensaje);
        }

        // Función para agregar la respuesta simulada de la IA
        function agregarMensajeIA(mensaje) {
            const respuestaIA = document.createElement('div');
            respuestaIA.classList.add('message-box');
            respuestaIA.classList.add('ia');
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
                "Esa es una consulta interesante, aquí está lo que encontré."
            ];

            // Seleccionar una respuesta aleatoria
            const respuestaAleatoria = respuestasIA[Math.floor(Math.random() * respuestasIA.length)];
            agregarMensajeIA(respuestaAleatoria);
        }

        // Permitir enviar el mensaje al hacer clic en el botón "Enviar"
        sendBtn.addEventListener('click', enviarMensaje);

        // Permitir enviar el mensaje al presionar "Enter"
        messageInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                enviarMensaje();
            }
        });

        // Función para limpiar el chat y comenzar uno nuevo
        function iniciarNuevoChat() {
            chatContainer.innerHTML = `<div class="message-box"></div>`;
            messageInput.value = ''; // Limpiar el campo de entrada
            chatContainer.scrollTop = chatContainer.scrollHeight; // Hacer scroll al inicio
        }

        // Asignar la función al botón de "Nuevo Chat"
        nuevoChatBtn.addEventListener('click', iniciarNuevoChat);

        // Abrir el modal al hacer clic en Configuración
        modoBtn.addEventListener('click', () => {
            modalCont.style.display = 'flex';
        });

        // Cerrar el modal
        closeModal.addEventListener('click', () => {
            modalCont.style.display = 'none';
        });

        // Cambiar a modo claro
        lightModeBtn.addEventListener('click', () => {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('tema', 'light'); // Guardar el tema claro
            modalCont.style.display = 'none'; // Cerrar modal
        });

        // Cambiar a modo oscuro
        darkModeBtn.addEventListener('click', () => {
            document.body.classList.add('dark-theme');
            localStorage.setItem('tema', 'dark'); // Guardar el tema oscuro
            modalCont.style.display = 'none'; // Cerrar modal
        });

        // Cerrar el modal si se hace clic fuera de él
        window.addEventListener('click', (e) => {
            if (e.target === modalCont) {
                modalCont.style.display = 'none';
            }
        });

//PARA TRADUCIR
   const placeholders = {
    es: 'Escribe tu pregunta aquí...',
    en: 'Type your question here...'
};

// Función para aplicar el idioma seleccionado a los elementos con la clase "translate"
function applyLanguage(language) {
    // Seleccionar todos los elementos que tengan la clase "translate"
    var elements = document.querySelectorAll('.translate');
    
    elements.forEach(function(element) {
        // Cambiar el contenido según el idioma seleccionado
        element.textContent = element.getAttribute(`data-${language}`);
    });

    // Cambiar el título de la página
    document.title = document.querySelector('title').getAttribute(`data-${language}`);

    // Cambiar el placeholder del campo de entrada
    document.getElementById('message-input').placeholder = placeholders[language];
}

// Detectar el cambio de idioma en el selector
document.getElementById('language-selector').addEventListener('change', function() {
    var language = this.value;

    // Guardar el idioma seleccionado en el localStorage
    localStorage.setItem('selectedLanguage', language);

    // Aplicar el idioma seleccionado
    applyLanguage(language);
});

// Al cargar la página, verificar si hay un idioma seleccionado en localStorage
window.onload = function() {
    var savedLanguage = localStorage.getItem('selectedLanguage') || 'es';  // Por defecto, español (es)
    
    // Establecer el valor del selector al idioma guardado
    document.getElementById('language-selector').value = savedLanguage;
    
    // Aplicar el idioma guardado
    applyLanguage(savedLanguage);
};


//conectar
// Función para enviar la pregunta al backend y obtener la respuesta de la IA
async function enviarPreguntaAlBackend(pregunta) {
    const url = "http://localhost:8001/user/validate"; 

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: pregunta }),
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud al servidor');
        }

        const data = await response.json();
        return data.response;  // La respuesta de la IA
    } catch (error) {
        console.error('Error:', error);
        return 'Hubo un error al obtener la respuesta';
    }
}

// Función para manejar el envío del mensaje del usuario
async function enviarMensaje() {
    const mensaje = messageInput.value.trim();

    if (mensaje !== "") {
        agregarMensajeUsuario(mensaje);
        messageInput.value = '';  // Limpiar campo de entrada
        chatContainer.scrollTop = chatContainer.scrollHeight;  // Scroll automático

        // Enviar la pregunta al backend y obtener la respuesta de la IA
        const respuestaIA = await enviarPreguntaAlBackend(mensaje);
        agregarMensajeIA(respuestaIA);  // Mostrar la respuesta de la IA en el chat
    }
}

// Asignar la función al botón de "Enviar"
sendBtn.addEventListener('click', enviarMensaje);

// Permitir enviar el mensaje al presionar "Enter"
messageInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        enviarMensaje();
    }
});