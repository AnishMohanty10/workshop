const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { cacheMiddleware, invalidateCache } = require('../middleware/cacheMiddleware');


router.get('/', cacheMiddleware, productController.getProducts);
router.get('/:id', cacheMiddleware, productController.getProduct);


router.post('/', invalidateCache, productController.createProduct);

module.exports = router;