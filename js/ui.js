// Accedemos a nuestro elementos
const addProductBtn = document.getElementById('addProduct');
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('closeModal');
const productInput = document.getElementById('product');
const categorySelect = document.getElementById('category');
const unitsInput = document.getElementById('units');
const priceInput = document.getElementById('price');

/* Modal */

// Abrimos el modal
const openModal = () => {
    modal.classList.add('modal--active');
};

// Cerramos modal
const closeModal = () => {
    modal.classList.remove('modal--active');
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
    const unitsRegex = /^[1-9]\d*$/;
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

export { initModalEventes, validateForm, closeModal, getFormData };