const Role = require('../models/role');
const User = require('../models/user');
const Product = require('../models/product');
const Category = require('../models/category');

const isValidRole = async (role = '') => {
    const validRole = await Role.findOne({role});

    if (!validRole) {
        throw new Error(`The role ${role} is not valid`)
    }
}

const emailExist = async (mail = '') => {
    const emailExist = await User.findOne({ mail });

    if (emailExist) {
        throw new Error(`The email ${mail} already exists`)
    }
}

const userExistById = async (id) => {
    const userExist = await User.findById(id);

    if (!userExist) {
        throw new Error(`The id ${id} does not exist`)
    }
}

const productExistById = async (id) => {
    const productExist = await Product.findById(id);

    if (!productExist) {
        throw new Error(`The id ${id} does not exist`)
    }
}

const categoryExistById = async (id) => {
    const categoryExist = await Category.findById(id);

    if (!categoryExist) {
        throw new Error(`The id ${id} does not exist`)
    }
}

module.exports = {
    isValidRole,
    emailExist,
    userExistById,
    productExistById,
    categoryExistById
}