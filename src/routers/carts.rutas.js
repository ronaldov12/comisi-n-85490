import express from 'express';
import controller from '../controllers/carts.controllers.js';

const router = express.Router();

router.post('/', controller.create);
router.get('/:cid', controller.getById);
router.post('/:cid/product/:pid', controller.addProduct);
// elimina un producto puntual del carrito
router.delete('/:cid/products/:pid', controller.removeProduct);
// reemplazar todos los productos del carrito
router.put('/:cid', controller.updateCart);
// actualiza la cantidad de un producto específico
router.put('/:cid/products/:pid', controller.updateQuantity);
// vaciar completamente el carrito
router.delete('/:cid', controller.clearCart);


export default router;
