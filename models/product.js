const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    sku: {
        type: String,
        required: [true, 'SKU is required'],
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    description: {
        type: String,
        required: false
    },
    brand: {
        type: String,
        required: false
    },
    model: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        default: 0
    },
    stock: {
        type: Number,
        required: [true, 'Stock is required'],
        default: 0
    },
    status: {
        type: Boolean,
        default: true
    },
    image: {
        type: String,
        required: false
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required']
    }
});

ProductSchema.methods.toJSON = function () {
    const { __v, _id, ...product } = this.toObject();
    return product;
}

module.exports = model('Product', ProductSchema);