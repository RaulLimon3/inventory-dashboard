// Establecemos el nombre de la llave que utilizaremos
const STORAGE_KEY = 'products';

// Guardamos los datos en localStorage
const saveToStorage = (data) => { 
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Accedemos a los datos del localStorage
const loadFromStorage = () => { 
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

export { saveToStorage, loadFromStorage };