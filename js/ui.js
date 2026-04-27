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
    const isProductValid = validateField(productInput);
    const isCategoryValid = validateField(categorySelect);
    const isUnitsValid = validateField(unitsInput);
    const isPriceValid = validateField(priceInput);

    // Devolvemos los valores
    return (
        isPriceValid &&
        isCategoryValid &&
        isUnitsValid &&
        isPriceValid
    );
};

export { initModalEventes, validateForm };