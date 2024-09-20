document.addEventListener('DOMContentLoaded', function() {
    const formContainer = document.querySelector('.form-container');
    const imageContainer = document.querySelector('.image-container');
    const imageContainer2 = document.querySelector('.image-container2');
    const formTitle = document.getElementById('form-title');
    const form = document.getElementById('auth-form');
    const submitButton = form.querySelector('button[type="submit"]');
    const toggleButton = document.getElementById('toggle-btn');
    const extraOptions = document.getElementById('extra-options');
    const socialLogin = document.querySelector('.social-login');

    // Agrega un evento al botón de alternancia
    toggleButton.addEventListener('click', function () {
        // Alterna entre mover a la izquierda o a la derecha
        if (formContainer.classList.contains('slide-left')) {
            formContainer.classList.remove('slide-left');
            formContainer.classList.add('slide-right'); // Mueve a la izquierda
        } else {
            formContainer.classList.remove('slide-right');
            formContainer.classList.add('slide-left'); // Mueve a la derecha
        }
        
        
        // Alterna la clase 'zoom-in' en la imagen
        imageContainer2.querySelector('img').classList.toggle('zoom-in');

        imageContainer.querySelector('img').classList.toggle('zoom-in');

        
        setTimeout(() => {
            if (formTitle.innerText === 'Login') {
                // Cambiar a Sign Up 
                formTitle.innerText = 'Sign Up';
                submitButton.innerText = 'Sign Up';
                toggleButton.innerText = 'Login';
                extraOptions.style.display = 'none';
                socialLogin.style.display = 'none';
            } else {
                // Cambiar a Login
                formTitle.innerText = 'Login';
                submitButton.innerText = 'Login';
                toggleButton.innerText = 'Sign Up';
                extraOptions.style.display = 'none';
                socialLogin.style.display = 'none';
            }
        }, 800);
    });
});
