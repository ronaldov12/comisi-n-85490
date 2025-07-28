import express from 'express';
import ProductManager from '../services/ProductManager.js';
import { CartManager } from '../services/CartManager.js';

const router = express.Router();
const productManager = new ProductManager();
const cartManager = new CartManager();

// Home / real-time products
router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { products });
});

// alias
router.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { products });
});

// product detail
router.get('/products/:pid', async (req, res) => {
    const product = await productManager.getProductsById(req.params.pid);
    if (!product) return res.status(404).send('Producto no encontrado');
    res.render('ProductDetail', { product: product.toObject() });
});

// cart detail
router.get('/carts/:cid', async (req, res) => {
    const cart = await cartManager.getCartById(req.params.cid);
    if (!cart) return res.status(404).send('Carrito no encontrado');
    res.render('Cart', { cart });
});

export default router;
