// Función para abrir el modal
function openModal(image) {
  var modal = document.getElementById("modal");
  var modalImg = document.getElementById("modalImage");
  var modalDescription = document.getElementById("modalDescription");

  modal.style.display = "flex"; // Mostramos el modal
  modalImg.src = image.src; // Cambiamos la imagen del modal
  modalDescription.textContent = image.getAttribute("data-description") || "Sin descripción disponible."; // Cambiamos la descripción o mostramos un texto por defecto si no tiene
}

// Función para cerrar el modal
function closeModal() {
  var modal = document.getElementById("modal");
  modal.style.display = "none"; // Ocultamos el modal
}


// Escuchar la tecla ESC para cerrar el modal
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape" || event.key === "Esc") {
      closeModal();
  }
});


// Función para descargar la imagen
function descargarImagen() {
  var modalImg = document.getElementById("modalImage");
  var link = document.createElement('a');
  link.href = modalImg.src;
  link.download = 'imagen';
  link.click();
}

// Función para copiar el prompt
function copiarPrompt() {
  var prompt = 'Aquí va el texto que quieras copiar'; // Cambia este texto por el prompt dinámico si es necesario
  navigator.clipboard.writeText(prompt).then(function() {
    alert('Prompt copiado');
  }, function(err) {
    console.error('Error al copiar el texto: ', err);
  });
}
