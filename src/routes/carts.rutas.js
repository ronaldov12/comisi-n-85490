const express = require('express');
const router = express.Router(); 
const cartController = require('../controllers/cart.controller'); 

router.post('/', cartController.create);
router.get('/:cid', cartController.getById);
router.post('/:cid/product/:pid', cartController.addProduct);

module.exports = router;