// Import express and express-validator
const { Router } = require('express');
const { check } = require('express-validator')

// Import controller
const { categoriesGet, categoriesPut, categoriesPost, categoriesDelete } = require('../controllers/categories');

// Import middlewares
const { validateFields } = require('../middlewares/validate-fields');

// Import helpers
const { categoryExistById } = require('../helpers/db-validators');

// Create router
const router = Router();

// Routes

// Post method
router.post('/', [
    check('name', 'The name is required').not().isEmpty(),
    validateFields
], categoriesPost);

// Put method
router.put('/:id', [
    check('id', 'It is not a valid ID').isMongoId(),
    check('id').custom(categoryExistById),
    validateFields
], categoriesPut);

// Get method
router.get('/', categoriesGet);

// Delete method
router.delete('/:id', [
    check('id', 'It is not a valid ID').isMongoId(),
    check('id').custom(categoryExistById),
], categoriesDelete);

// Export router
module.exports = router