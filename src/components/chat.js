// Referencias a los elementos del DOM
const nuevoChatBtn = document.getElementById("nuevo-chat-btn");
const sendBtn = document.getElementById("send-btn2");
const messageInput = document.getElementById("message-input");
const chatContainer = document.getElementById("chat-container");
const modoBtn = document.getElementById("config-btn");
const modalCont = document.getElementById("modo-modal");
const closeModal = document.getElementById("closeBtn");
const lightModeBtn = document.getElementById("light-mode-btn");
const darkModeBtn = document.getElementById("dark-mode-btn");

// Cargar el estado del tema al iniciar la página
function cargarTema() {
  const temaGuardado = localStorage.getItem("tema") || "dark"; // Predeterminado a 'dark'
  if (temaGuardado === "dark") {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }
}

// Función para enviar el mensaje del usuario
async function enviarMensaje() {
  const mensaje = messageInput.value.trim();

  if (mensaje !== "") {
    agregarMensajeUsuario(mensaje);
    messageInput.value = ""; // Limpiar campo de entrada
    chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll automático

    // Enviar la pregunta al backend y obtener la respuesta de la IA
    const respuestaIA = await enviarPreguntaAlBackend(mensaje);
    agregarMensajeIA(respuestaIA); // Mostrar la respuesta de la IA en el chat
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

// Función para agregar la respuesta de la IA
function agregarMensajeIA(mensaje) {
  const respuestaIA = document.createElement("div");
  respuestaIA.classList.add("message-box");
  respuestaIA.classList.add("ia");
  chatContainer.appendChild(respuestaIA);

  let i = 0;

  function typeWriter() {
    if (i < mensaje.length) {
      respuestaIA.textContent += mensaje.charAt(i);
      i++;
      setTimeout(typeWriter, 25); // Controla la velocidad de escritura ajustando el valor (en milisegundos)
    }
  }

  typeWriter(); // Inicia la animación de máquina de escribir
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Función para limpiar el chat y comenzar uno nuevo
function iniciarNuevoChat() {
  chatContainer.innerHTML = `<div class="message-box">Nuevo chat iniciado</div>`;
  messageInput.value = ""; // Limpiar el campo de entrada
  chatContainer.scrollTop = chatContainer.scrollHeight; // Hacer scroll al inicio
}

// Asignar la función al botón de "Nuevo Chat"
nuevoChatBtn.addEventListener("click", iniciarNuevoChat);

// Abrir el modal al hacer clic en Configuración
modoBtn.addEventListener("click", () => {
  modalCont.style.display = "flex";
});

// Cerrar el modal
closeModal.addEventListener("click", () => {
  modalCont.style.display = "none";
});

// Cambiar a modo claro
lightModeBtn.addEventListener("click", () => {
  document.body.classList.remove("dark-theme");
  localStorage.setItem("tema", "light"); // Guardar el tema claro
  modalCont.style.display = "none"; // Cerrar modal
});

// Cambiar a modo oscuro
darkModeBtn.addEventListener("click", () => {
  document.body.classList.add("dark-theme");
  localStorage.setItem("tema", "dark"); // Guardar el tema oscuro
  modalCont.style.display = "none"; // Cerrar modal
});

// Cerrar el modal si se hace clic fuera de él
window.addEventListener("click", (e) => {
  if (e.target === modalCont) {
    modalCont.style.display = "none";
  }
});

// PARA TRADUCIR
const placeholders = {
  es: "Escribe tu pregunta aquí...",
  en: "Type your question here...",
};

// Función para aplicar el idioma seleccionado a los elementos con la clase "translate"
function applyLanguage(language) {
  var elements = document.querySelectorAll(".translate");

  elements.forEach(function (element) {
    element.textContent = element.getAttribute(`data-${language}`);
  });

  document.title = document
    .querySelector("title")
    .getAttribute(`data-${language}`);

  document.getElementById("message-input").placeholder = placeholders[language];
}

// Detectar el cambio de idioma en el selector
document
  .getElementById("language-selector")
  .addEventListener("change", function () {
    var language = this.value;
    localStorage.setItem("selectedLanguage", language);
    applyLanguage(language);
  });

// Función para enviar la pregunta al backend y obtener la respuesta de la IA
async function enviarPreguntaAlBackend(pregunta) {
  const url = "http://localhost:8001/generate-answer/";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: pregunta }),
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud al servidor");
    }

    const data = await response.json();
    return data.answer;
  } catch (error) {
    console.error("Error:", error);
    return "Hubo un error al obtener la respuesta";
  }
}

// Manejo de documentos y chat
document.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.getElementById("port-doc");
  const sendBtn = document.getElementById("send-btn2");
  const modalContainer = document.getElementById("modal_container");
  const cerrarBtn = document.getElementById("close");
  const clipBtn = document.getElementById("send-btn");
  const messageInput = document.getElementById("message-input");
  const dropArea = document.querySelector(".upload-area");
  const ventana = document.getElementById("upload-confirmation-modal");
  const closeBtn = ventana.querySelector(".cerrar");
  let fileToSend = null;
  let isFileUploaded = false;
  let documentId;

  // Prevenir comportamiento por defecto para eventos de arrastre
  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    dropArea.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  // Manejar clic en el botón del clip
  clipBtn.addEventListener("click", function (e) {
    e.preventDefault();
    modalContainer.classList.add("show");
  });

  // Cerrar el modal de subida de archivos si se hace clic fuera de él
  modalContainer.addEventListener("click", function (e) {
    if (e.target === modalContainer) {
      modalContainer.classList.remove("show");
    }
  });

  ["dragenter", "dragover"].forEach((eventName) => {
    dropArea.addEventListener(eventName, highlight, false);
  });

  ["dragleave", "drop"].forEach((eventName) => {
    dropArea.addEventListener(eventName, unhighlight, false);
  });

  function highlight(e) {
    dropArea.classList.add("highlight");
  }

  function unhighlight(e) {
    dropArea.classList.remove("highlight");
  }

  // Handle dropped files
  dropArea.addEventListener("drop", handleDrop, false);

  function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
  }

  function handleFiles(files) {
    if (files.length > 0) {
      fileToSend = files[0];
      messageInput.value = `Archivo seleccionado: ${fileToSend.name}`;
      modalContainer.classList.remove("show");
    }
  }

  // Handle selected files from input
  fileInput.addEventListener("change", function (e) {
    handleFiles(this.files);
  });

  cerrarBtn.onclick = () => {
    modalContainer.style.display = "none";
  };

  closeBtn.onclick = () => {
    ventana.style.display = "none";
  };

  window.onclick = (event) => {
    if (event.target == ventana) {
      ventana.style.display = "none";
    }
  };

  // Función para mostrar la ventana de confirmación
  const showUploadConfirmation = (message) => {
    const ventana = document.getElementById("upload-confirmation-modal");
    const messageElement = document.getElementById(
      "upload-confirmation-message"
    );

    if (ventana && messageElement) {
      messageElement.textContent = message;
      ventana.style.display = "block";
      ventana.style.zIndex = "10000";
      console.log("Modal style after update:", ventana.style.cssText);
    } else {
      console.error("Modal or message element not found");
    }
  };
  // Función para subir el archivo al servidor
  const sendFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8001/save-document", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          `Error: ${
            errorResponse.message || "Error en la solicitud al servidor"
          }`
        );
      }

      const result = await response.json();
      console.log("Archivo subido con éxito:", result);

      if (result.message === "Documento recibido y procesado") {
        showUploadConfirmation(`Archivo ${file.name} recibido y procesado.`);
        documentId = result.document_id;
        isFileUploaded = true;
      }

      return result;
    } catch (error) {
      console.error("Error:", error);
      showUploadConfirmation(`Error al subir el archivo ${file.name}.`);
    }
  };

  // Función para manejar preguntas después de subir el archivo
  const handleQuestion = async (question) => {
    if (isFileUploaded && question.trim() !== "") {
      try {
        const response = await fetch("http://localhost:8001/generate-answer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: question, document_id: documentId }),
        });

        if (!response.ok) {
          throw new Error("Error en la solicitud al servidor");
        }

        const data = await response.json();
        agregarMensajeIA(data.answer);
      } catch (error) {
        console.error("Error:", error);
        agregarMensajeIA("Hubo un error al procesar tu pregunta.");
      }
    } else if (!isFileUploaded) {
      agregarMensajeIA(
        "Por favor, sube un archivo primero antes de hacer una pregunta."
      );
    }
  };

  // Manejar el envío de mensajes y archivos
  sendBtn.addEventListener("click", async () => {
    const mensaje = messageInput.value.trim();

    if (fileToSend) {
      await sendFile(fileToSend);
      fileToSend = null;
      messageInput.value = "";
    } else if (isFileUploaded && mensaje !== "") {
      agregarMensajeUsuario(mensaje);
      messageInput.value = "";
      await handleQuestion(mensaje);
    } else {
      enviarMensaje();
    }
  });

  // Permitir enviar el mensaje al presionar "Enter"
  messageInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      sendBtn.click();
    }
  });

  // Al cargar la página, aplicar el tema y el idioma guardados
  window.onload = function () {
    var savedLanguage = localStorage.getItem("selectedLanguage") || "es";
    document.getElementById("language-selector").value = savedLanguage;
    applyLanguage(savedLanguage);
    cargarTema();
  };
});
