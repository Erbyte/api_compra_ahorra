// Import express
const { response } = require('express');

// Import model
const Product = require('../models/product');

// Post method
const productsPost = async (req, res = response) => {
    // Get data from body
    const { sku, name, description, brand, model, price, stock, image, category } = req.body;

    // Create new product
    const product = new Product({
        sku, name, description, brand, model, price, stock, image, category
    });

    // Save to database
    await product.save();

    // Return response
    res.json({
        product
    });
}

// Put method
const productsPut = async (req, res = response) => {
    // Get data from params
    const { id } = req.params;

    // Get data from body
    const { _id, __v, ...rest } = req.body;

    // Update product
    const product = await Product.findByIdAndUpdate(id, rest);

    // Return response
    res.json({
        product
    });
}

// Get method
const productsGet = async (req = request, res = response) => {
    // Get data from query (optional)
    const { limit = 5, from = 0, includeAll = 0 } = req.query;

    // Options to get data
    const options = {
        // If all == 0 then status: true
        // If all == 1 then status: true || false
        status: includeAll == 0 ? true : { $in: [true, false] }
    }

    // Get total and products
    const [total, products] = await Promise.all([
        Product.countDocuments(options),
        Product.find(options)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    // Return response
    res.json({
        products
    });
}

// Delete method
const productsDelete = async (req = request, res = response) => {
    // Get data from params
    const { id } = req.params;

    // Delete product
    const product = await Product.findByIdAndUpdate(id, { status: false });

    // Return response
    res.json({
        product
    });
}

// Export methods
module.exports = {
    productsPost,
    productsPut,
    productsGet,
    productsDelete
}