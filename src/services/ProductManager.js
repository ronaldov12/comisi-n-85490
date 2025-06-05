const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class ProductManager {
    constructor() {
        this.filepath = path.join(__dirname, '../data/product.json');
        if (!fs.existsSync(this.filepath)) {
            fs.writeFileSync(this.filepath, JSON.stringify([], null, 2));
        }
    }

    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.filepath, 'utf-8');
            const products = JSON.parse(data);
            return products;
        } catch (error) {
            console.error('Error al cargar productos:', error);
            return [];
        }
    }

    async getProductsById(id) {
        const products = await this.getProducts();
        return products.find(p => p.id === id);
    }

    async addProduct(product) {
        const products = await this.getProducts(); //! obtiene todos los productos actuales
        const newProduct = {
            id: uuidv4(), //! genera id único
            status: true, //! asigna el estado en true por defecto
            ...product  //! expande las propiedades del producto recibido
        };
        products.push(newProduct); //! agrega el nuevo producto al array
        await fs.promises.writeFile(this.filepath, JSON.stringify(products, null, 2)); //! guarda el array actualizado en el archivo JSON
        return newProduct; //! devuelve el producto agregado
    }

    async updateProduct(id, update) {
        const products = await this.getProducts(); //! trae todos los productos
        const index = products.findIndex(p => p.id === id); //! buscamos el índice del producto por ID
        if (index === -1) {
            return null; //! si no se encuentra el producto devuelve null
        }
        // * Actualizamos el producto:
        // * conservamos los datos anteriores con ...products[index]
        // * sobrescribimos los campos nuevos con ...update
        // * mantenemos el ID sin que se modifique
        products[index] = {
            ...products[index],
            ...update,
            id: products[index].id
        };
        await fs.promises.writeFile(this.filepath, JSON.stringify(products, null, 2)); //! guarda el array actualizado
        return products[index]; //! devuelve el producto actualizado
    }

    async deleteProduct(id) { //! elimina el producto por id
        const products = await this.getProducts();
        const updateProducts = products.filter(p => p.id !== id);
        if (products.length === updateProducts.length) {
            return null; //! si no se encontró el producto para eliminar devuelve null
        }
        await fs.promises.writeFile(this.filepath, JSON.stringify(updateProducts, null, 2)); //! guarda el array sin el producto eliminado
        return true; //! producto eliminado exitosamente
    }
}

module.exports = ProductManager;
