// Import jwt
const jwt = require('jsonwebtoken');

// Import models
const User = require('../models/user');

// Validate JWT
const validarJWT = async (req, res, next) => {
    // Get token from header
    const token = req.header('x-token');

    // Validate if token exists
    if (!token) {
        return res.status(401).json({
            msg: 'There is no token in the request'
        });
    }

    try {
        // Validate token
        const { uid } = jwt.verify(token, process.env.SECRETKEY);

        // Autenticate user
        const autenticateUser = await User.findById(uid);

        // Validate if user exists
        if (!autenticateUser) {
            return res.status(401).json({
                msg: 'User does not exist'
            });
        }

        // Validate if user is active
        if (!autenticateUser.status) {
            return res.status(401).json({
                msg: 'Invalid token'
            });
        }

        // Add autenticate user to request
        req.autenticateUser = autenticateUser;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Invalid token'
        });
    }
}

module.exports = {
    validarJWT
}