// Importamos nuestras funciones
import inventoryManager from "./inventoryManager.js";
import { closeModal, fillForm, getFormData, initModalEventes, 
    openModal, renderProducts, renderSummary, renderTotal, 
    renderTotalStock, setFormMode, validateForm} from "./ui.js";

// Mostramos el modal
initModalEventes();

// Accedemos a nuestro formulario
const form = document.querySelector('.form-product');

// Creamos nuestro objeto
const manager = new inventoryManager();

let editProductId = null;

// Mostramos los registros guardados
renderProducts(manager.getProducts());

// Mostramos el total del inventario
renderTotal(manager.getTotal());

// Mostramos el total de productos
renderTotalStock(manager.getTotalStock());

// Mostramos el total de productos en stock
renderSummary(manager.getStockSummary());

// Espreamos a que de clic en submit
form.addEventListener('submit', (e) => {
    // Evitamos que el formulario se envie
    e.preventDefault();
    // Validamos nuestro formulario
    if (!validateForm()) return;
    // Extramos los datos del formulario
    const { name, category, stock, price } = getFormData();
    // Verificamos la accion a realizar
    if (editProductId) {
        // Actualizamos el producto
        manager.updateProduct(editProductId, name, category, stock, price);
        editProductId = null;
        setFormMode(false);
    } else {
        manager.addProduct(name, category, stock, price);
    }
    // Renderizamos el producto
    updateUi();
    // Limpiamos el formulario
    form.reset();
    // Cerramos el modal
    closeModal()
});

// Mostramos menu desplegable
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

// Detectamos cuando se de clic en el boton de borrar
document.addEventListener('click', (e) => {
    // Accedemos al boton
    const deleteBtn = e.target.closest('.dropdown-item--danger');

    // Verificamos que se de clic sobre el botn
    if (!deleteBtn) return;

    // Obtenemos el id 
    const row = deleteBtn.closest('tr');
    const id = Number(row.dataset.id);

    // Eliminamos el producto
    handleDelete(id);
    closeAllDropdowns();
});

const handleDelete = (id) => {
    manager.removeProduct(id);
    updateUi();
};

// Actualizamos interfaz
const updateUi = () => {
    renderProducts(manager.getProducts());
    renderTotal(manager.getTotal());
    renderTotalStock(manager.getTotalStock());
    renderSummary(manager.getStockSummary());
}

document.addEventListener('click', (e) => {
    // Accedemos al boton de eliminar de nuestro menu de acciones
    const editBtn = e.target.closest('.dropdown-item--edit')

    // Verificamos que se de clic
    if (!editBtn) return;

    // Extraemos el id de la fila
    const row = editBtn.closest('tr');
    const id = Number(row.dataset.id);

    // Buscamos el producto por su id
    const product = manager.getProductById(id);
    if (!product) return;
    // Abrimos el modal con los datos a editar
    openEditModal(product);
});

const openEditModal = (product) => {
    // Abrimos el modal
    openModal();

    // Le pasamos el id del producto
    editProductId = product.id;

    // Ponemos el valor en los campos
    fillForm(product);

    // Cambiamos el titulo del formulario
    setFormMode(true);
};