const ProductManager = require('../services/ProductManager');
const productManager = new ProductManager();

module.exports = {
    //!obtengo todos los productos
    getAll: async (req, res) => {
        const result = await productManager.getProducts();
        res.json(result);
    },

    //!obtengo productos por id
    getById: async (req, res) => {
        const result = await productManager.getProductsById(req.params.pid);
        result
            ? res.json(result)
            : res.status(404).send('producto no encontrado');
    },

    //!crear nuevo producto
    create: async (req, res) => {
        const result = await productManager.addProduct(req.body);
        res.status(201).json(result);
    },

    //!actualiza el producto por id
    update: async (req, res) => {
        const result = await productManager.updateProduct(req.params.pid, req.body);
        result
            ? res.json(result)
            : res.status(404).send('producto no encontrado');
    },

    //!elimina el producto
    remove: async (req, res) => {
        const result = await productManager.deleteProduct(req.params.pid);
        result
            ? res.send('producto eliminado')
            : res.status(404).send('producto no encontrado');
    }
};
