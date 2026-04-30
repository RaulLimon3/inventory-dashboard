// Accedemos a nuestro elementos
const addProductBtn = document.getElementById('addProduct');
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('closeModal');
const productInput = document.getElementById('product');
const categorySelect = document.getElementById('category');
const unitsInput = document.getElementById('units');
const priceInput = document.getElementById('price');
const table = document.getElementById('tableBody');
const emptyTable = document.getElementById('emptyTable');
const message = document.getElementById('message');
const form = document.querySelector('.form-product');
const formContainer = document.querySelector('.formContainer');
const modalTitle = document.querySelector('.modal-title');
const modalBtn = document.querySelector('.btn-add');
const modalSuccess = document.getElementById('modalSuccess');
const successText = document.getElementById('successText');
const modalConfirm = document.getElementById('modalConfirm');
const cancelBtn = document.getElementById('cancelDelete');
const confirmBnt = document.getElementById('confirmDelete');
const total = document.getElementById('total');
const totalProducts = document.getElementById('totalProducts');
const productInStock = document.getElementById('productInStock');
const productLowStock = document.getElementById('productLowStock');
const productOutStock = document.getElementById('productOutStock');
const inStockProgress = document.getElementById('inStockProgress');
const lowStockProgress = document.getElementById('lowStockProgress');
const outStockProgress = document.getElementById('outStockProgress');

/* Modal */

// Abrimos el modal
const openModal = () => {
    setFormMode(false);
    clearForm();
    modal.classList.add('modal--active');
};

// Cerramos modal
const closeModal = () => {
    modal.classList.remove('modal--active');
    clearForm();
};

// Limpiamos campos cuando se cierre el modal
const clearForm = () => {
    form.reset();
    const inputs = document.querySelectorAll('.input');
    inputs.forEach(input => {
        input.classList.remove('input--danger');
    });
};

// Esperamos a que el usuario di clic sobre los botones
const initModalEventes = () => {
    addProductBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
};

// Mostramos confirmación
let deleteCallback = null;

const openConfirmModal = (onConfirm) => {
    deleteCallback = onConfirm;
    // Ocultamos el formulario
    formContainer.classList.remove('fade--visible');
    formContainer.classList.add('fade--hidden');

    // Mostramos la confirmación
    modalConfirm.classList.remove('fade--hidden');
    modalConfirm.classList.add('fade--visible');

    // Arbimos el modal
    openModal();
}

cancelBtn.addEventListener('click', () => {
    closeModal();
    resetModalState();
});

confirmBnt.addEventListener('click', () => {
    if (deleteCallback) deleteCallback();

    closeModal();
    resetModalState();
})

/* Inputs */

// Validamos nuestros campos
const validateField = (input) => {
    // Extraemos el valor
    const valueInput = input.value.trim();
    // Validamos que el input no este vacio
    return validateEmptyValues(valueInput, input);
};

// Validamos campos vacios
const validateEmptyValues = (value, inputName) => {
    if (value === '') {
        setError(inputName);
        return false;
    }
    removeError(inputName);
    return true;
};

// Validamos el formato 
const validateWithRegex = (value, input, regex) => {
    if (!regex.test(value)) {
        setError(input);
        return false;
    }
    removeError(input);
    return true;
}

// Validamos el producto
const validateProduct = () => {
    const value = productInput.value.trim();
    const productRegex = /^[a-zA-Z0-9\s\-_.]{3,50}$/;
    if (!validateEmptyValues(value, productInput)) return false;
    return validateWithRegex(value, productInput, productRegex);
};

// Validamos las unidades
const validateUnits = () => {
    const value = unitsInput.value.trim();
    const unitsRegex = /^(0|[1-9]\d*)$/;
    if (!validateEmptyValues(value, unitsInput)) return false;
    return validateWithRegex(value, unitsInput, unitsRegex);
};

// Validamos el precio
const validatePrice = () => {
    const value = priceInput.value.trim();
    const priceRegex = /^(?:0|[1-9]\d*)(\.\d{1,2})?$/;
    if (!validateEmptyValues(value, priceInput)) return false;
    return validateWithRegex(value, priceInput, priceRegex);
};

// Mostramos el error
const setError = (input) => {
    input.classList.add('input--danger');
};

// Quitamos el error
const removeError = (input) => {
    input.classList.remove('input--danger');
};

/* Validamos el formulario */

const validateForm = () => {
    // Validamos los campos del formulario
    const isProductValid = validateProduct();
    const isCategoryValid = validateField(categorySelect);
    const isUnitsValid = validateUnits();
    const isPriceValid = validatePrice();

    // Devolvemos los valores
    return (
        isProductValid &&
        isCategoryValid &&
        isUnitsValid &&
        isPriceValid
    );
};

// Extraemos los valores
const getFormData = () => {
    return {
        name: productInput.value.trim(),
        category: categorySelect.value,
        stock: Number(unitsInput.value),
        price: Number(priceInput.value)
    };
};

/* Mostramos mensaje de confirmación */

const showSuccessState = (isEdit) => {
    // Ocultamos nuestro formulario
    formContainer.classList.remove('fade--visible');
    formContainer.classList.add('fade--hidden');
    // Mostramos el mensaje
    modalSuccess.classList.remove('fade--hidden');
    modalSuccess.classList.add('fade--visible');
    successText.textContent = isEdit ?
        'Product updated successfully' : 'Product added successfully';
    // Cerramos despues de un tiempo el modal
    setTimeout(() => {
        closeModal();
        resetModalState();
    }, 1500)
};

// Reseteamos valores del modal
const resetModalState = () => {
    // Mostramos el formulario
    formContainer.classList.add('fade--visible');
    formContainer.classList.remove('fade--hidden');
    // Ocultamos el mensaje de confirmación
    modalSuccess.classList.add('fade--hidden');
    modalSuccess.classList.remove('fade--visible');
    // Ocultamos la confirmación
    modalConfirm.classList.add('fade--hidden');
    modalConfirm.classList.remove('fade--visible');
}

/* Mostramos los datos */

// Mostramos los productos
const renderProducts = (products, isSearching = false) => {

    // Eliminamos momentaneamente los productos
    const rows = table.querySelectorAll('.product-row');
    rows.forEach(row => row.remove());

    // Verificamos que existan datos guardados
    if (products.length === 0) {
        emptyTable.style.display = 'table-row';
        message.textContent = isSearching ? 'No results found' : 'No data available';
        return;
    }
    emptyTable.style.display = 'none';

    // Mostramos los datos
    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.classList.add('product-row');
        // Agregamos una animacion para mostrar los productos agregados
        row.style.animationDelay = `${index * 0.05}s`;
        void row.offsetWidth;
        row.classList.add('new');
        row.addEventListener('animationend', () => {
            row.classList.remove('new');
            row.style.animationDelay = '';
        });
        row.dataset.id = product.id;
        const statusClass = getStatusClass(product.status);
        row.innerHTML = `
            <td class="cell">${product.name}</td>
            <td class="cell">${product.category}</td>
            <td class="cell">${product.sku}</td>
            <td class="cell">${product.stock}</td>
            <td class="cell cell--status">
                <span class="status-badge ${statusClass}">${product.status}</span></td>
            <td class="cell">$${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
            <td class="cell txt-center">
                <div class="dropdown-container">
                    <button type="button" class="dropdown-toggle">⋯</button>
                    <div class="dropdown dropdown--hidden">
                        <button type="button" class="dropdown-item dropdown-item--edit">Edit</button>
                        <button type="button" class="dropdown-item dropdown-item--danger" data-id="${product.id}">
                            Delete
                        </button>
                    </div>
                </div>
            </td>
        `;
        table.appendChild(row);
    });
};

// Mostramos el total del inventario
const renderTotal = (totalAmount) => {
    total.textContent = `$${totalAmount.toLocaleString('en-US', {
        minimumFractionDigits: 2
    })}`;
}

// Mostramos el total de productos
const renderTotalStock = (totalStock) => {
    totalProducts.textContent = totalStock;
}

// Mostamos el total de productos en stock
const renderSummary = (summary) => {
    renderStockSummary(productInStock, summary.inStock);
    renderStockSummary(productLowStock, summary.lowStock);
    renderStockSummary(productOutStock, summary.outOfStock);
}

const renderStockSummary = (input, stockSummary) => {
    input.textContent = stockSummary;
}

// Hacemos la grafica dinamica
const renderStockBars = (summary) => {
    const total = summary.inStock + summary.lowStock + summary.outOfStock;
    const inStock = total ? (summary.inStock / total) * 100 : 0;
    const lowStock = total ? (summary.lowStock / total) * 100 : 0;
    const outStock = total ? (summary.outOfStock / total) * 100 : 0;
    inStockProgress.style.width = `${inStock}%`;
    lowStockProgress.style.width = `${lowStock}%`;
    outStockProgress.style.width = `${outStock}%`;
}

// Mostramos diseño dinamico para el status
const getStatusClass = (status) => {
    switch (status) {
        case 'inStock':
            return 'status-badge--in-stock';
        case 'lowStock':
            return 'status-badge--low-stock';
        case 'outStock':
            return 'status-badge--out-stock';
        default:
            return '';
    }
}

// Rellenamos el formulario para editar el producto
const fillForm = (product) => {
    productInput.value = product.name;
    categorySelect.value = product.category;
    unitsInput.value = product.stock;
    priceInput.value = product.price;
};

// Cambiamos el contenido del modal
const setFormMode = (isEdit) => {
    if (isEdit) {
        modalTitle.textContent = 'Edit Product';
        modalBtn.textContent = 'Save Changes';
    } else {
        modalTitle.textContent = 'Add Product';
        modalBtn.textContent = 'Add Product';
    }
}

export {
    initModalEventes, validateForm, closeModal,
    getFormData, renderProducts, openModal, fillForm,
    setFormMode, renderTotal, renderTotalStock,
    renderSummary, renderStockBars, showSuccessState,
    openConfirmModal
};