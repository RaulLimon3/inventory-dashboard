// Importamos nuestra clase principal
import Product from "./product.js";
// Importamos el almacenamiento de localStorage
import { saveToStorage, loadFromStorage } from "./storage.js";

// Manejamos los datos 
export default class inventoryManager {
    constructor() {
        // Accedemos al localStorage
        const data = loadFromStorage();
        // Extraemos los datos de localStorage
        this.products = data.map(p => {
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

    // Obtenemos los datos
    getProducts() {
        return this.products;
    }

    // Agregamos producto
    addProduct(name, category, stock, price) {
        const product = new Product(name, category, stock, price);
        this.products.push(product)
        saveToStorage(this.products);
        return product;
    }

    // Borramos el producto
    removeProduct(id) {
        this.products = this.products.filter(product => product.id !== id);
        saveToStorage(this.products);
    }

    // Actualizar el producto
    updateProduct(id, name, category, stock, price) {
        const product = this.getProductById(id);
        if (!product) return;
        product.name = name;
        product.category = category;
        product.stock = stock;
        product.price = price;

        saveToStorage(this.products);
    }

    // Calculamos el total del inventario
    getTotal() {
        return this.products.reduce((total, product) => total + (product.price * product.stock), 0);
    }

    // Calculamos el total de productos
    getTotalStock() {
        return this.products.reduce((total, product) => total + product.stock, 0);
    }

    // Calculamos el total de productos en base a su status
    getStockSummary() {
        return this.products.reduce((acc, product) => {
            if (product.status === 'inStock') acc.inStock++;
            else if (product.status === 'lowStock') acc.lowStock++;
            else acc.outOfStock++;
            return acc;
        }, {
            inStock: 0, lowStock: 0, outOfStock: 0
        });
    }

    // Filtramos los productos por status
    filterProducts(status) {
        if (status === 'all') return this.products;
        return this.products.filter(product => product.status === status);
    }

    // Obtenemos el id del producto
    getProductById(id) {
        return this.products.find(p => p.id === id);
    }
}