const { Router } = require('express');
const { check } = require('express-validator')

const { productsGet, productsPut, productsPost, productsDelete } = require('../controllers/products');

const { validateFields } = require('../middlewares/validate-fields');
const { productExistById } = require('../helpers/db-validators');

const router = Router();

router.post('/', [
    check('sku', 'The sku is required').not().isEmpty(),
    check('name', 'The name is required').not().isEmpty(),
    check('brand', 'The brand is required').not().isEmpty(),
    check('model', 'The model is required').not().isEmpty(),
    check('price', 'The price is required').not().isEmpty(),
    check('stock', 'The stock is required').not().isEmpty(),
    check('category', 'The category is required').not().isEmpty(),
    validateFields
], productsPost);

router.put('/:id', [
    check('id', 'It is not a valid ID').isMongoId(),
    check('id').custom(productExistById),
    validateFields
], productsPut);

router.get('/', productsGet);

router.delete('/:id', [
    check('id', 'It is not a valid ID').isMongoId(),
    check('id').custom(productExistById),
], productsDelete);

module.exports = router