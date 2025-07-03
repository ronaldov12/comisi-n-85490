const express = require('express');
const router = express.Router();
const ProductManager = require('../services/ProductManager'); // ruta según tu estructura
const manager = new ProductManager(); // misma ruta que usás en tu controlador

// vista de productos en tiempo real
router.get('/', async (req, res) => {
    const products = await manager.getProducts();
    res.render('realTimeProducts', { products });
});

// Vista a tiempo real
router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

module.exports = router;