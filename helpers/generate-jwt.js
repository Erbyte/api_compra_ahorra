// Import dotenv
require('dotenv').config();

// Import JWT
const jwt = require('jsonwebtoken');

// Generate JWT
const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        // Create payload
        const payload = { uid };

        jwt.sign(payload, process.env.SECRETKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('The token could not be generated');
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    generateJWT
}