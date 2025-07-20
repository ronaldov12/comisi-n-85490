import ProductManager from '../services/ProductManager.js';
const manager = new ProductManager();

export default {
    getAll: async (req, res) => {
        try {
            const result = await manager.getProducts();
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener productos' });
        }
    },

    getById: async (req, res) => {
        try {
            const result = await manager.getProductsById(req.params.pid);
            result ? res.json(result) : res.status(404).send('Producto no encontrado');
        } catch (err) {
            res.status(500).json({ error: 'Error al buscar producto' });
        }
    },

    create: async (req, res) => {
        const { titulo, descripcion, codigo, precio, status } = req.body;

        if (!titulo || !descripcion || !codigo || !precio || typeof status !== 'boolean') {
            return res.status(400).json({ error: 'Faltan campos requeridos o status inválido' });
        }

        try {
            const result = await manager.addProduct(req.body);
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json({ error: 'Error al crear producto' });
        }
    },

    update: async (req, res) => {
        try {
            const result = await manager.updateProduct(req.params.pid, req.body);
            result ? res.json(result) : res.status(404).send('Producto no encontrado');
        } catch (err) {
            res.status(500).json({ error: 'Error al actualizar producto' });
        }
    },

    delete: async (req, res) => {
        try {
            const result = await manager.deleteProduct(req.params.pid);
            result ? res.json(result) : res.status(404).send('Producto no encontrado');
        } catch (err) {
            res.status(500).json({ error: 'Error al eliminar producto' });
        }
    }
};
