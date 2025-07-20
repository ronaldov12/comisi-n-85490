import express from 'express';
import ProductManager from '../services/ProductManager.js'; 
import CartManager from '../services/CartManager.js'; 

const router = express.Router();

const manager = new ProductManager(); 
const cartManager = new CartManager(); 

// vista de productos en tiempo real
router.get('/', async (req, res) => {
    const products = await manager.getProducts();
    res.render('realTimeProducts', { products });
});

// vista a tiempo real
router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

// vista del carrito por id
router.get('/carts/:cid', async (req, res) => {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(cid);// Usa .populate()
    res.render('cartDetail', { cart });
});

// Vista del producto por id
router.get('/products/:pid', async (req, res) => {
    const { pid } = req.params;
    const product = await manager.getProductsById(pid);
    res.render('productDetail', { product });
});

// vista paginada de productos con filtros y ordenamiento
router.get('/products', async (req, res) => {
    const { limit = 10, page = 1, sort, query } = req.query;
    const result = await manager.getProductsPaginated({ limit, page, sort, query });

    res.render('products', {
        products: result.docs,
        totalPages: result.totalPages,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage ? `/products?limit=${limit}&page=${result.prevPage}&sort=${sort || ''}&query=${query || ''}` : null,
        nextLink: result.hasNextPage ? `/products?limit=${limit}&page=${result.nextPage}&sort=${sort || ''}&query=${query || ''}` : null
    });
});


export default router;
