const app = require('express');
const { TotalSales,OrderCount } = require('../controller/adminfrontend');
const router = app.Router();

router.get('/', TotalSales);
router.get('/ordercount',OrderCount)
module.exports = router;
