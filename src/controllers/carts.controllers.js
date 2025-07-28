// src/controllers/carts.controllers.js
import { CartManager } from '../services/CartManager.js';
const manager = new CartManager();

export default {
    // POST /api/carts
    create: async (req, res) => {
        try {
            const cart = await manager.createCart(); // Crea carrito
            res.status(201).json({
                status: 'success',
                result: { _id: cart._id } // Solo devolvemos el id
            });
        } catch {
            res.status(500).json({ status: 'error', message: 'Error al crear el carrito' });
        }
    },

    // GET /api/carts/:cid
    getById: async (req, res) => {
        try {
            const { cid } = req.params;
            const result = await manager.getCartById(cid);
            if (!result) {
                return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
            }
            res.json({ status: 'success', result });
        } catch {
            res.status(500).json({ status: 'error', message: 'Error al obtener el carrito' });
        }
    },

    // POST /api/carts/:cid/products/:pid
    addProduct: async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const result = await manager.addProductToCart(cid, pid);
            if (!result) {
                return res.status(404).json({ status: 'error', message: 'Carrito o producto no encontrado' });
            }
            res.json({ status: 'success', result });
        } catch {
            res.status(500).json({ status: 'error', message: 'Error al agregar el producto al carrito' });
        }
    },

    // DELETE /api/carts/:cid/products/:pid
    removeProduct: async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const result = await manager.removeProductFromCart(cid, pid);
            if (!result) {
                return res.status(404).json({ status: 'error', message: 'Carrito o producto no encontrado' });
            }
            res.json({ status: 'success', result });
        } catch {
            res.status(500).json({ status: 'error', message: 'Error al eliminar producto del carrito' });
        }
    },

    // PUT /api/carts/:cid
    updateCart: async (req, res) => {
        try {
            const { cid } = req.params;
            const { products } = req.body;
            const result = await manager.updateCartProducts(cid, products);
            if (!result) {
                return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
            }
            res.json({ status: 'success', result });
        } catch {
            res.status(500).json({ status: 'error', message: 'Error al actualizar el carrito completo' });
        }
    },

    // PUT /api/carts/:cid/products/:pid
    updateQuantity: async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const result = await manager.updateProductQuantity(cid, pid, quantity);
            if (!result) {
                return res.status(404).json({ status: 'error', message: 'Carrito o producto no encontrado' });
            }
            res.json({ status: 'success', result });
        } catch {
            res.status(500).json({ status: 'error', message: 'Error al actualizar la cantidad del producto' });
        }
    },

    // DELETE /api/carts/:cid
    clearCart: async (req, res) => {
        try {
            const { cid } = req.params;
            const result = await manager.clearCart(cid);
            if (!result) {
                return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
            }
            res.json({ status: 'success', result });
        } catch {
            res.status(500).json({ status: 'error', message: 'Error al vaciar el carrito' });
        }
    }
};
