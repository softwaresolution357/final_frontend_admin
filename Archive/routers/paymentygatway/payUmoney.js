const app = require('express');
const router = app.Router();
const { payUmoney } = require('../../controller/paymentgateway/payumoney');
router.post('/', payUmoney);
module.exports = router;
