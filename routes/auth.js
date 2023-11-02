// Import express and express-validator
const { Router } = require('express');
const { check } = require('express-validator')

// Import controller
const { login, logout, changePassword } = require('../controllers/auth');

// Import middlewares
const { validateFields } = require('../middlewares/validate-fields');
const { userExistById } = require('../helpers/db-validators');

// Create router
const router = Router();

// Routes
// Login method
router.post('/login', [
    check('mail', 'The email is invalid').isEmail(),
    check('password', 'The password not be empty').not().isEmpty(),
    validateFields
], login);

// Logout method
router.post('/logout', logout);

// Change password method
router.post('/change_password/:id', [
    check('id', 'The id is not valid').isMongoId(),
    check('id').custom(userExistById),
    check('current_password', 'The current password not be empty').not().isEmpty(),
    check('new_password', 'The new password not be empty').not().isEmpty(),
    check('new_password', 'The new password must be at least 8 characters').isLength({ min: 8 }),
    check('password_confirmation', 'The password confirmation not be empty').not().isEmpty(),
    validateFields
], changePassword);

// Export router
module.exports = router;