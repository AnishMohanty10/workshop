const productService = require('../services/productService');

async function getProducts(req, res) {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getProduct(req, res) {
    try {
        const id = Number(req.params.id);
        const product = await productService.getProductById(id);
        
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function createProduct(req, res) {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getProducts, getProduct, createProduct };