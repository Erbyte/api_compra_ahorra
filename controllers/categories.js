// Import express
const { response } = require('express');

// Import model
const Category = require('../models/category');

// Post method
const categoriesPost = async (req, res = response) => {
    // Get data from body
    const { name } = req.body;

    // Create new category
    const category = new Category({
        name
    });

    // Save to database
    await category.save();

    // Return response
    res.json({
        category
    });
}

// Put method
const categoriesPut = async (req, res = response) => {
    // Get data from params
    const { id } = req.params;

    // Get data from body
    const { _id, __v, ...rest } = req.body;

    // Update category
    const category = await Category.findByIdAndUpdate(id, rest);

    // Return response
    res.json({
        category
    });
}

// Get method
const categoriesGet = async (req = request, res = response) => {
    // Get data from query (optional)
    const { limit = 5, from = 0, includeAll = 0 } = req.query;

    // Options to get data
    const options = {
        // If all == 0 then status: true
        // If all == 1 then status: true || false
        status: includeAll == 0 ? true : { $in: [true, false] }
    }

    // Get total and categories
    const [total, categories] = await Promise.all([
        Category.countDocuments(options),
        Category.find(options)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    // Return response
    res.json({
        total,
        categories
    });
}

// Delete method
const categoriesDelete = async (req = request, res = response) => {
    // Get data from params
    const { id } = req.params;

    // Delete category
    const category = await Category.findByIdAndUpdate(id, { status: false });

    // Return response
    res.json({
        category
    });
}

// Export methods
module.exports = {
    categoriesPost,
    categoriesPut,
    categoriesGet,
    categoriesDelete
}