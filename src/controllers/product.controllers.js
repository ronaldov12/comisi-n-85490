const productManager = require('../services/ProductManager')
const manager = new productManager('./src/data/products.json')

module.exports = {
    getAll: async (req, res) => {
        const result = await manager.getProducts()
        res.json(result)
    },

    getById: async (req, res) => { //controlador de express, para obtener el producto por id
        const result = await manager.getProductById(req.params.id) //corregido: el método se llamaba en plural, ahora está bien
        result ? res.json(result) : res.status(404).send('producto no encontrado') //se evalua si se encuentra el producto y si no tira 404
    },

    create: async (req, res) => { //crear un producto
        const { titulo, descripcion, codigo, precio, status } = req.body;

        //validación de campos requeridos y tipo de status
        if (!titulo || !descripcion || !codigo || !precio || typeof status !== 'boolean') {
            return res.status(400).json({ error: 'Faltan campos requeridos o status inválido' });
        }

        const result = await manager.addProduct(req.body)
        res.status(201).json(result)
    },

    update: async (req, res) => { //actualizar producto por pid
        const result = await manager.updateProduct(req.params.pid, req.body)
        result ? res.json(result) : res.status(404).send('producto no encontrado')
    },

    delete: async (req, res) => { //eliminar producto por pid
        const result = await manager.deleteProduct(req.params.pid)
        result ? res.json(result) : res.status(404).send('producto no encontrado')
    }
}
