const router = require('express').Router();

const companyController = require('../controller/companyController');
const auth = require('../middleware/auth');

router.get('/count', auth, companyController.getCompanyCount);
router.get('/count-group-by-country', auth, companyController.getCompanyCountGroupByCountry);
router.get('/', auth, companyController.getAllCompanies);
router.get('/:id', auth, companyController.getCompanyById);
router.post('/', auth, companyController.createCompany);
router.put('/:id', auth, companyController.updateCompanyById);
router.delete('/:id', auth, companyController.deleteCompanyById);

module.exports = router;
