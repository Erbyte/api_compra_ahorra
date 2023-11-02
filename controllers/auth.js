// Import express
const { response } = require('express');

// Import bcryptjs
const bcryptjs = require('bcryptjs');

// Import model
const User = require('../models/user');

// Import helpers
const { generateJWT } = require('../helpers/generate-jwt');

// Login method
const login = async (req, res = response) => {
    // Get data from body
    const { mail, password } = req.body;

    try {
        // Find user by mail        
        const user = await User.findOne({ mail });

        // If user doesn't exists
        if (!user) {
            return res.status(400).json({
                msg: "The user doesn't exists"
            });
        }

        // If user is not active
        if (!user.status) {
            return res.status(400).json({
                msg: "This user is not active"
            });
        }

        // If password isn't correct
        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: "The password is not correct"
            });
        }

        // Generate JWT
        const token = await generateJWT(user.id);

        // Return response
        res.json({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Something went wrong"
        });
    }
}

// Logout method
const logout = async (req, res = response) => {
    // TODO: Invalidate JWT

    // Return response
    res.json({
        msg: "Logout"
    });
}

// Change password method
const changePassword = async (req, res = response) => {
    // Get data from params
    const { id } = req.params;

    // Get data from body
    const { current_password, new_password, password_confirmation } = req.body;

    // Find user by id
    const user = await User.findById(id);

    // If user doesn't exists
    if (!user) {
        return res.status(400).json({
            msg: "The user doesn't exists"
        });
    }

    // If user is not active
    if (!user.status) {
        return res.status(400).json({
            msg: "This user is not active"
        });
    }

    // If password isn't correct
    const validPassword = bcryptjs.compareSync(current_password, user.password);

    if (!validPassword) {
        return res.status(400).json({
            msg: "The password is not correct"
        });
    }

    // If new password and password confirmation are not the same
    if (new_password !== password_confirmation) {
        return res.status(400).json({
            msg: "The new password and password confirmation are not the same"
        });
    }

    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    const newPassword = bcryptjs.hashSync(new_password, salt);

    // Update user
    const updateUser = await User.findByIdAndUpdate(id, { password: newPassword });

    // Return response
    res.json({
        updateUser
    });
}


// Export methods
module.exports = {
    login,
    logout,
    changePassword
}