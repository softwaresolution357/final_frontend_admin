const app = require('express');
const { TotalSales,OrderCount ,Header } = require('../controller/adminfrontend');
const router = app.Router();
const { admin_auth, } = require('../middleware/auth');

router.get('/',TotalSales);
router.get('/ordercount',OrderCount)
router.get('/header',Header)
module.exports = router;
