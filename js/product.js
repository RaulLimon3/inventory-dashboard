class Product {
    // Establecemos nuestros valores
    static categories = ['electronics', 'clothesAndFootwear', 'homeAndDecor', 'personal'];
    static currentId = 1;
    constructor(name, category, stock, price){
        // Validamos nuestros valores
        if (!name || typeof name !== 'string') {
            throw new Error('Name product must be a String');
        }
        if (!Product.categories.includes(category)) {
            throw new Error('Not valid category')
        }
        if (!Number.isInteger(stock) || stock < 0) {
            throw new Error('Stock must be a positive integer');
        }
        if (typeof price !== 'number' || isNaN(price) || price < 0) {
            throw new Error('Price must be a positive number');
        }
        // Asignamos los valores
        this.id = Product.generateId();
        this.name = name;
        this.category = category;
        this.sku = this.generateSKU();
        this.stock = stock;
        this.price = price;
    }

    // Generamos nuestro id
    static generateId() {
        return this.currentId++;
    }

    // Generamos el SKU del producto
    generateSKU() {
        const name = this.name.slice(0, 3).toUpperCase();
        const category = this.category.slice(0, 2).toUpperCase();
        const id = String(this.id).padStart(4,'0');
        return `${category}${name}${id}`;
    }

    // Calculamos el status
    get status() {
        if (this.stock === 0) return 'Out of stock';
        if (this.stock <= 5) return 'Low stock';
        return 'In stock';
    }
}