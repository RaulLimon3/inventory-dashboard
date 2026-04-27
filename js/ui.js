// Accedemos a nuestro elementos
const addProductBtn = document.getElementById('addProduct');
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('closeModal');


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

export { initModalEventes };