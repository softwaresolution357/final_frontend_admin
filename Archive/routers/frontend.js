const app = require('express');
const { update } = require('../middleware/auth');
const router = app.Router();
const {
  OrderSuccess,
  ListOrder,
  SingleOrder,
  CancelReason,
  CancelProduct,
  GetTesData,
  integrationData,
  deletedAddess
} = require('../controller/sales/ordersuccess');
const { mobileNumber, registerEmail } = require('../controller/auth');
router.get('/mobilenumber', mobileNumber);
router.get('/registrationemail', registerEmail);
router.get('/ordersuccess/:refid', OrderSuccess);
router.get('/listorder', update, ListOrder);
router.get('/singleorder/:id', update, SingleOrder);
router.get('/cancelreason', CancelReason);
router.post('/cancelproduct/:id', update, CancelProduct);
router.get('/infinity/:skip', GetTesData);
router.get('/integration', integrationData);
router.delete('/deletedaddess/:id',update,deletedAddess );
module.exports = router;
