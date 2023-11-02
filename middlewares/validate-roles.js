// Import express
const { response } = require('express');

// Validate admin role
const isAdminRole = (req, res, next) => {
    // Validate if user exists
    if (!req.autenticateUser) {
        return res.status(500).json({
            msg: 'Validate role without validate token'
        });
    }

    // Get user from request
    const { role, name } = req.autenticateUser;

    // Validate if user is admin
    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} is not admin`
        });
    }

    next();
}

module.exports = {
    isAdminRole
}