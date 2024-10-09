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
    const temaGuardado = localStorage.getItem('tema') || 'dark';  // Predeterminado a 'dark'
    if (temaGuardado === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
}

// Función para enviar el mensaje del usuario
async function enviarMensaje() {
    const mensaje = messageInput.value.trim();

    if (mensaje !== "") {
        agregarMensajeUsuario(mensaje);
        messageInput.value = ''; // Limpiar campo de entrada
        chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll automático

        // Enviar la pregunta al backend y obtener la respuesta de la IA
        const respuestaIA = await enviarPreguntaAlBackend(mensaje);
        agregarMensajeIA(respuestaIA); // Mostrar la respuesta de la IA en el chat
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
    chatContainer.innerHTML = `<div class="message-box">Nuevo chat iniciado</div>`;
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

// Al cargar la página, aplicar el tema predeterminado (oscuro)
window.onload = function() {
    cargarTema();  // Aplicar el tema según lo guardado o por defecto en oscuro
};

// PARA TRADUCIR
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

    // Aplicar el tema guardado o predeterminado (oscuro)
    cargarTema();
};


// VETANA DE DOCUMENTO

document.addEventListener('DOMContentLoaded', function() {
    const openModalBtn = document.getElementById('send-btn');  // Botón para abrir la ventana modal
    const modalContainer = document.getElementById('modal_container');  // Contenedor del modal
    const closeModalBtn = document.querySelector('.close-button');  // Botón para cerrar la ventana modal

    // Mostrar la ventana emergente al hacer clic en el botón
    openModalBtn.addEventListener('click', function() {
        modalContainer.classList.add('show');  // Agregar la clase que muestra el modal
    });

    // Ocultar la ventana emergente al hacer clic en el botón de cierre
    closeModalBtn.addEventListener('click', function() {
        modalContainer.classList.remove('show');  // Remover la clase para ocultar el modal
    });

    // También ocultar la ventana emergente si se hace clic fuera de la ventana modal
    modalContainer.addEventListener('click', function(e) {
        if (e.target === modalContainer) {
            modalContainer.classList.remove('show');  // Remover la clase para ocultar el modal
        }
    });
    
});


//respuesta IA
// Función para enviar la pregunta al backend y obtener la respuesta de la IA
async function enviarPreguntaAlBackend(pregunta) {
    const url = "http://localhost:8001/generate-answer/"; 

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: pregunta }),  // Enviar la pregunta en formato JSON
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud al servidor');
        }

        const data = await response.json();
        return data.answer;  // Retorna la respuesta generada por la IA
    } catch (error) {
        console.error('Error:', error);
        return 'Hubo un error al obtener la respuesta';
    }
}

// Función para enviar el mensaje del usuario
async function enviarMensaje() {
    const mensaje = messageInput.value.trim();

    if (mensaje !== "") {
        agregarMensajeUsuario(mensaje);  
        messageInput.value = ''; 
        chatContainer.scrollTop = chatContainer.scrollHeight;  // Scroll automático al final

        // Enviar la pregunta al backend y obtener la respuesta de la IA
        const respuestaIA = await enviarPreguntaAlBackend(mensaje);
        agregarMensajeIA(respuestaIA);  // Mostrar la respuesta de la IA en el chat
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

// Función para agregar la respuesta de la IA al chat
function agregarMensajeIA(mensaje) {
    const respuestaIA = document.createElement('div');
    respuestaIA.classList.add('message-box');
    respuestaIA.classList.add('ia');
    respuestaIA.textContent = mensaje;
    chatContainer.appendChild(respuestaIA);
    chatContainer.scrollTop = chatContainer.scrollHeight;  // Scroll automático al final
}

// Permitir enviar el mensaje al hacer clic en el botón "Enviar"
sendBtn.addEventListener('click', enviarMensaje);

// Permitir enviar el mensaje al presionar "Enter"
messageInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        enviarMensaje();
    }
});


//PARA DOCUMENTOS
//Subir un archivo (documento)
document.addEventListener('DOMContentLoaded', function () {
    const chatBox = document.getElementById('chat-box');
    const messageInput = document.getElementById('message-input');
    const fileInput = document.getElementById('port-doc');  // Asegúrate de usar el ID correcto del input de archivo
    const sendBtn = document.getElementById('send-btn');
    const uploadMessage = document.getElementById('uploadMessage');
    const portfolioDisplay = document.getElementById('portfolioDisplay');
    let fileToSend = null; // Para almacenar el archivo arrastrado

    // Evento de "drag and drop" para detectar cuando se arrastra un archivo al área de chat
    chatBox.addEventListener('dragover', (event) => {
        event.preventDefault(); // Evitar que el navegador abra el archivo
        chatBox.style.border = '2px dashed #000'; // Mostrar borde para indicar que es un área de drop
    });

    chatBox.addEventListener('dragleave', () => {
        chatBox.style.border = ''; // Quitar el estilo del borde cuando se deja de arrastrar
    });

    chatBox.addEventListener('drop', (event) => {
        event.preventDefault();
        chatBox.style.border = ''; // Quitar el borde

        // Obtener el archivo arrastrado
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            fileToSend = files[0];
            messageInput.value = `Archivo listo para enviar: ${fileToSend.name}`; // Mostrar el nombre del archivo en el input de texto
        }
    });

    // Evento para enviar el archivo cuando se presiona "Enter" o se hace clic en el botón
    sendBtn.addEventListener('click', async () => {
        if (fileToSend) {
            await sendFile(fileToSend); // Llamar a la función que envía el archivo al servidor
            fileToSend = null; // Reiniciar el archivo después de enviarlo
            messageInput.value = ''; // Limpiar el input de mensaje
        } else {
            console.log('No hay archivo para enviar');
        }
    });

    messageInput.addEventListener('keypress', async (event) => {
        if (event.key === 'Enter' && fileToSend) {
            await sendFile(fileToSend); // Llamar a la función que envía el archivo al servidor
            fileToSend = null; // Reiniciar el archivo después de enviarlo
            messageInput.value = ''; // Limpiar el input de mensaje
        }
    });

    // Función para subir el archivo al servidor
    const sendFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:8001/save-document', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error al subir el archivo');
            }

            const result = await response.json();
            
            // Mostrar un mensaje de éxito o error
            if (result.message === "Documento guardado exitosamente.") {
                uploadMessage.textContent = `Archivo "${file.name}" subido con éxito.`;
                displayUploadedFile(file.name);
            } else {
                uploadMessage.textContent = `Error al subir el archivo "${file.name}".`;
            }
        } catch (error) {
            console.error('Error al subir el archivo:', error);
            uploadMessage.textContent = `Error al subir el archivo: ${error.message}`;
        }
    };

    // Función para mostrar el archivo subido en la interfaz
    const displayUploadedFile = (fileName) => {
        const fileElement = document.createElement('p');
        fileElement.textContent = `Archivo subido: ${fileName}`;
        portfolioDisplay.appendChild(fileElement); // Añadir el archivo subido a la lista
    };
});

