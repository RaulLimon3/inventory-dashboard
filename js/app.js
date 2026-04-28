// Importamos nuestras funciones
import inventoryManager from "./inventoryManager.js";
import { closeModal, getFormData, initModalEventes, renderProducts, validateForm} from "./ui.js";

// Mostramos el modal
initModalEventes();

// Accedemos a nuestro formulario
const form = document.querySelector('.form-product');

// Creamos nuestro objeto
const manager = new inventoryManager();

// Mostramos los registros guardados
renderProducts(manager.getProducts());

// Espreamos a que de clic en submit
form.addEventListener('submit', (e) => {
    // Evitamos que el formulario se envie
    e.preventDefault();

    // Validamos nuestro formulario
    if (!validateForm()) return;
    // Guardamos el producto
    const { name, category, stock, price } = getFormData();
    manager.addProduct(name, category, stock, price);
    // Renderizamos el producto
    renderProducts(manager.getProducts());
    // Limpiamos el formulario
    form.reset();
    // Cerramos el modal
    closeModal()
});

document.addEventListener('click', (e) => {
    // Hacemos clic sobre el boton
    const toggleBtn = e.target.closest('.dropdown-toggle')
    // Verificamos que sea el boton
    if (toggleBtn) {
        // Accedemos a su contenedor padre
        const container = toggleBtn.closest('.dropdown-container');
        // Accedemos al contenido a desplegar
        const dropdown = container.querySelector('.dropdown');
        // Validamos que no tenga la clase que oculta el menu
        const isOpen = !dropdown.classList.contains('dropdown--hidden');
        // Cerramos los menus
        closeAllDropdowns();
        // Verificamos que no este oculto el menu
        if (!isOpen) {
            // Mostramos menu
            dropdown.classList.remove('dropdown--hidden');
        }

        return;
    }
    closeAllDropdowns();
});

const closeAllDropdowns = () => {
    document.querySelectorAll('.dropdown').forEach(drop => {
        drop.classList.add('dropdown--hidden');
    });
};