document.addEventListener('DOMContentLoaded', function() {
    const formContainer = document.querySelector('.form-container');
    const imageContainer = document.querySelector('.image-container');
    const imageContainer2 = document.querySelector('.image-container2');
    const formTitle = document.getElementById('form-title');
    const form = document.getElementById('auth-form');
    const submitLink = document.querySelector('.btn2 a');
    const toggleButton = document.getElementById('toggle-btn');
    const extraOptions = document.getElementById('extra-options');
    const socialLogin = document.querySelector('.social-login');
    const emailField = document.getElementById('email-field');
    const confirmPasswordField = document.getElementById('confirm-password-field');
    let isLogin = true;

    function showError(inputElement, message) {
        // Eliminar cualquier mensaje de error existente
        const existingError = inputElement.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // crear e insertar el nuevo mensaje
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '11px';
        errorDiv.style.marginBottom = '5px';
        
        inputElement.parentElement.insertBefore(errorDiv, inputElement);

        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }

    function validateForm() {
        let isValid = true;
        const username = document.getElementById('username');
        const password = document.getElementById('password');
        const email = document.getElementById('email');
        const confirmPassword = document.getElementById('confirm-password');

        if (!username.value.trim()) {
            showError(username, 'Ingrese el usuario.');
            isValid = false;
        }

        if (!password.value.trim()) {
            showError(password, 'Ingrese la contraseña.');
            isValid = false;
        }

        if (!isLogin) {
            if (!email.value.trim()) {
                showError(email, 'Ingrese un correo electrónico.');
                isValid = false;
            }

            if (!confirmPassword.value.trim()) {
                showError(confirmPassword, 'Confirme su contraseña.');
                isValid = false;
            } else if (password.value !== confirmPassword.value) {
                showError(confirmPassword, 'Las contraseñas no coinciden.');
                isValid = false;
            }
        }

        return isValid;
    }

    submitLink.addEventListener('click', function(e) {
        e.preventDefault();
        if (validateForm()) {
            window.location.href = '../public/chat.html';
        }
    });

    toggleButton.addEventListener('click', function () {
        formContainer.classList.toggle('slide-left');
        formContainer.classList.toggle('slide-right');
        form.reset();
        
        // Eliminar cualquier mensaje de error existente
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        
        imageContainer2.querySelector('img').classList.toggle('zoom-in');
        imageContainer.querySelector('img').classList.toggle('zoom-in');

        setTimeout(() => {
            if (isLogin) {
                formTitle.innerText = 'Sign Up';
                emailField.style.display = 'block'; 
                confirmPasswordField.style.display = 'block';
                extraOptions.style.display = 'none'; 
                socialLogin.style.display = 'block'; 
                submitLink.innerText = 'Sign Up'; 
                toggleButton.innerHTML = 'Login <i class="fas fa-arrow-right"></i>'; 
            } else {
                formTitle.innerText = 'Login';
                emailField.style.display = 'none';
                confirmPasswordField.style.display = 'none'; 
                extraOptions.style.display = 'flex'; 
                socialLogin.style.display = 'block'; 
                submitLink.innerText = 'Login'; 
                toggleButton.innerHTML = '<i class="fas fa-arrow-left"></i> Sign Up'; 
            }
            isLogin = !isLogin;
        }, 500);
    });

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