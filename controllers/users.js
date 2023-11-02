// Import express
const { response } = require('express');
// Import bcryptjs
const bcryptjs = require('bcryptjs');

// Import model
const User = require('../models/user');

// Post method
const usersPost = async (req, res = response) => {
    // Get data from body
    const { name, mail, password, role } = req.body;

    // Create new user
    const user = new User({
        name, mail, password, role
    });

    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Save to database
    await user.save();

    // Return response
    res.json({
        user
    });
}

// Put method
const usersPut = async (req, res = response) => {
    // Get data from params
    const { id } = req.params;

    // Get data from body
    const { _id, __v, mail, password, role, ...rest } = req.body;

    // Validate if user exists
    const existUser = await User.findById(id);

    if (!existUser) {
        return res.status(400).json({
            msg: "The user doesn't exists"
        });
    }

    // If password exists encrypt it
    if (password) {
        // Encrypt password
        const salt = bcryptjs.genSaltSync();

        // Add password to rest object
        rest.password = bcryptjs.hashSync(password, salt);
    }

    // Update user
    const user = await User.findByIdAndUpdate(id, rest);

    // Return response
    res.json({
        user
    })
}

// Get method
const usersGet = async (req = request, res = response) => {
    // Get data from query (optional)
    const { limit = 5, from = 0, includeAll = 0 } = req.query;

    // Options to get data
    const options = {
        // If all == 0 then status: true
        // If all == 1 then status: true || false
        status: includeAll == 0 ? true : { $in: [true, false] }
    }

    // Get total and users
    const [total, users] = await Promise.all([
        User.countDocuments(options),
        User.find(options)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    // Return response
    res.json({
        total,
        users
    })
}

// Delete method
const usersDelete = async (req, res = response) => {
    // Get data from params
    const { id } = req.params;

    // Delete user
    const user = await User.findByIdAndUpdate(id, { status: false });

    // Return response
    res.json({
        user
    })
}

// Export methods
module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete
}