// Import express and express-validator
const { Router } = require('express');
const { check } = require('express-validator')

// Import controller
const { usersGet, usersPut, usersPost, usersDelete } = require('../controllers/users');

// Import middlewares
const { validateFields } = require('../middlewares/validate-fields');

// Import helpers
const { isValidRole, emailExist, userExistById } = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares/validate-jwt');
const { isAdminRole } = require('../middlewares/validate-roles');

// Create router
const router = Router();

// Routes
// Post method
router.post('/', [
    check('name', 'The name is required').not().isEmpty(),
    check('mail', 'The email is invalid').isEmail(),
    check('mail').custom(emailExist),
    check('password', 'The password must be at least 6 characters').isLength({ min: 6 }),
    check('role').custom(isValidRole),
    validateFields
], usersPost);

// Put method
router.put('/:id', [
    check('id', 'It is not a valid ID').isMongoId(),
    check('id').custom(userExistById),
    validateFields
], usersPut);

// Get method
router.get('/', usersGet);

// Delete method
router.delete('/:id', [
    validarJWT,
    isAdminRole,
    check('id', 'It is not a valid ID').isMongoId(),
    check('id').custom(userExistById),
    validateFields
], usersDelete);

// Export router
module.exports = router;