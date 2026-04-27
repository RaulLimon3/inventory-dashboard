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