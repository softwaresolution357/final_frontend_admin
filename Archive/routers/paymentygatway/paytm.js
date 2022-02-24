const app = require('express');
const router = app.Router();
const {
  paytmMethod,
  postPaymentMethod,
} = require('../../controller/paymentgateway/paytm');
router.get('/', paytmMethod);
router.post('/', postPaymentMethod);
module.exports = router;
