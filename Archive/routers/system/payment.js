const app = require('express');
const router = app.Router();
const {
  paymentPost,
  paymentGet,
  putSinglePaymentMethod,
  getSinglePaymentMethod,
} = require('../../controller/system/payment');
router.route('/').get(paymentGet).post(paymentPost);
router.route('/:id').get(getSinglePaymentMethod).put(putSinglePaymentMethod);

module.exports = router;
