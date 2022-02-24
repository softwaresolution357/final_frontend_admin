const app = require('express');
const router = app.Router();
const { admin_auth, } = require('../../middleware/auth');
const {
  paymentPost,
  paymentGet,
  putSinglePaymentMethod,
  getSinglePaymentMethod,
} = require('../../controller/system/payment');
router.route('/').get(admin_auth,paymentGet).post(admin_auth,paymentPost);
router.route('/:id').get(admin_auth,getSinglePaymentMethod).put(admin_auth,putSinglePaymentMethod);

module.exports = router;
