// Importamos nuestras funciones
import inventoryManager from "./inventoryManager.js";
import { closeModal, getFormData, initModalEventes, validateForm} from "./ui.js";

// Mostramos el modal
initModalEventes();

// Accedemos a nuestro formulario
const form = document.querySelector('.form-product');

// Creamos nuestro objeto
const manager = new inventoryManager();

// Espreamos a que de clic en submit
form.addEventListener('submit', (e) => {
    // Evitamos que el formulario se envie
    e.preventDefault();

    // Validamos nuestro formulario
    if (!validateForm()) return;
    // Guardamos el producto
    const { name, category, stock, price } = getFormData();
    manager.addProduct(name, category, stock, price);
    console.log('Producto agregado');
    // Renderizamos el producot
    // Limpiamos el formulario
    form.reset();
    // Cerramos el modal
    closeModal()
})
