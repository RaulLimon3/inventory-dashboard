// Importamos nuestra clase principal
import Product from "./product.js";

// Manejamos los datos 
export default class inventoryManager {
    constructor() {
        this.products = this.loadFromStorage();
    }

    // Obtenemos los datos
    getProducts() {
        return this.products;
    }

    // Agregamos producto
    addProduct(name, category, stock, price) {
        const product = new Product(name, category, stock, price);
        this.products.push(product)
        this.saveToStorage();
        return product;
    }

    // Borramos el producto
    removeProduct(id) {
        this.products = this.products.filter(product => product.id !== id);
        this.saveToStorage();
    }

    // Actualizar el producto
    updateProduct(id, name, category, stock, price) {
        const product = this.getProductById(id);
        if (!product) return;
        product.name = name;
        product.category = category;
        product.stock = stock;
        product.price = price;

        this.saveToStorage();
    }

    // Calculamos el total del inventario
    getTotal() {
        return this.products.reduce((total, product) => total + (product.price * product.stock), 0);
    }

    // Calculamos el total de productos
    getTotalStock() {
        return this.products.reduce((total, product) => total + product.stock, 0);
    }

    // Obtenemos el id del producto
    getProductById(id) {
        return this.products.find(p => p.id === id);
    }

    // Guardamos en localStorage
    saveToStorage() {
        localStorage.setItem('products', JSON.stringify(this.products));
    }

    // Cargamos los datos
    loadFromStorage() {
        // Verificamos que haya datos en el localStorage
        const data = localStorage.getItem('products');
        // Si no hay, lo guardamos en un arreglo
        if (!data) return [];

        // Convertimos el dato a un objeto JS
        const parseData = JSON.parse(data);

        // Extraemos los datos
        return parseData.map(p => {
            const product = new Product(
                p.name,
                p.category,
                p.stock,
                p.price
            );
            product.id = p.id;
            return product;
        });
    }
}