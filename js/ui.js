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
const form = document.querySelector('.form-product');
const modalTitle = document.querySelector('.modal-title');
const modalBtn = document.querySelector('.btn-add');
const total = document.getElementById('total');
const totalProducts = document.getElementById('totalProducts');
const productInStock = document.getElementById('productInStock');
const productLowStock = document.getElementById('productLowStock');
const productOutStock = document.getElementById('productOutStock');

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

/* Mostramos los datos */

// Mostramos los productos
const renderProducts = (products) => {

    // Verificamos que existan datos guardados
    if (products.length === 0) {
        emptyTable.classList.add('table-empty');
        return;
    }

    // Limpiamos la tabla
    table.innerHTML = '';

    // Mostramos los datos
    products.forEach(product => {
        const row = document.createElement('tr');
        row.classList.add('product-row');
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

// const renderInStock = (count) => {
//     renderStockSummary(productInStock, count);
// }
// const renderLowStock = (count) => {
//     renderStockSummary(productLowStock, count);
// }
// const renderOutStock = (count) => {
//     renderStockSummary(productOutStock, count);
// }

const renderStockSummary = (input, stockSummary) => {
    input.textContent = stockSummary;
}

// Mostramos diseño dinamico para el status
const getStatusClass = (status) => {
    switch (status) {
        case 'In stock':
            return 'status-badge--in-stock';
        case 'Low stock':
            return 'status-badge--low-stock';
        case 'Out of stock':
            return 'status-badge--out-stock';
        default:
            return '';
    }
}

const fillForm = (product) => {
    productInput.value = product.name;
    categorySelect.value = product.category;
    unitsInput.value = product.stock;
    priceInput.value = product.price;
};

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
    renderSummary
};