const productController = require('../controller/productController');
const auth = require('../middleware/auth');

const router = require('express').Router();

router.get('/count', auth, productController.getProductCount);
router.get('/count-group-by-company', auth, productController.getProductCountGroupByCompany);
router.get('/', auth, productController.getAllProducts);
router.get('/:id', auth, productController.getProductById);
router.post('/', auth, productController.createProduct);
router.put('/:id', auth, productController.updateProductById);
router.delete('/:id', auth, productController.deleteProductById);

module.exports = router;