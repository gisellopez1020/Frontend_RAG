document.addEventListener('DOMContentLoaded', function() {
    const formContainer = document.querySelector('.form-container');
    const imageContainer = document.querySelector('.image-container');
    const imageContainer2 = document.querySelector('.image-container2');
    const formTitle = document.getElementById('form-title');
    const form = document.getElementById('auth-form');
    const submitButton = document.querySelector('.i'); 
    const toggleButton = document.getElementById('toggle-btn'); 
    const extraOptions = document.getElementById('extra-options');
    const socialLogin = document.querySelector('.social-login');
    const emailField = document.getElementById('email-field');
    const confirmPasswordField = document.getElementById('confirm-password-field');
    let isLogin = true; // Variable para controlar el estado de Login/Sign Up

    // Agrega un evento al botón de alternancia
    toggleButton.addEventListener('click', function () {
      
        if (formContainer.classList.contains('slide-left')) {
            formContainer.classList.remove('slide-left');
            formContainer.classList.add('slide-right');
        } else {
            formContainer.classList.remove('slide-right');
            formContainer.classList.add('slide-left');
        }
        
        // Reiniciar el formulario
        form.reset();
        
        // Alternar la clase 'zoom-in' en las imágenes
        imageContainer2.querySelector('img').classList.toggle('zoom-in');
        imageContainer.querySelector('img').classList.toggle('zoom-in');

        // Cambiar textos y estado
        setTimeout(() => {
            if (isLogin) {
                // Cambiar a Sign Up
                formTitle.innerText = 'Sign Up';
                emailField.style.display = 'block'; // Mostrar campo de email
                confirmPasswordField.style.display = 'block';
                extraOptions.style.display = 'none'; 
                socialLogin.style.display = 'block'; 
                submitButton.innerText = 'Sign Up'; 
                toggleButton.innerHTML = 'Login <i class="fas fa-arrow-right"></i>'; 
             } else {
                // Cambiar a Login
                formTitle.innerText = 'Login';
                emailField.style.display = 'none';
                confirmPasswordField.style.display = 'none'; 
                extraOptions.style.display = 'flex'; 
                socialLogin.style.display = 'block'; 
                submitButton.innerText = 'Login'; 
                toggleButton.innerHTML = '<i class="fas fa-arrow-left"></i> Sign Up'; 
            }
            // Cambiar el estado de isLogin
            isLogin = !isLogin;
        }, 500); // 500 ms para sincronizar con la animación del formulario
    });
});

//movimiento del boton

document.addEventListener('DOMContentLoaded', function() {
    const btn1 = document.getElementById('toggle-btn');
    let movedRight = false;
  
    btn1.addEventListener('click', function() {
      if (movedRight) {
        btn1.classList.remove('move-left');
        btn1.classList.add('move-right');
      } else {
        btn1.classList.remove('move-right');
        btn1.classList.add('move-left');
      }
      movedRight = !movedRight;   
     });
  });
