import { CartModel } from '../models/CartModel.js';

export class CartManager {
    //  Crea un nuevo carrito vacío
    async createCart() {
        const newCart = new CartModel({ products: [] });
        return await newCart.save(); // Guarda y devuelve el carrito
    }

    //  Busca un carrito por su ID
    async getCartById(cartId) {
        return await CartModel.findById(cartId).populate('products.product');
    }

    //  Agrega un producto al carrito (si existe, aumenta cantidad)
    async addProductToCart(cartId, productId) {
        const cart = await CartModel.findById(cartId);
        if (!cart) return null;

        const existingProduct = cart.products.find(p => p.product.equals(productId));

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }

        return await cart.save();
    }

    //  Elimina un producto puntual del carrito
    async removeProductFromCart(cartId, productId) {
        return await CartModel.updateOne(
            { _id: cartId },
            { $pull: { products: { product: productId } } }
        );
    }

    //  Reemplaza todos los productos con un nuevo array
    async updateCartProducts(cartId, newProductsArray) {
        return await CartModel.updateOne(
            { _id: cartId },
            { $set: { products: newProductsArray } }
        );
    }

    // Modifica la cantidad de un producto específico
    async updateProductQuantity(cartId, productId, quantity) {
        return await CartModel.updateOne(
            { _id: cartId, 'products.product': productId },
            { $set: { 'products.$.quantity': quantity } }
        );
    }

    //  Vacía el carrito 
    async clearCart(cartId) {
        return await CartModel.updateOne(
            { _id: cartId },
            { $set: { products: [] } }
        );
    }
}

export default CartManager;
