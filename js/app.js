// Importamos nuestras funciones
import { initModalEventes, validateForm} from "./ui.js";

initModalEventes();

// Accedemos a nuestro formulario
const form = document.querySelector('.form-product');

// Espreamos a que de clic en submit
form.addEventListener('submit', (e) => {
    // Evitamos que el formulario se envie
    e.preventDefault();

    // Validamos nuestro formulario
    if (!validateForm()) return;
    console.log('Producto agregado');
    form.reset();
})
