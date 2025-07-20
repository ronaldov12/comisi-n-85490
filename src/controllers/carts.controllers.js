import CartManager from '../services/CartManager.js';
const manager = new CartManager(); 

export default {
    create: async (req, res) => {
        const result = await manager.createCart();
        res.status(201).json(result);
    },

    getById: async (req, res) => {
        const result = await manager.getCartById(req.params.cid);
        result ? res.json(result) : res.status(404).send('carrito no encontrado');
    },

    addProduct: async (req, res) => {
        const result = await manager.addProductToCart(req.params.cid, req.params.pid);
        result ? res.json(result) : res.status(404).send('carrito no encontrado');
    },

    removeProduct: async (req, res) => {
        try {
            const result = await manager.removeProductFromCart(req.params.cid, req.params.pid);
            res.json({ status: 'success', result });
        } catch (err) {
            res.status(500).json({ error: 'Error al eliminar producto del carrito' });
        }
    },

    updateCart: async (req, res) => {
        try {
            const { products } = req.body;
            const result = await manager.updateCartProducts(req.params.cid, products);
            res.json({ status: 'success', result });
        } catch (err) {
            res.status(500).json({ error: 'Error al actualizar el carrito completo' });
        }
    },

    updateQuantity: async (req, res) => {
        try {
            const { quantity } = req.body;
            const result = await manager.updateProductQuantity(req.params.cid, req.params.pid, quantity);
            res.json({ status: 'success', result });
        } catch (err) {
            res.status(500).json({ error: 'Error al actualizar la cantidad del producto' });
        }
    },

    clearCart: async (req, res) => {
        try {
            const result = await manager.clearCart(req.params.cid);
            res.json({ status: 'success', result });
        } catch (err) {
            res.status(500).json({ error: 'Error al vaciar el carrito' });
        }
    }
};
