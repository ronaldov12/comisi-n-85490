import { CartModel } from '../models/CartModel.js';
import { ProductModel } from '../models/ProductModel.js';
import mongoose from 'mongoose';

export class CartManager {
    async createCart() {
        return await new CartModel({ products: [] }).save();
    }

    async getCartById(cartId) {
        if (!mongoose.Types.ObjectId.isValid(cartId)) return null;
        return await CartModel.findById(cartId).populate('products.product');
    }

    async addProductToCart(cartId, productId) {
        if (!mongoose.Types.ObjectId.isValid(cartId) || !mongoose.Types.ObjectId.isValid(productId))
            return null;

        const cart = await CartModel.findById(cartId);
        if (!cart) return null;

        const product = await ProductModel.findById(productId);
        if (!product) return null;

        const existing = cart.products.find((p) => p.product.toString() === productId);
        if (existing) existing.quantity++;
        else cart.products.push({ product: productId, quantity: 1 });

        return await cart.save();
    }
    //  elimina un producto puntual del carrito
    async removeProductFromCart(cartId, productId) {
        if (!mongoose.Types.ObjectId.isValid(cartId) || !mongoose.Types.ObjectId.isValid(productId)) return null;

        const cart = await CartModel.findById(cartId);
        if (!cart) return null;

        cart.products = cart.products.filter(p => p.product.toString() !== productId);

        return await cart.save(); // devuelve el carrito sin ese producto
    }

    //  reemplaza todos los productos con un nuevo array
    async updateCartProducts(cartId, newProductsArray) {
        if (!mongoose.Types.ObjectId.isValid(cartId)) return null;

        const cart = await CartModel.findById(cartId);
        if (!cart) return null;

        cart.products = newProductsArray;
        return await cart.save(); // guarda y devuelve el carrito con los nuevos productos
    }

    //  modifica la cantidad de un producto especifico
    async updateProductQuantity(cartId, productId, quantity) {
        if (!mongoose.Types.ObjectId.isValid(cartId) || !mongoose.Types.ObjectId.isValid(productId)) return null;

        const cart = await CartModel.findById(cartId);
        if (!cart) return null;

        const productToUpdate = cart.products.find(p => p.product.toString() === productId);
        if (!productToUpdate) return null;

        productToUpdate.quantity = quantity;
        return await cart.save(); // guarda y devuelve el carrito actualizado
    }

    //  vacia el carrito 
    async clearCart(cartId) {
        if (!mongoose.Types.ObjectId.isValid(cartId)) return null;

        const cart = await CartModel.findById(cartId);
        if (!cart) return null;

        cart.products = [];
        return await cart.save(); // devuelve el carrito vacio
    }
}
