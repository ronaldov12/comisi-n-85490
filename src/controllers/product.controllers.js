import mongoose from 'mongoose';
import ProductManager from '../services/ProductManager.js';
const manager = new ProductManager();

export default {
    getAll: async (req, res) => {
        try {
            const { limit = 10, page = 1, sort, query } = req.query;
            const result = await manager.getProductsPaginated({ limit, page, sort, query });

            if (req.accepts('json') && !req.accepts('html')) {
                // Respuesta JSON para API
                return res.json({
                    status: 'success',
                    payload: result.docs,
                    totalPages: result.totalPages,
                    page: result.page,
                    hasPrevPage: result.hasPrevPage,
                    hasNextPage: result.hasNextPage,
                    prevPage: result.prevPage,
                    nextPage: result.nextPage,
                    prevLink: result.hasPrevPage
                        ? `/api/products?page=${result.prevPage}&limit=${limit}&sort=${sort || ''}&query=${query || ''}`
                        : null,
                    nextLink: result.hasNextPage
                        ? `/api/products?page=${result.nextPage}&limit=${limit}&sort=${sort || ''}&query=${query || ''}`
                        : null
                });
            }

            // Respuesta para vistas HTML
            res.render('products', {
                products: result.docs,
                totalPages: result.totalPages,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: result.hasPrevPage
                    ? `/products?page=${result.prevPage}&limit=${limit}&sort=${sort || ''}&query=${query || ''}`
                    : null,
                nextLink: result.hasNextPage
                    ? `/products?page=${result.nextPage}&limit=${limit}&sort=${sort || ''}&query=${query || ''}`
                    : null
            });
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener productos paginados' });
        }
    },

    getById: async (req, res) => {
        const { pid } = req.params;

        if (!mongoose.Types.ObjectId.isValid(pid)) {
            return res.status(400).json({ error: 'ID de producto inválido' });
        }

        try {
            const result = await manager.getProductsById(pid);
            result
                ? res.json(result)
                : res.status(404).send('Producto no encontrado');
        } catch (err) {
            res.status(500).json({ error: 'Error al buscar producto' });
        }
    },

    create: async (req, res) => {
        const { title, description, code, price, stock, category, status } = req.body;

        if (!title || !description || !code || !price || typeof status !== 'boolean') {
            return res.status(400).json({ error: 'Faltan campos requeridos o status inválido' });
        }

        try {
            const newProductData = {
                title,
                description,
                code,
                price,
                stock,
                category,
                status
            };

            const result = await manager.addProduct(newProductData);
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json({ error: 'Error al crear producto' });
        }
    },

    update: async (req, res) => {
        try {
            const result = await manager.updateProduct(req.params.pid, req.body);
            result
                ? res.json(result)
                : res.status(404).send('Producto no encontrado');
        } catch (err) {
            res.status(500).json({ error: 'Error al actualizar producto' });
        }
    },

    delete: async (req, res) => {
        try {
            const result = await manager.deleteProduct(req.params.pid);
            result
                ? res.json(result)
                : res.status(404).send('Producto no encontrado');
        } catch (err) {
            res.status(500).json({ error: 'Error al eliminar producto' });
        }
    }
};
