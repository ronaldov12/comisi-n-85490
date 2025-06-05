//! importación de dependencias y servicios
const CartManager = require('../services/CartManager');
const cartManager = new CartManager('../data/carts.json');

module.exports = {
    //? Crea un nuevo carrito y lo devuelve
    create: async (req, res) => {
        const result = await cartManager.createCart(); 
        res.status(201).json(result);
    },

    //? Busca por su ID
    getById: async (req, res) => {
        const result = await cartManager.getCartById(req.params.cid); 
        result 
            ? res.json(result)
            : res.status(404).send('Carrito no encontrado');
    },

    //? Agrega un producto a un carrito específico
    addProduct: async (req, res) => {
        const result = await cartManager.addProductToCart(req.params.cid, req.params.pid); 
        result 
            ? res.json(result)
            : res.status(404).send('Carrito no encontrado');
    }
};
