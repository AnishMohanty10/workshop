const db = require('../database/db');

async function getAllProducts() {
    return await db.readData();
}

async function getProductById(id) {
    const products = await db.readData();
    return products.find(item => item.id === id);
}

// Added to demonstrate cache invalidation upon data modification
async function createProduct(productData) {
    const products = await db.readData();
    const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    
    const newProduct = { id: newId, ...productData };
    products.push(newProduct);
    
    await db.writeData(products);
    return newProduct;
}

module.exports = { getAllProducts, getProductById, createProduct };