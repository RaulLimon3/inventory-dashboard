// Importamos nuestras funciones
import { closeModal, initModalEventes, validateForm} from "./ui.js";

initModalEventes();

// Accedemos a nuestro formulario
const form = document.querySelector('.form-product');

// Espreamos a que de clic en submit
form.addEventListener('submit', (e) => {
    // Evitamos que el formulario se envie
    e.preventDefault();

    // Validamos nuestro formulario
    if (!validateForm()) return;
    // Guardamos el producto
    console.log('Producto agregado');
    // Renderizamos el producot
    // Limpiamos el formulario
    form.reset();
    // Cerramos el modal
    closeModal()
})
