document.addEventListener("DOMContentLoaded", function () {
  const formContainer = document.querySelector(".form-container");
  const imageContainer = document.querySelector(".image-container");
  const imageContainer2 = document.querySelector(".image-container2");
  const formTitle = document.getElementById("form-title");
  const form = document.getElementById("auth-form");
  const submitLink = document.querySelector(".btn2 a");
  const toggleButton = document.getElementById("toggle-btn");
  const extraOptions = document.getElementById("extra-options");
  const socialLogin = document.querySelector(".social-login");
  const emailField = document.getElementById("email-field");
  const confirmPasswordField = document.getElementById(
    "confirm-password-field"
  );
  let isLogin = true;

  function showError(inputElement, message) {
    // Eliminar cualquier mensaje de error existente
    const existingError =
      inputElement.parentElement.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }

    // Crear e insertar el nuevo mensaje
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = message;
    errorDiv.style.color = "red";
    errorDiv.style.fontSize = "11px";
    errorDiv.style.marginBottom = "5px";

    inputElement.parentElement.insertBefore(errorDiv, inputElement);

    setTimeout(() => {
      errorDiv.remove();
    }, 3000);
  }

  async function loginUser(email, password) {
    const url = "http://localhost:8001/user/validate"; // URL del endpoint de tu backend

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Error en la autenticación");
      }

      const data = await response.json();
      console.log("Login exitoso:", data);

      return data;
    } catch (error) {
      console.error("Error:", error.message);
      alert("Login fallido. Verifique sus credenciales.");
    }
  }

  async function registerUser(username, email, password) {
    const url = "http://localhost:8001/save-user/"; // URL del endpoint de tu backend

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Error en el registro");
      }

      const data = await response.json();
      console.log("Registro exitoso:", data);

      return data;
    } catch (error) {
      console.error("Error:", error.message);
      alert("Registro fallido. Verifique sus datos.");
    }
  }

  function validateForm() {
    let isValid = true;
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const email = document.getElementById("email");
    const confirmPassword = document.getElementById("confirm-password");

    if (!username.value.trim()) {
      showError(username, "Ingrese el usuario.");
      isValid = false;
    }

    if (!password.value.trim()) {
      showError(password, "Ingrese la contraseña.");
      isValid = false;
    }

    if (!isLogin) {
      if (!email.value.trim()) {
        showError(email, "Ingrese un correo electrónico.");
        isValid = false;
      }

      if (!confirmPassword.value.trim()) {
        showError(confirmPassword, "Confirme su contraseña.");
        isValid = false;
      } else if (password.value !== confirmPassword.value) {
        showError(confirmPassword, "Las contraseñas no coinciden.");
        isValid = false;
      }
    }

    return isValid;
  }

  function switchToLogin() {
    formContainer.classList.toggle("slide-left");
    formContainer.classList.toggle("slide-right");
    form.reset();

    // Eliminar cualquier mensaje de error existente
    document.querySelectorAll(".error-message").forEach((el) => el.remove());

    imageContainer2.querySelector("img").classList.toggle("zoom-in");
    imageContainer.querySelector("img").classList.toggle("zoom-in");

    setTimeout(() => {
      formTitle.innerText = "Login";
      emailField.style.display = "none";
      confirmPasswordField.style.display = "none";
      extraOptions.style.display = "flex";
      socialLogin.style.display = "block";
      submitLink.innerText = "Login";
      toggleButton.innerHTML = '<i class="fas fa-arrow-left"></i> Sign Up';
      isLogin = true;
    }, 500);
  }

  submitLink.addEventListener("click", async function (e) {
    e.preventDefault();

    if (validateForm()) {
      if (isLogin) {
        // Si es login, obtenemos el email y la contraseña y llamamos a loginUser
        const email = document.getElementById("username").value; // Cambiado a email según tu backend
        const password = document.getElementById("password").value;

        // Llamar a la función de login
        const loginResponse = await loginUser(email, password);

        if (loginResponse) {
          // Si el login es exitoso, redirigimos al chat
          window.location.href = "../public/chat.html";
        } else {
          alert("Login fallido. Verifica tus credenciales.");
        }
      } else {
        // Registro de usuario
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Llamar a la función de registro
        const registerResponse = await registerUser(username, email, password);

        if (registerResponse) {
          alert("Usuario registrado exitosamente. Por favor, inicie sesión.");
          switchToLogin(); // Cambiar automáticamente al modo de login
        } else {
          alert("Registro fallido. Inténtalo de nuevo.");
        }
      }
    }
  });

  toggleButton.addEventListener("click", function () {
    formContainer.classList.toggle("slide-left");
    formContainer.classList.toggle("slide-right");
    form.reset();

    // Eliminar cualquier mensaje de error existente
    document.querySelectorAll(".error-message").forEach((el) => el.remove());

    imageContainer2.querySelector("img").classList.toggle("zoom-in");
    imageContainer.querySelector("img").classList.toggle("zoom-in");

    setTimeout(() => {
      if (isLogin) {
        formTitle.innerText = "Sign Up";
        emailField.style.display = "block";
        confirmPasswordField.style.display = "block";
        extraOptions.style.display = "none";
        socialLogin.style.display = "block";
        submitLink.innerText = "Sign Up";
        toggleButton.innerHTML = 'Login <i class="fas fa-arrow-right"></i>';
      } else {
        formTitle.innerText = "Login";
        emailField.style.display = "none";
        confirmPasswordField.style.display = "none";
        extraOptions.style.display = "flex";
        socialLogin.style.display = "block";
        submitLink.innerText = "Login";
        toggleButton.innerHTML = '<i class="fas fa-arrow-left"></i> Sign Up';
      }
      isLogin = !isLogin;
    }, 500);
  });

  const btn1 = document.getElementById("toggle-btn");
  let movedRight = false;

  btn1.addEventListener("click", function () {
    if (movedRight) {
      btn1.classList.remove("move-left");
      btn1.classList.add("move-right");
    } else {
      btn1.classList.remove("move-right");
      btn1.classList.add("move-left");
    }
    movedRight = !movedRight;
  });
});
