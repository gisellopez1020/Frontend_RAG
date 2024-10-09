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
  const email = document.getElementById("email-field");
  const confirm_password = document.getElementById("confirm-password-field");
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

  async function registerUser(username, email, password, confirm_password) {
    const url = "http://localhost:8001/save-user/";

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
          confirm_password: confirm_password,
        }),
      });

      const data = await response.json();
      console.log("Registro exitoso:", data);

      return data;
    } catch (error) {
      console.error("Error:", error.message);
      alert(
        "Error en el registro. Verifique su conexión o intente nuevamente."
      );
      return null;
    }
  }

  function validateForm() {
    let isValid = true;
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const emailInput = document.getElementById("email");
    const confirmPasswordInput = document.getElementById("confirm_password");

    if (!username.value.trim()) {
      showError(username, "Ingrese el usuario.");
      isValid = false;
    }

    if (!password.value.trim()) {
      showError(password, "Ingrese la contraseña.");
      isValid = false;
    }

    if (!isLogin) {
      if (!emailInput.value.trim()) {
        showError(emailInput, "Ingrese un correo electrónico.");
        isValid = false;
      }

      if (!confirmPasswordInput.value.trim()) {
        showError(confirmPasswordInput, "Confirme su contraseña.");
        isValid = false;
      } else if (password.value !== confirmPasswordInput.value) {
        showError(confirmPasswordInput, "Las contraseñas no coinciden.");
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
      email.style.display = "none";
      confirm_password.style.display = "none";
      extraOptions.style.display = "flex";
      socialLogin.style.display = "block";
      submitLink.innerText = "Login";
      toggleButton.innerHTML = ' <i class="fas fa-arrow-left"></i>Sign Up';
      isLogin = true;
    }, 500);
  }

  function switchToSignUp() {
    formContainer.classList.toggle("slide-left");
    formContainer.classList.toggle("slide-right");
    form.reset();
    document.querySelectorAll(".error-message").forEach((el) => el.remove());

    imageContainer2.querySelector("img").classList.toggle("zoom-in");
    imageContainer.querySelector("img").classList.toggle("zoom-in");

    setTimeout(() => {
      formTitle.innerText = "Sign Up";
      email.style.display = "block";
      confirm_password.style.display = "block";
      extraOptions.style.display = "none";
      socialLogin.style.display = "block";
      submitLink.innerText = "Sign Up";
      toggleButton.innerHTML = ' Login<i class="fas fa-arrow-right"></i>';
      isLogin = false;
    }, 500);
  }

  submitLink.addEventListener("click", async function (e) {
    e.preventDefault();

    if (validateForm()) {
      if (isLogin) {
        // Si es login, obtenemos el email y la contraseña y llamamos a loginUser
        const emailValue = document.getElementById("username").value;
        const passwordValue = document.getElementById("password").value;

        // Llamar a la función de login
        const loginResponse = await loginUser(emailValue, passwordValue);

        if (loginResponse) {
          // Si el login es exitoso, redirigimos al chat
          window.location.href = "../public/chat.html";
        } else {
          alert("Login fallido. Verifica tus credenciales.");
        }
      } else {
        // Registro de usuario
        const usernameValue = document.getElementById("username").value;
        const emailValue = document.getElementById("email").value;
        const passwordValue = document.getElementById("password").value;
        const confirmPasswordValue =
          document.getElementById("confirm_password").value;

        // Llamar a la función de registro
        const registerResponse = await registerUser(
          usernameValue,
          emailValue,
          passwordValue,
          confirmPasswordValue
        );

        if (registerResponse) {
          alert("Usuario registrado exitosamente. Bienvenido");
          window.location.href = "../public/chat.html";
        } else {
          alert("Registro fallido. Inténtalo de nuevo.");
        }
      }
    }
  });

  toggleButton.addEventListener("click", function () {
    if (isLogin) {
      switchToSignUp();
    } else {
      switchToLogin();
    }
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

  // Función para cambiar directamente a Sign Up si hay un hash en la URL
  function directToSignUp() {
    // Cambiar a Sign Up sin animación
    formTitle.innerText = "Sign Up";
    email.style.display = "block";
    confirm_password.style.display = "block";
    extraOptions.style.display = "none";
    socialLogin.style.display = "block";
    submitLink.innerText = "Sign Up";
    toggleButton.innerHTML = '<i class="fas fa-arrow-left"></i> Login';
    isLogin = false;

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
  }

  // Si la URL tiene el hash #signup, cambiamos a Sign Up inmediatamente
  if (window.location.hash === "#signup") {
    directToSignUp();
  }
});
