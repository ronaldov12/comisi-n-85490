import express from 'express';
import controller from '../controllers/carts.controllers.js'; 

const router = express.Router();

// crear un carrito vacío
router.post('/', controller.create);
// obtener carrito por ID
router.get('/:cid', controller.getById);
// agregar producto al carrito
router.post('/:cid/products/:pid', controller.addProduct);
// eliminar producto específico del carrito
router.delete('/:cid/products/:pid', controller.removeProduct);
// reemplazar productos en un carrito
router.put('/:cid', controller.updateCart);
// actualizar cantidad de un producto
router.put('/:cid/products/:pid', controller.updateQuantity);
// vaciar completamente el carrito
router.delete('/:cid', controller.clearCart);

export default router;
