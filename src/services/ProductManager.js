import { ProductModel } from "../models/ProductModel.js"; // Modelo de MongoDB

export class ProductManager {

    async getProductsPaginated({ limit = 10, page = 1, sort, query }) {
        const filters = {};

        // Si llegaquery puede ser por categoría o por disponibilidad
        if (query) {
            if (query === 'true' || query === 'false') {
                filters.status = query === 'true'; // Filtra por estado booleano
            } else {
                filters.category = query;          // Filtra por categoría
            }
        }

        const options = {
            limit: parseInt(limit),
            page: parseInt(page),
            sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {}
        };

        //ejecuta la busqueda con filtros y opciones
        return await ProductModel.paginate(filters, options);
    }

    // obtiene todos los productos almacenados 
    async getProducts() {
        return await ProductModel.find();
    }

    // busca un producto por su id
    async getProductsById(id) {
        return await ProductModel.findById(id);
    }

    // agrega un nuevo producto usando mongo
    async addProduct(productData) {
        const newProduct = new ProductModel({
            status: true,      // estado por defecto
            ...productData     // propiedades que vienen del req.body
        });
        return await newProduct.save(); // guarda y devuelve el documento
    }

    // actualiza los campos de un producto por su id
    async updateProduct(id, updateData) {
        return await ProductModel.findByIdAndUpdate(id, updateData, {
            new: true          // devuelve el producto actualizado
        });
    }

    // elimina un producto por id devuelve true si se eliminó o null si no existe
    async deleteProduct(id) {
        const result = await ProductModel.findByIdAndDelete(id);
        return result ? true : null;
    }
}

export default ProductManager;
