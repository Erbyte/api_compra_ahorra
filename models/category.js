// Initialize Mongoose
const { Schema, model } = require('mongoose');

// Create Category Schema
const CategorySchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    }
});

// Modify toJSON method
CategorySchema.methods.toJSON = function () {
    // Remove __v from object
    const { __v, ...category } = this.toObject();
    return category;
}

// Export model
module.exports = model('Category', CategorySchema);