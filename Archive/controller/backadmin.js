const app = require('express');
const { TotalSales } = require('../controller/adminfrontend');
const router = app.Router();

router.get('/totalsales', TotalSales);

module.exports = router;
