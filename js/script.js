// Constantes y configuraciones iniciales
const apiKey = "pon tu apikey de usuario"; // remplasa por tu apikey de usuario
const maxImages = 4; // Número de imágenes a generar por cada prompt
let selectedImageNumber = null;

// Función para generar un número aleatorio entre min y max (inclusivo)
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para deshabilitar el botón de generar durante el procesamiento
function disableGenerateButton() {
    document.getElementById("generate").disabled = true;
}

// Función para habilitar el botón de generar después del procesamiento
function enableGenerateButton() {
    document.getElementById("generate").disabled = false;
}

// Función para limpiar la cuadrícula de imágenes
function clearImageGrid() {
    const imageGrid = document.getElementById("image-grid");
    imageGrid.innerHTML = "";
}

// Función para obtener el endpoint de la API basado en el modelo seleccionado
function getApiEndpoint(model) {
    switch (model) {
        case 'FLUX Midjourney':
            return " https://api-inference.huggingface.co/models/Jovie/Midjourney";
        case 'FLUX pro 8k':
            return "https://api-inference.huggingface.co/models/Shakker-Labs/FLUX.1-dev-LoRA-add-details";       
        case 'FLUX comic':
            return "https://api-inference.huggingface.co/models/renderartist/retrocomicflux";
        case 'FLUX anime':
            return "https://api-inference.huggingface.co/models/glif/90s-anime-art";
        case 'FLUX.1 dev':
            return "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev";
        case 'FLUX.1 schnell':
            return "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell";                
        default:
            return "";
    }
}

// Función para generar imágenes
async function generateImages(input) {
    disableGenerateButton();
    clearImageGrid();

    const loading = document.getElementById("loading");
    loading.style.display = "block";

    const model = document.getElementById("model-select").value;
    const apiEndpoint = getApiEndpoint(model);

    for (let i = 0; i < maxImages; i++) {
        const randomNumber = getRandomNumber(1, 10000);
        const prompt = `${input} ${randomNumber}`;
        const response = await fetch(apiEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({ inputs: prompt }),
        });

        if (!response.ok) {
            alert("¡Error al generar la imagen!");
            break;
        }

        const blob = await response.blob();
        const imgUrl = URL.createObjectURL(blob);

        // Crear el contenedor de la imagen con proporción 16:9
        const wrapper = document.createElement("div"); // Crea el contenedor
        wrapper.className = "image-wrapper"; // Asigna la clase image-wrapper

        // Crear la imagen y añadirla al contenedor
        const img = document.createElement("img");
        img.src = imgUrl;
        img.alt = `art-${i + 1}`;
        img.onclick = () => downloadImage(imgUrl, i);
        wrapper.appendChild(img); // Añade la imagen al contenedor

        // Añadir el contenedor a la cuadrícula
        document.getElementById("image-grid").appendChild(wrapper);
    }

    loading.style.display = "none";
    enableGenerateButton();

    selectedImageNumber = null; // Restablecer el número de imagen seleccionada
}

// Función para manejar el envío del formulario
function handleFormSubmit(event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    const input = document.getElementById("user-prompt").value;
    generateImages(input);
}

// Agregar listener para el botón de generar
document.getElementById("generate").addEventListener('click', handleFormSubmit);

// Agregar listener para la tecla Enter en el campo de entrada
document.getElementById("user-prompt").addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleFormSubmit(event);
    }
});

// Función para descargar la imagen
function downloadImage(imgUrl, imageNumber) {
    const link = document.createElement("a");
    link.href = imgUrl;
    link.download = `image-${imageNumber + 1}.jpg`;
    link.click();
}

// Función para el botón de regresar (redirigir o hacer alguna acción)
document.getElementById("back-button").addEventListener("click", () => {
    window.history.back(); // O cualquier acción personalizada
});
