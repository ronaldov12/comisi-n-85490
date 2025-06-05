const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller')

router.get('/', productController.getAll);
router.get('/:pid', productController.getById);
router.post('/', productController.create);
router.put('/:pid', productController.update);
router.delete('/:pid', productController.remove);

module.exports = router;
