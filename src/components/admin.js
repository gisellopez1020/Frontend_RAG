setTimeout(function () {
  const listModal = document.getElementById("listModal");
  const actionModal = document.getElementById("actionModal");
  const closeButtons = document.getElementsByClassName("close");

  const listBtn = document.getElementById("list");
  const getBtn = document.getElementById("get");
  const updateBtn = document.getElementById("update");
  const deleteBtn = document.getElementById("delete");

  // Añade eventos a los botones
  listBtn.addEventListener("click", () => {
    openModal(listModal, listUsers);
  });
  getBtn.addEventListener("click", () =>
    openModal(actionModal, getUser, "Obtener Usuario")
  );
  updateBtn.addEventListener("click", () =>
    openModal(actionModal, updateUser, "Actualizar Rol de Usuario")
  );
  deleteBtn.addEventListener("click", () =>
    openModal(actionModal, deleteUser, "Eliminar Usuario")
  );

  // Cierra la ventana emergente cuando se presiona el botón de cerrar
  for (let closeButton of closeButtons) {
    closeButton.addEventListener("click", () => {
      listModal.style.display = "none";
      actionModal.style.display = "none";
    });
  }

  // Cierra la ventana emergente cuando se presiona afuera
  window.addEventListener("click", (event) => {
    if (event.target == listModal || event.target == actionModal) {
      listModal.style.display = "none";
      actionModal.style.display = "none";
    }
  });

  function openModal(modal, action, title = "") {
    modal.style.display = "block";
    if (title) {
      document.getElementById("modalTitle").textContent = title;
    }
    document.getElementById("submitAction").onclick = action;
    action(); // Ejecutar la acción inmediatamente para depurar
  }

  //Función que lista a todos los usuarios
  async function listUsers() {
    try {
      console.log("Listando usuarios..."); // Asegúrate de que se vea este mensaje
      const response = await fetch("http://localhost:8001/list-users");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const users = await response.json();
      console.log("Usuarios recibidos:", users); // Verifica que los datos se están recibiendo

      const tableBody = document.getElementById("userTableBody");
      tableBody.innerHTML = ""; // Vaciar el contenido previo

      if (users.length === 0) {
        console.log("No users found");
        tableBody.innerHTML =
          "<tr><td colspan='4'>No se encontraron usuarios</td></tr>";
        return;
      }

      users.forEach((user) => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = user.id || "N/A";
        row.insertCell(1).textContent = user.name || "N/A";
        row.insertCell(2).textContent = user.email || "N/A";
        row.insertCell(3).textContent = user.rol || "N/A";
        row.insertCell(4).textContent = user.password || "N/A";
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      document.getElementById("userTableBody").innerHTML =
        "<tr><td colspan='4'>Error al cargar los usuarios: " +
        error.message +
        "</td></tr>";
    }
  }

  //Función que obtiene un usuario por su ID
  async function getUser() {
    const userId = document.getElementById("userId").value;
    try {
      const response = await fetch(`http://localhost:8001/get-user/${userId}`);
      const user = await response.json();
      document.getElementById("modalResult").innerHTML = `
              <p>ID: ${user.id}</p>
              <p>Nombre: ${user.name}</p>
              <p>Email: ${user.email}</p>
              <p>Rol: ${user.rol}</p>
          `;
    } catch (error) {
      document.getElementById("modalResult").textContent =
        "Usuario no encontrado";
    }
  }

  //Función que actualiza un usuario por su ID
  async function updateUser() {
    const userId = document.getElementById("userId").value;
    if (!userId) {
      document.getElementById("modalResult").textContent =
        "Por favor, ingresa un ID de usuario.";
      return;
    }

    // Después de obtener el ID, pedir el nuevo rol
    const newRole = prompt("Ingrese el nuevo rol:");

    if (newRole) {
      try {
        const response = await fetch(
          `http://localhost:8001/update-rol/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ rol: newRole }),
          }
        );

        const result = await response.json();

        if (response.ok) {
          document.getElementById("modalResult").textContent =
            "Rol actualizado exitosamente.";
        } else {
          document.getElementById(
            "modalResult"
          ).textContent = `Error al actualizar el rol: ${result.detail}`;
        }
      } catch (error) {
        document.getElementById("modalResult").textContent =
          "Error al actualizar el rol";
      }
    } else {
      document.getElementById("modalResult").textContent =
        "Actualización cancelada. No se ingresó un nuevo rol.";
    }
  }

  async function deleteUser() {
    const userId = document.getElementById("userId").value;
    if (confirm("¿Está seguro de que desea eliminar este usuario?")) {
      try {
        const response = await fetch(
          `http://localhost:8001/delete-user/${userId}`,
          {
            method: "DELETE",
          }
        );
        const result = await response.json();
        document.getElementById("modalResult").textContent =
          "Usuario eliminado exitosamente";
      } catch (error) {
        document.getElementById("modalResult").textContent =
          "Error al eliminar el usuario";
      }
    }
  }
}, 1000);
