const app = require('express');
const router = app.Router();
const {
  rozorpay,
  getRozorpay,
} = require('../../controller/paymentgateway/razorpay');
router.get('/:payment_id/:amount', rozorpay);
router.get('/', getRozorpay);
module.exports = router;
