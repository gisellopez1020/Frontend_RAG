
//abre los archivos al hundirle al "+"
document.getElementById('open2').addEventListener('click', function() {
    document.getElementById('profile-pic-input').click(); // Activa el input de tipo file
  });
  
  //  actualiza la imagen de perfil después de seleccionar un archivo
  document.getElementById('profile-pic-input').addEventListener('change', function(event) {
    const file = event.target.files[0]; // Obtiene el archivo seleccionado
    if (file) {
      const reader = new FileReader(); // Utiliza FileReader para cargar el archivo
      reader.onload = function(e) {
        document.getElementById('profile-pic').src = e.target.result; // Actualiza la imagen de perfil
      };
      reader.readAsDataURL(file); // Lee el archivo como URL
    }
  });
  document.getElementById("profile-pic-input").addEventListener("change", function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = function(e) {
      const imgElement = document.getElementById("profile-pic-img");
      imgElement.src = e.target.result;
      imgElement.style.display = "block"; // Mostrar la imagen cargada
    }
  
    if (file) {
      reader.readAsDataURL(file); // Convertir la imagen a URL
    }
  });
  
  