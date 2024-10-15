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
  const rolfield = document.getElementById("rol-field");
  let isLogin = true;

  function showError(inputElement, message) {
    const existingError =
      inputElement.parentElement.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }

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

  async function loginUser(username, password) {
    const url = "http://localhost:8001/user/validate";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username,
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

  async function registerUser(user, adminCode = null) {
    const url = "http://localhost:8001/save-user/";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...user,
          admin_code: adminCode, // Enviar el código de administrador solo si es proporcionado
        }),
      });

      if (!response.ok) {
        throw new Error("Error en el registro de usuario");
      }

      const data = await response.json();
      console.log("Registro exitoso:", data);

      return data;
    } catch (error) {
      console.error("Error:", error.message);
      alert(
        "Error en el registro. Verifique su conexión o intente nuevamente."
      );
    }
  }

  function validateForm() {
    let isValid = true;
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const emailInput = document.getElementById("email");
    const confirmPasswordInput = document.getElementById("confirm_password");
    const adminCodeInput = document.getElementById("admin-code");
    const rolSelect = document.getElementById("rol-list");

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

      // Solo validar el código de administrador si el rol seleccionado es "admin"
      if (rolSelect.value === "admin") {
        if (
          adminCodeInput &&
          window.getComputedStyle(adminCodeInput).display !== "none" &&
          !adminCodeInput.value.trim()
        ) {
          showError(adminCodeInput, "Ingrese el código de administrador.");
          isValid = false;
        }
      }
    }

    return isValid;
  }

  function switchToLogin() {
    formContainer.classList.toggle("slide-left");
    formContainer.classList.toggle("slide-right");
    form.reset();
    document.querySelectorAll(".error-message").forEach((el) => el.remove());

    imageContainer2.querySelector("img").classList.toggle("zoom-in");
    imageContainer.querySelector("img").classList.toggle("zoom-in");

    setTimeout(() => {
      formTitle.innerText = "Login";
      email.style.display = "none";
      confirm_password.style.display = "none";
      rolfield.style.display = "none";
      extraOptions.style.display = "flex";
      socialLogin.style.display = "block";
      submitLink.innerText = "Login";
      toggleButton.innerHTML = '<i class="fas fa-arrow-left"></i>Sign Up';
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
      rolfield.style.display = "block";
      extraOptions.style.display = "none";
      socialLogin.style.display = "block";
      submitLink.innerText = "Sign Up";
      toggleButton.innerHTML = ' Login<i class="fas fa-arrow-right"></i>';
      isLogin = false;
    }, 500);
  }

  // Cambiar entre Login y Sign Up
  toggleButton.addEventListener("click", function () {
    if (isLogin) {
      switchToSignUp();
    } else {
      switchToLogin();
    }
  });
  //para el boton btn1
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

  // Detectar cambios en el rol seleccionado
  const rolField = document.getElementById("rol-list");
  const adminCodeField = document.getElementById("admin-code-field");

  rolField.addEventListener("change", function () {
    if (rolField.value === "admin") {
      adminCodeField.style.display = "block";
    } else {
      adminCodeField.style.display = "none";
    }
  });

  // Enviar formulario
  submitLink.addEventListener("click", async function (e) {
    e.preventDefault();

    if (validateForm()) {
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const email = document.getElementById("email").value;
      const confirmPassword = document.getElementById("confirm_password").value;
      const rol = document.getElementById("rol-list").value;
      const adminCode = document.getElementById("admin-code").value;

      if (isLogin) {
        // Lógica de login
        const loginResponse = await loginUser(username, password);

        if (loginResponse) {
          console.log("Rol del usuario:", loginResponse.rol); // Añade esta línea
          if (
            loginResponse.rol === "Administrador" ||
            loginResponse.rol === "admin"
          ) {
            window.location.href = "../public/admin-dashboard.html"; // Redirigir al dashboard de administrador
          } else {
            window.location.href = "../public/chat.html"; // Redirigir a la página de usuario
          }
        }
      } else {
        // Registro de usuario (Sign-Up)
        const user = {
          name: username,
          email: email,
          password: password,
          confirm_password: confirmPassword,
          rol: rol,
        };

        if (rol === "admin") {
          const registerResponse = await registerUser(user, adminCode);
          if (registerResponse) {
            alert("Administrador registrado exitosamente.");
            window.location.href = "../public/chat.html"; // Redirigir después del registro
          }
        } else {
          const registerResponse = await registerUser(user);
          if (registerResponse) {
            alert("Usuario registrado exitosamente.");
            window.location.href = "../public/chat.html";
          }
        }
      }
    }
  });
});
