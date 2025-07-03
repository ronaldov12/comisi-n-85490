const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

class CartManager {
    constructor(path) {
        this.path = path;
    }

    async getCarts() {
        const data = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(data);
    }

    async createCart() { // creamos un carrito de compras
        const carts = await this.getCarts(); // convierte el json en array 
        const newCart = { id: uuidv4(), products: [] }; // crea el carrito segun esta estructura
        carts.push(newCart); // agrega el carrito al array
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2)); // guarda todo en carrito.json
        return newCart;
    }

    async getCartById(id) {
        const carts = await this.getCarts(); // corregido: agregados paréntesis
        return carts.find(c => c.id === id);
    }

    async addProductToCart(cid, pid) { // agregar el producto a un carrito
        const carts = await this.getCarts(); // los carritos guardados en el json
        const cart = carts.find(c => c.id === cid); // buscar carrito por ID
        if (!cart) return null; // si no existe el carrito, devolvemos null

        // buscar si hay un producto con ese ID en el carrito
        const existingProduct = cart.products.find(p => p.product === pid);

        if (existingProduct) {
            existingProduct.quantity++; // si ya existe el producto, incrementa en uno
        } else {
            cart.products.push({ product: pid, quantity: 1 }); // si no existe, lo agregamos con quantity = 1
        }

        await fs.writeFile(this.path, JSON.stringify(carts, null, 2)); // guardar cambios
        return cart; // devolver carrito como respuesta
    }
}

module.exports = CartManager;
